import React from 'react'
import { FaSpinner } from 'react-icons/fa'

function LoadingIcon({size}) {
  return (
    <FaSpinner size={size} class="fa-xl loading loading-spin"></FaSpinner>
  )
}

export default LoadingIcon