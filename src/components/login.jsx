import React from 'react'
import { Form, Input, Button } from 'antd'
import UserContext from '../contexts/user'
import { Redirect } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import axios from '../http'
// add some layout to keep the form organised on different screen sizes
const formItemLayout = {
  labelCol: { xs: { span: 24 }, sm: { span: 6 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 12 } }
}
const tailFormItemLayout = {
  wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 6 } }
}

// define validation rules for the form fields
const passwordRules = [
  { required: true, message: 'Please input your password!' }
]

const usernameRules = [
  { required: true, message: 'Please input your username!', whitespace: true }
]

/**
 * Login form component for app signup.
 */
class LoginForm extends React.Component {
  constructor(props) {
    super(props)
  }

  state = { redirect: null }

  static contextType = UserContext

  login = values => {
    const { username, password } = values
    console.log(`logging in user: ${username}`)
    axios('/api/v1/login', {
      method: 'POST',
      data: {
        username,
        password
      }
    }).then(({ data }) => {
      this.context.login(data)
      window.location.href = '/'
    })
  }

  render() {
    console.log(this.context)
    return (
      <Form
        style={{ margin: 40 }}
        {...formItemLayout}
        name="login"
        onFinish={this.login}
        scrollToFirstError
      >
        <Form.Item name="username" label="Username" rules={usernameRules}>
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={passwordRules}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    )
  }
}

export default withRouter(LoginForm)
