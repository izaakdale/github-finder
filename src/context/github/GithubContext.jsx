import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext()

export const GithubProvider = ({children}) => {
    const initialState = {
        user: {},
        users: [],
        repos: [],
        loading: false,
    }

    const [state, dispatch] = useReducer(githubReducer, initialState)

    const setLoading = (loading) => {
        dispatch({
            type: 'SET_LOADING',
            payload: loading,
        })
    }

    return <GithubContext.Provider value={{ 
        ...state,
        dispatch,
        setLoading,
    }}
    >
        {children}
    </GithubContext.Provider>
}

export default GithubContext
