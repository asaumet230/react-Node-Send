
import { 
    REGISTRAR_EXITOSO, 
    REGISTRO_ERROR, 
    LIMPIAR_ALERTA, 
    LOGIN_ERROR, 
    LOGIN_EXITOSO,
    USUARIO_AUTENTICADO,
    CERRAR_SESION
} from "../../types";


const authReducer = (state, action) => {

    switch (action.type) {

        case REGISTRAR_EXITOSO:
            return {
                ...state,
                mensaje: action.payload.mensaje,
                clase: action.payload.clase,
                ok: action.payload.ok

            }
        case REGISTRO_ERROR:
        case LOGIN_ERROR:
            return {
                ...state,
                mensaje: action.payload.mensaje,
                clase: action.payload.clase
                
            }
        case LOGIN_EXITOSO:

            localStorage.setItem('token', action.payload);

            return {
                ...state,
                token: action.payload,
                autenticado: true
            }
        case LIMPIAR_ALERTA:
            return {
                ...state,
                mensaje: null,
                clase: ''
            }
         case USUARIO_AUTENTICADO: 
            return {
                ...state,
                usuario: action.payload,
                autenticado: true
            }
        case CERRAR_SESION:
            localStorage.removeItem('token');
            return {
                ...state,
                usuario: null,
                ok: false,
                token: null,
                autenticado: null
            }
        default:
            return state;
    }
}

export default authReducer;