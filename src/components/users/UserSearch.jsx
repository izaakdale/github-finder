import React from 'react'
import { useState, useContext } from 'react'
import GithubContext from '../../context/github/GithubContext'
import AlertContext from '../../context/alert/AlertContext'
import { searchUsers } from '../../context/github/GithubActions'

function UserSearch() {
    const [text, setText] = useState('')

    const {users, dispatch, setLoading} = useContext(GithubContext)
    const {setAlert} = useContext(AlertContext)

    const handleChange = (e) => {
        setText(e.target.value)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()

        if (text === '') {
            setAlert('please enter something', 'error')
        } else {
            const users = await searchUsers(text)
            setLoading(true)
            dispatch({
                type: 'GET_USERS',
                payload: users,
            })
            searchUsers(text)
            setLoading(false)
        }
        setText('')
    }

    return (
        <div className='grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8'>
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="form-control">
                        <div className="relative">
                            <input 
                                type='text' 
                                className='w-full pr-40 bg-gray-200 input input-lg text-black' 
                                placeholder='search...'
                                value={text}
                                onChange={handleChange}
                            />
                            <button
                                // disables text if there is no entry, personally think this is better 
                                // than the tutorial but for alert purposes i will keep it commented
                                // disabled={text === ''}
                                type='submit' 
                                className='absolute top-0 right-0 rounded-l-none w-36 btn btn-lg'
                            >
                                go!
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            {users.length > 0 && (
                <div>
                    <button className="btn btn-ghost btn-lg" onClick={() => {dispatch({type: 'CLEAR_USERS'})}}>
                        clear
                    </button>
                </div>
            )}
        </div>
    )
}

export default UserSearch