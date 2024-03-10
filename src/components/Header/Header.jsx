import React from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true,
      src: "/home.png"
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
      src:"login.png"
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
      src:"refer.png"
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
      src:"/select.png"
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
      src:"/edit.png"
    },
  ]


  return (
    <header className='md:h-screen absolute'>
        <div className='pt-2 pl-2'>
          <Link to='/'>
            <Logo width='70px' />
          </Link>
        </div>
        <nav className='flex md:flex-col flex-row bottom-0 fixed md:top-[10%] md:p-2'>
          <ul className='flex md:flex-col md:w-fit md:ml-2 md:rounded-lg justify-center w-screen md:gap-3 gap-8 m-auto shadow-black bg-blur-lg shadow-xl p-2 bg-[url(site-bg.svg)]'>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className='p-2 duration-300 hover:scale-110 rounded-full'
                  >
                  {/* {item.name} */}
                  <img src={item.src} className="h-12" alt="" />
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
    </header>
  )
}

export default Header