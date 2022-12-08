import React from 'react'
import { useState, useEffect } from 'react'
import LoadingIcon from '../shared/LoadingIcon'
import UserItem from './UserItem'

function UserResults() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
        const response = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users`, {
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`
            }
        })
        const data = await response.json()
        setUsers(data)
        setLoading(false)
    }

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