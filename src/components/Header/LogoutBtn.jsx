import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'

function LogoutBtn() {
  const dispatch = useDispatch()
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout())
    })
  }
  return (
    <button
      className='inline-bock p-2 duration-300 hover:scale-110 rounded-full'
      onClick={logoutHandler}
    >
      <img src="/exit.png" alt="" className='h-12' />
    </button>
  )
}

export default LogoutBtn