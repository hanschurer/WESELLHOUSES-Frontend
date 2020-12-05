import React from 'react'
import { Layout } from 'antd'
import './App.css'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Nav from './components/nav'
import Home from './components/home'
import Account from './components/account'
import Item from './components/item'
import Register from './components/register'
import Login from './components/login'

const { Header, Content, Footer } = Layout

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Router>
        <Header>
          <Nav />
        </Header>

        <Content>
          <Switch>
            <Route path="/account" children={<Account />} />
            <Route path="/register" children={<Register />} />
            <Route path="/login" children={<Login />} />
            <Route path="/items/:id" children={<Item />} />
            <Route path="/" children={<Home />} exact />
          </Switch>
        </Content>

        <Footer style={{ textAlign: 'center' }}>
          Created By Han Wang 9987188
        </Footer>
      </Router>
    )
  }
}

export default App
