import { createContext, useReducer } from "react";

export const chatContext = createContext();

export const ChatContextProvider = ({children}) => {

   const INITIAL_STATE =  {
        user:{},
        roomId:null
    }

    const chatReducer = (state, action) => {
        switch(action.type){
            case "CHANGE_USER":
                return{
                    user:action.payload,
                    roomId:action.payload.uuid
                }
            default:
                return state
        }

    }


    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE)

    return (
        <chatContext.Provider value={{state, dispatch}}>
            {children}
        </chatContext.Provider>
    
    )
}

