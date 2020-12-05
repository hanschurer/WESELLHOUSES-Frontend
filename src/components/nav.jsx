import React from 'react'
import { useContext } from 'react'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import UserContext from '../contexts/user'
function Nav() {
  const context = useContext(UserContext)
  let LoginNav
  const keys = ['register', 'login', 'account', 'logout']
  let selectedKeys = []
  keys.map(key => {
    if (window.location.href.indexOf(key) !== -1) {
      selectedKeys.push(key)
    }
  })
  if (!selectedKeys.length) {
    selectedKeys = ['home']
  }
  if (!context.user.token) {
    LoginNav = (
      <>
        <Menu.Item key="register">
          <Link to="/register">Register</Link>
        </Menu.Item>
        <Menu.Item key="login">
          <Link to="/login">Login</Link>
        </Menu.Item>
      </>
    )
  } else {
    LoginNav = (
      <>
        <Menu.Item key="account">
          <Link to="/account">Account</Link>
        </Menu.Item>
        <Menu.Item key="logout" onClick={context.logout}>
          Logout
        </Menu.Item>
      </>
    )
  }
  return (
    <>
      <Menu
        defaultSelectedKeys={selectedKeys}
        theme="dark"
        mode="horizontal"
        style={{ textAlign: 'right' }}
      >
        <Menu.Item key="home">
          <Link to="/">Home</Link>
        </Menu.Item>
        {LoginNav}
      </Menu>
    </>
  )
}

export default Nav
