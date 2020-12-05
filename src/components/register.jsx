import React from 'react'
import { Form, Input, Button, message } from 'antd'
import axios from '../http'
import { withRouter } from 'react-router-dom'
// add some layout to keep the form organised on different screen sizes
const formItemLayout = {
  labelCol: { xs: { span: 24 }, sm: { span: 6 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 12 } }
}
const tailFormItemLayout = {
  wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 6 } }
}

// define validation rules for the form fields
const emailRules = [
  { type: 'email', message: 'The input is not valid E-mail!' },
  { required: true, message: 'Please input your E-mail!' }
]

const passwordRules = [
  { required: true, message: 'Please input your password!' }
]

const confirmRules = [
  { required: true, message: 'Please confirm your password!' },
  // rules can include function handlers in which you can apply additional logic
  ({ getFieldValue }) => ({
    validator(rule, value) {
      if (!value || getFieldValue('password') === value) {
        return Promise.resolve()
      }
      return Promise.reject('The two passwords that you entered do not match!')
    }
  })
]

const usernameRules = [
  { required: true, message: 'Please input your username!', whitespace: true }
]

/**
 * Registration form component for app signup.
 */
class RegistrationForm extends React.Component {
  constructor() {
    super()
  }

  onFinish = values => {
    console.log('Received values of form: ', values)
    const { confirm, ...data } = values // ignore the 'confirm' value in data sent
    axios({
      url: `/api/v1/users`,
      method: 'post',
      data
    })
      .then(({ data }) => {
        window.localStorage.setItem('user', JSON.stringify(data))
        message.success('User added')
        window.location.href = '/login'
      })
  }

  render() {
    return (
      <Form
        style={{ margin: 40 }}
        {...formItemLayout}
        name="register"
        onFinish={this.onFinish}
        scrollToFirstError
      >
        <Form.Item name="email" label="E-mail" rules={emailRules}>
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

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={confirmRules}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item name="username" label="Username" rules={usernameRules}>
          <Input />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    )
  }
}

export default withRouter(RegistrationForm)
