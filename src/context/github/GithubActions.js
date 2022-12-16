import axios from "axios"
const gitUrl = process.env.REACT_APP_GITHUB_URL
const gitToken = process.env.REACT_APP_GITHUB_TOKEN

const github = axios.create({
    baseURL: gitUrl,
    headers: {
        Authorization: `Bearer ${gitToken}`,
    }
})

export const searchUsers = async (text) => {
    const repsponse = await github.get(`/search/users?${text}`)
    return repsponse.data.items
}

export const getUserAndRepos = async (login) => {
    const [user, repos] = await Promise.all([
        github.get(`/users/${login}`),
        github.get(`/users/${login}/repos`)
    ])

    return {user: user.data, repos: repos.data}
}