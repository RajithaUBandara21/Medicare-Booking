import { createContext,useReducer } from "react";

// user is stored as JSON; parse it back, falling back to null for anything
// missing or corrupted instead of leaving a raw/garbage string in state.
const readStoredUser = () => {
    const stored = localStorage.getItem("user");
    if (!stored) return null;
    try {
        return JSON.parse(stored);
    } catch {
        return null;
    }
};

const initialState = {
    user: readStoredUser(),
    role:localStorage.getItem("role") || null,
    token:localStorage.getItem("token") || null,
};


 export const authContext = createContext(initialState)




// setItem(key, null) stores the string "null" (truthy on next read), so
// clear the key instead when a value is actually absent (e.g. after logout).
// This runs inside the reducer - synchronously during dispatch, before React
// commits or runs any effects - so a consumer's own effect (e.g. Header's
// profile fetch, which reads the token straight from localStorage) never
// fires against a stale value from a not-yet-run persistence effect.
const persist = (state) => {
    if (state.user) {
        localStorage.setItem("user", JSON.stringify(state.user));
    } else {
        localStorage.removeItem("user");
    }

    if (state.token) {
        localStorage.setItem("token", state.token);
    } else {
        localStorage.removeItem("token");
    }

    if (state.role) {
        localStorage.setItem("role", state.role);
    } else {
        localStorage.removeItem("role");
    }

    return state;
};

    const authReducer = (state,action) =>
    {

        switch (action.type){
            case 'LOGIN_START':
                return persist({
                    user:null,
                    role:null,
                    token:null,
                });


                case "LOGIN_SUCCESS":
                return persist({
                  user: action.payload.user,
                  token: action.payload.token,
                  role: action.payload.role,
                });

                case 'LOGOUT':
                return persist({
                    user:null,
                    role:null,
                    token:null,
                });

                default:return state


        }
    }




export const AuthContextProvider = ({children}) =>{
  const [state, dispatch] = useReducer(authReducer, initialState);

    return (
      <authContext.Provider
        value={{ user: state, token: state.token, role: state.role, dispatch }}
      >
        {children}
      </authContext.Provider >
    );
}