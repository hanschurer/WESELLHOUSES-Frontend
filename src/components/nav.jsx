import React from 'react'
import { Menu, Avatar, message } from 'antd'
import { connect } from 'react-redux'
import { setUser } from '../store/actions'
import { useHistory } from 'react-router-dom'
/**
 * Component for nav page.
 * inclued home regiseter login account and logout
 * 
 */
function Nav(props) {
  let history = useHistory()
  let LoginNav
  let selectedKeys = props.selectedKeys
  const isLogin = (path, flag = true) => {
    if (flag && !props.user.token) return message.info('Please log in')
    history.push(path)
  }
  const setActiveMenu = () => {
    let newselectedKeys = []
    let routes = ['register', 'login', 'account']
    routes.map(key => {
      if (window.location.pathname.indexOf(key) !== -1) {
        newselectedKeys = [key]
      }
    })
    if (newselectedKeys.length === 0) {
      newselectedKeys = ['home']
    }
    if (newselectedKeys[0] !== selectedKeys[0]) {
      props.change(newselectedKeys)
    }
  }
  setActiveMenu()
  history.listen(setActiveMenu)

  if (!props.user.token) {
    LoginNav = (
      <>
        <Menu.Item key="register" onClick={() => isLogin('/register', false)}>
          Register
        </Menu.Item>
        <Menu.Item key="login" onClick={() => isLogin('/login', false)}>
          Login
        </Menu.Item>
      </>
    )
  } else {
    LoginNav = (
      <>
        <Menu.Item key="account" onClick={() => isLogin('/account')}>
          Account
        </Menu.Item>
        <Menu.Item
          key="logout"
          onClick={() => {
            props.setUser({})
            history.push('/login')
          }}
        >
          Logout
        </Menu.Item>
      </>
    )
  }
  return (
    <>
      <Menu
        selectedKeys={selectedKeys}
        theme="dark"
        mode="horizontal"
        style={{ textAlign: 'right' }}
      >
        <Menu.Item key="home" onClick={() => isLogin('/', false)}>
          Home
        </Menu.Item>
        {LoginNav}
        {props.user.token ? (
          <span style={{ margin: '0 15px' }}>{props.user.username}</span>
        ) : null}
        {props.user.token ? (
          <Avatar src={'http://localhost:3030' + props.user.avatarURL} />
        ) : null}
      </Menu>
    </>
  )
}

export default connect(
  state => ({
    user: state.user
  }),
  { setUser }
)(Nav)
