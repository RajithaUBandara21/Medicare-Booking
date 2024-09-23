import { createContext, useContext,useReducer } from "react";

const initialState = {
    user:null,
    role:null,
    token:null,
};


 export const authContext = createContext(initialState)



    const authRediucer = (state,action) =>
    {

        switch (action.type){
            case 'LOGIN_START':
                return{
                    user:null,
                    role:null,
                    token:null,
                };


                case "LOGIN_SUCCESS":
                return {
                  user: action.playload.user,
                  token: action.playload.token,
                  role: action.playload.role,
                };

                case 'LOGOUT':
                return{
                    user:null,
                    role:null,
                    token:null,
                };

                default:return state


        }
    }




export const AuthContextProvider = ({Children}) =>{
    const [state,dispatch] = useReducer(authRediucer,initialState)
    return (
      <authContext.Provider
        value={{ user: state, token: state.token, role: state.role, dispatch }}
      >
        {Children}
      </authContext.Provider >
    );
}