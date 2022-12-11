const githubReducer = (state, action) => {
    switch (action.type) {
        case 'GET_USER': {
            return {
                ...state, 
                user: action.payload,
            }
        }
        case 'GET_USER_REPOS': {
            return {
                ...state, 
                repos: action.payload,
            }
        }
        case 'GET_USERS': {
            return {
                ...state, 
                users: action.payload,
            }
        }
        case 'SET_LOADING': {
            return {
                ...state,
                loading: action.payload
            }
        }
        case 'CLEAR_USERS': {
            return {
                ...state,
                users: []
            }
        }
        default: {
            return state
        }
    }
}

export default githubReducer