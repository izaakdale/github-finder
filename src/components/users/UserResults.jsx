import React from 'react'
import { useContext } from 'react'
import LoadingIcon from '../shared/LoadingIcon'
import UserItem from './UserItem'
import GithubContext from '../../context/github/GithubContext'

function UserResults() {

    const {users, loading} = useContext(GithubContext)

    if (loading) {
        return (
            <div className="hero">
                <LoadingIcon size={'50'}/>
            </div>
        )
    }
    return (
        <div className='grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2'>
            {users.map((user) => (
                <UserItem key={user.id} user={user}/>
            ))}
        </div>
    )
}

export default UserResults