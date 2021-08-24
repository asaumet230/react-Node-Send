import { useReducer } from "react";
import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';

import authContext from "./authContext";
import authReducer from './authReducer';

import { 
    REGISTRAR_EXITOSO, 
    REGISTRO_ERROR,
    LIMPIAR_ALERTA,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    USUARIO_AUTENTICADO,
    CERRAR_SESION
   } from "../../types";


const AuthState = ({ children }) => {

    // State Inicial:
    const initialState = {
        token: typeof window != 'undefined'? localStorage.getItem('token') : '',
        autenticado: null,
        usuario: null,
        mensaje: null,
        ok: false,
        clase: ''
    }


    // Definir Reducer:

    const[ state, dispatch ] = useReducer(authReducer, initialState);

    // Registrar usuario:
    const registrarUsuario = async datos => {

        try {

            const resultado = await clienteAxios.post('/api/usuarios', datos);
            console.log(resultado.data.msg);

            dispatch({
                type: REGISTRAR_EXITOSO,
                payload: {
                    ok: resultado.data.ok,
                    mensaje: resultado.data.msg,
                    clase: 'bg-green-500'
                }
            });
            
        } catch (error) {
            console.log(error.response.data.msg);
            dispatch({
                type: REGISTRO_ERROR,
                payload: {
                        mensaje: error.response.data.msg,
                        clase: 'bg-red-500'
                    }
            });
        }

        setTimeout(() => {
            dispatch({
                type: LIMPIAR_ALERTA
            })
        }, 3000);
    }

    // Autenticar Usuario:

    const iniciarSesion = async datos => {

        try {

            const respuesta  = await clienteAxios.post('api/auth', datos);
            
            dispatch({
                type: LOGIN_EXITOSO,
                payload: respuesta.data.token
            })
            
        } catch (error) {
            console.log(error.response.data.msg);
            dispatch({
                type: LOGIN_ERROR,
                payload: {
                    mensaje: error.response.data.msg,
                    clase: 'bg-red-500'
                }
            })
        }

        // Eliminar el mensaje de error despues de 3 segundos:

        setTimeout(() => {
            dispatch({
                type: LIMPIAR_ALERTA
            })
        }, 3000);
    
    }

    // Comprobar autenticación a traves del JWT:
    const usuarioAutenticado =  async () => {

        const token = await localStorage.getItem('token');
         
        try {
                
              if( token ) {

                tokenAuth(token);

                const respuesta = await clienteAxios('api/auth');
       
                dispatch({
                    type: USUARIO_AUTENTICADO,
                    payload: respuesta.data.usuario
                });
            }
        } catch (error) {
            console.log(error.response);
            dispatch({
                type: LOGIN_ERROR,
                payload: {
                    mensaje: error.response.data.msg,
                    clase: 'bg-red-500'
                }
            });
        }
    }

    const cerrarSesion = async () => {
        
        try {
            dispatch({
                type: CERRAR_SESION
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (

        <authContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                clase: state.clase,
                ok: state.ok,
                registrarUsuario,
                iniciarSesion,
                usuarioAutenticado,
                cerrarSesion
            }}
        >
            { children }
        </authContext.Provider>
    )
}

export default AuthState;