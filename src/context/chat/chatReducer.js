import { types } from "../../types/types"


export const chatReducer = (state, action) => {

    switch (action.type) {
        

        case types.cerrarSesion:
            return{
                uid : '',
                chatActivo : null, //UID del usuario al que yo quiero enviar mensajes
                users: [], // Todos los usuarios de la base de datos
                mesagges: [], //El chat seleccionado
            }

        case types.usuariosCargados:
            return {
                ...state,
                users: [...action.payload]
            }
        
        case types.activarChat:

            if (state.chatActivo === action.payload) return state;
            return{
                ...state,
                chatActivo: action.payload,
                mesagges: []
            }
        
        case types.newMessage:
            if(state.chatActivo === action.payload.de ||
                state.chatActivo === action.payload.para ){
                return{
                    ...state,
                    mesagges: [...state.mesagges, action.payload]
                }
            }else{
                return state
            }
        case types.cargarMessages:
            return{
                ...state,
                mesagges: [...action.payload]
            }


        default:
            return state
    }
}