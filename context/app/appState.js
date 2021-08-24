import React, { useReducer } from 'react';

import appContext from './appContext';
import appReducer from './appReducer';

import clienteAxios from '../../config/axios';

import {
    MOSTRAR_ALERTA,
    LIMPIAR_ALERTA,
    SUBIR_ARCHIVO,
    SUBIR_ARCHIVO_EXITO,
    SUBIR_ARCHIVO_ERROR,
    CREAR_ENLACE_EXITO,
    CREAR_ENLACE_ERROR,
    LIMPIAR_STATE,
    AGREGAR_PASSWORD,
    AGREGAR_DESCARGAS
} from'../../types/index';

const AppState = ({children}) => {

    const initialState = {
        mensaje_archivo: null,
        clase_app:'',
        nombre: '',
        nombre_original:'',
        cargando: null,
        descargas: 1,
        password: '',
        autor: null,
        url:''
    }
    
    const[ state, dispatch ] = useReducer(appReducer, initialState);
    
    // Muestra una alerta:
    const mostrarAlerta = (mensaje) => {

        dispatch({
            type: MOSTRAR_ALERTA,
            payload: {
                mensaje,
                clase_app: 'bg-red-500'
            }
        });

        setTimeout(() => {
            dispatch({
                type: LIMPIAR_ALERTA
            })
        }, 3000);

    }

    // Subir archivos:
    const subirArchivo = async (formData, nombreArchivo) => {

        dispatch({
            type: SUBIR_ARCHIVO
        })
     
        try {

            const resultado = await clienteAxios.post('/api/archivos', formData);
            // console.log(resultado.data);

            dispatch({
                type: SUBIR_ARCHIVO_EXITO,
                payload: {
                    nombre: resultado.data.archivo,
                    nombre_original: nombreArchivo
                }
            });
        } catch (error) {
            console.log(error);
            dispatch({
                type: SUBIR_ARCHIVO_ERROR,
                payload: {
                    mensaje: error.response.data.msg, 
                    clase_app: 'bg-red-500'
                }
            })
        }
    }
    

    // Crea enlace:
    const crearEnlace =  async () => {

        const data = {
            nombre: state.nombre,
            nombre_original: state.nombre_original,
            cargando: state.cargando,
            descargas: state.descargas,
            password: state.password,
            autor: state.autor,
        }

        try {
            const resultado = await clienteAxios.post('/api/enlaces', data);

            dispatch({
                type: CREAR_ENLACE_EXITO,
                payload: resultado.data.url
            })
        } catch (error) {
            console.log(error);
        }
       

    }

    // limpia el State:
    const limpiarState = () => {

        dispatch({
            type: LIMPIAR_STATE,
        })

    }

    const agregarPassword = password => {

        dispatch({
            type: AGREGAR_PASSWORD,
            payload: password
        })
       
    }

    const agregarDescargas = descargas => {

        dispatch({
            type: AGREGAR_DESCARGAS,
            payload: descargas
        })
    } 

    return (  

        <appContext.Provider
             
            value = {{
                mensaje_archivo: state.mensaje_archivo,
                clase_app: state.clase_app,
                nombre: state.nombre,
                nombre_original: state.nombre_original,
                cargando: state.cargando,
                descargas: state.descargas,
                password: state.password,
                autor: state.autor,
                url: state.url,
                mostrarAlerta,
                subirArchivo,
                crearEnlace,
                limpiarState,
                agregarPassword,
                agregarDescargas
            }}
        
        >
            {children}
        </appContext.Provider>
    );
}
 
export default AppState;