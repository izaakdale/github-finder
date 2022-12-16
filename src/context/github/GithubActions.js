
const gitUrl = process.env.REACT_APP_GITHUB_URL
const gitToken = process.env.REACT_APP_GITHUB_TOKEN

export const searchUsers = async (text) => {
    const response = await fetch(`${gitUrl}/search/users?q=${text}`, {
        headers: {
            Authorization: `Bearer ${gitToken}`
        }
    })
    const {items} = await response.json()
    return items
}

export const getUser = async (login) => {
    const response = await fetch(`${gitUrl}/users/${login}`, {
        headers: {
            Authorization: `Bearer ${gitToken}`
        }
    })

    if (response.status === 404) {
        window.location = '/notfound'
    } else {
        const data = await response.json()
        return data
    }
}

export const getUserRepos = async (login) => {
    const params = new URLSearchParams({
        sort: 'created',
        per_page: 10,
    })

    const response = await fetch(`${gitUrl}/users/${login}/repos?${params}`, {
        headers: {
            Authorization: `Bearer ${gitToken}`
        }
    })

    const data = await response.json()
    return data
}
