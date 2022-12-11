import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext()

const gitUrl = process.env.REACT_APP_GITHUB_URL
const gitToken = process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider = ({children}) => {
    const initialState = {
        user: {},
        users: [],
        repos: [],
        loading: false,
    }

    const [state, dispatch] = useReducer(githubReducer, initialState)

    const searchUsers = async (text) => {
        setLoading(true)

        const response = await fetch(`${gitUrl}/search/users?q=${text}`, {
            headers: {
                Authorization: `Bearer ${gitToken}`
            }
        })
        const {items} = await response.json()
        dispatch({
            type: 'GET_USERS',
            payload: items,
        })
        setLoading(false)
    }

    const getUser = async (login) => {
        setLoading(true)

        const response = await fetch(`${gitUrl}/users/${login}`, {
            headers: {
                Authorization: `Bearer ${gitToken}`
            }
        })

        if (response.status === 404) {
            window.location = '/notfound'
        } else {
            const data = await response.json()
            dispatch({
                type: 'GET_USER',
                payload: data,
            })
        }
        setLoading(false)
    }

    const getUserRepos = async (login) => {
        setLoading(true)

        const params = new URLSearchParams({
            sort: 'created',
            per_page: 10,
        })

        const response = await fetch(`${gitUrl}/users/${login}/repos?${params}`, {
            headers: {
                Authorization: `Bearer ${gitToken}`
            }
        })

        if (response.status === 404) {
            window.location = '/notfound'
        } else {
            const data = await response.json()
            dispatch({
                type: 'GET_USER_REPOS',
                payload: data,
            })
        }
        setLoading(false)

    }

    const setLoading = (loading) => {
        dispatch({
            type: 'SET_LOADING',
            payload: loading,
        })
    }

    const clearUsers = () => {
        dispatch({
            type: 'CLEAR_USERS',
        })
    }

    return <GithubContext.Provider value={{ 
        user:state.user, 
        users: state.users, 
        loading: state.loading,
        repos: state.repos,
        searchUsers, 
        clearUsers, 
        getUser,
        getUserRepos,
    }}
    >
        {children}
    </GithubContext.Provider>
}

export default GithubContext
