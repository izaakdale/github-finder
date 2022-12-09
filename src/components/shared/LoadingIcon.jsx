import React from 'react'
import { FaSpinner } from 'react-icons/fa'

function LoadingIcon({size}) {
  return (
    <FaSpinner size={size} className="fa-xl loading loading-spin"></FaSpinner>
  )
}

export default LoadingIcon