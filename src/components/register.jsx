import React from 'react'
import { Form, Input, Button, message, Upload } from 'antd'
import axios from '../http'
import { withRouter } from 'react-router-dom'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
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

function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!')
  }
  return isJpgOrPng && isLt2M
}
/**
 * Registration form component for app signup.
 */
class RegistrationForm extends React.Component {
  constructor() {
    super()
    this.state = {
      imageUrl: '',
      loading: false
    }
  }
  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true })
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false
        })
      )
    }
  }
  onFinish = values => {
    console.log('Received values of form: ', values)
    const { confirm, ...data } = values // ignore the 'confirm' value in data sent
    if (data.code !== 'we_sell_houses_agent') {
      return message.info('sign-up code incorrect!')
    }
    axios({
      url: `/api/v1/users`,
      method: 'post',
      data: {
        ...data,
        avatarURL: values.imageUrl.file.response.path,
        imageUrl: undefined,
        code: undefined
      }
    }).then(({ data }) => {
      window.localStorage.setItem('user', JSON.stringify(data))
      message.success('User added')
      this.props.history.push('/login')
    })
  }

  render() {
    const { loading, imageUrl } = this.state
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    )
    return (
      <Form
        style={{ margin: 40 }}
        {...formItemLayout}
        name="register"
        onFinish={this.onFinish}
        scrollToFirstError
      >
        <Form.Item
          name="imageUrl"
          label="imageUrl"
          rules={[{ required: true, message: 'Please upload your avatarURL!' }]}
        >
          <Upload
            name="file"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="http://localhost:3030/api/v1/file"
            beforeUpload={beforeUpload}
            onChange={this.handleChange}
            withCredentials={true}
          >
            {imageUrl ? (
              <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
            ) : (
              uploadButton
            )}
          </Upload>
        </Form.Item>
        <Form.Item name="username" label="Username" rules={usernameRules}>
          <Input />
        </Form.Item>
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

        <Form.Item
          name="code"
          label="sign-up code"
          rules={[
            {
              required: true,
              message: 'Please input your sign-up code!',
              whitespace: true
            }
          ]}
        >
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
