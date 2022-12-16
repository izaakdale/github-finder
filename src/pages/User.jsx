import React from 'react'
import { useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import GithubContext from '../context/github/GithubContext'
import { FaCodepen, FaStore, FaTwitter, FaUserFriends, FaUsers } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import LoadingIcon from '../components/shared/LoadingIcon'
import RepoList from '../components/repos/RepoList'
import { getUser, getUserRepos } from '../context/github/GithubActions'

function User() {
    const {user, loading, repos, setLoading, dispatch} = useContext(GithubContext)
    const params = useParams()

    useEffect(() =>{
        setLoading(true)
        const getUserData = async () => {
            const userData = await getUser(params.login)
            dispatch({
                type: 'GET_USER',
                payload: userData,
            })
            const repoData = await getUserRepos(params.login)
            dispatch({
                type: 'GET_USER_REPOS',
                payload: repoData,
            })
        }
        getUserData()
        setLoading(false)
    }, [])

    const {
        name,
        type,
        avatar_url,
        location,
        bio,
        blog,
        twitter_username,
        login,
        html_url,
        followers,
        following,
        public_repos,
        public_gists,
        hireable,
    } = user

    if (loading) {
        return (
            <div className="hero">
                <LoadingIcon size={'50'}/>
            </div>
        )
    }

    return (
        <div>
            <div className="w-full mx-auto lg:w-10/12">
                <div className="mb-4">
                    <Link to={'/'} className='btn btn-ghost'>
                        back to search...
                    </Link>
                </div>
                <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 mb-8 md:gap-8">

                    <div className="custom-card-image mb-6 md:mb-0">
                        <div className="rounded-lg shadow-xl card image-full">
                            <figure>
                                <img src={avatar_url} alt="profile pic not found"/>
                            </figure>
                            <div className="card-body justify-end">
                                <p className='flex-grow-0 text-white'>
                                    {login}
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-span-2">
                        <div className="mb-6">
                            <h1 className="text-3xl card-title text-white">
                                {name}
                                <div className="ml-2 mr-1 badge badge-success">
                                    {type}
                                </div>
                                {user.hirable && (
                                    <div className="mx-1 badge badge-info">
                                        hirable
                                    </div>
                                )}
                            </h1>
                            <p className='text-sm'>
                                {bio}
                            </p>
                            <div className="mt-4 card-actions">
                                <a href={html_url} target='_blank' rel='noreferrer' className='btn btn-outline'>
                                    visit profile
                                </a>
                            </div>
                        </div>

                        <div className="w-full rouded-lg shadow-md bg-base-100 stats">
                            {location && (
                                <div className="stat">
                                    <div className="stat-title text-md">Location: </div>
                                    <div className="text-lg stat-value">{location}</div>
                                </div>
                            )}
                            {blog && (
                                <div className="stat">
                                    <div className="stat-title text-md">Website: </div>
                                    <div className="text-lg stat-value">
                                        <a href={`https://${blog}`} target="_blank" rel="noreferrer">
                                            {blog}
                                        </a>
                                    </div>
                                </div>
                            )}
                            {twitter_username && (
                                <div className="stat">
                                    <div className="stat-title text-md"><FaTwitter/></div>
                                    <div className="text-lg stat-value">
                                        <a href={`https://twitter.com/${twitter_username}`} target="_blank" rel="noreferrer">
                                            {twitter_username}
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full py-5 mb-6 rounded-lg shadow-md bg-base-100 stats">
                <div className="stat">
                    <div className="stat-figure text-neutral">
                        <FaUsers className='text-3xl md:text-5xl'/>
                    </div>
                    <div className="stat-title pr-5">
                        Followers:
                    </div>
                    <div className="stat-value pr-5 text-3xl md:text-4xl">
                        {followers}
                    </div>
                </div>
                <div className="stat">
                    <div className="stat-figure text-neutral">
                        <FaUserFriends className='text-3xl md:text-5xl'/>
                    </div>
                    <div className="stat-title pr-5">
                        Following:
                    </div>
                    <div className="stat-value pr-5 text-3xl md:text-4xl">
                        {following}
                    </div>
                </div>
                <div className="stat">
                    <div className="stat-figure text-neutral">
                        <FaCodepen className='text-3xl md:text-5xl'/>
                    </div>
                    <div className="stat-title pr-5">
                        Public Repos:
                    </div>
                    <div className="stat-value pr-5 text-3xl md:text-4xl">
                        {public_repos}
                    </div>
                </div>
                <div className="stat">
                    <div className="stat-figure text-neutral">
                        <FaStore className='text-3xl md:text-5xl'/>
                    </div>
                    <div className="stat-title pr-5">
                        Public Gists:
                    </div>
                    <div className="stat-value pr-5 text-3xl md:text-4xl">
                        {public_gists}
                    </div>
                </div>
            </div>
            <RepoList repos={repos}/>
        </div>
    )
}

export default User