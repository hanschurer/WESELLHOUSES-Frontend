import React from 'react'
import {
  Button,
  Form,
  Input,
  Checkbox,
  InputNumber,
  Upload,
  message
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import '../css/itemAction.css'
import axios from '../http'
import { withRouter } from 'react-router-dom'
import { getQueryString } from '../util'
class ItemAction extends React.Component {
  formRef = React.createRef()
  constructor(props) {
    super(props)
    this.state = {
      forms: {
        name: '',
        desc: '',
        type: [],
        tags: [],
        fileList: []
      }
    }
  }
  componentDidMount() {
    if (getQueryString('id')) {
      axios.get('/api/v1/item/' + getQueryString('id')).then(({ data }) => {
        this.formRef.current.setFieldsValue({
          ...data,
          fileList: data.imgUrl.map((url, index) => ({
            status: 'done',
            uid: index,
            url: 'http://localhost:3030' + url,
            name: url
          }))
        })
        this.setState({
          forms: {
            ...data,
            fileList: data.imgUrl.map((url, index) => ({
              status: 'done',
              uid: index,
              url: 'http://localhost:3030' + url,
              name: url
            }))
          }
        })
      })
    }
  }
  handleChange = ({ fileList, event, file }) => {
    this.state.forms.fileList = fileList
    this.setState({
      forms: { ...this.state.forms }
    })
  }
  onGroupChange = values => {
    this.state.forms.type = values
    this.setState({
      forms: { ...this.state.forms }
    })
  }
  onGroupTagsChange = values => {
    this.state.forms.tags = values
    this.setState({
      forms: { ...this.state.forms }
    })
  }
  onFinish = values => {
    console.log(values)
    let fileList = values.fileList
    if (!(fileList instanceof Array)) {
      fileList = fileList.fileList
    }
    if (!getQueryString('id')) {
      axios({
        url: '/api/v1/item',
        method: 'post',
        data: {
          ...values,
          imgUrl: fileList.map(item =>
            item.response.path.replace('http://localhost:3030', '')
          ),
          fileList: undefined
        }
      }).then(({ data }) => {
        this.props.history.push('/')
        message.success('Created successfully')
      })
    } else {
      axios({
        url: '/api/v1/item/' + getQueryString('id'),
        method: 'put',
        data: {
          ...values,
          imgUrl: fileList.map(item =>
            (item.url || item.response.path).replace(
              'http://localhost:3030',
              ''
            )
          ),
          fileList: undefined
        }
      }).then(({ data }) => {
        this.props.history.push('/')
        message.success('Update successfully')
      })
    }
  }
  render() {
    const formItemLayout = {
      labelCol: { xs: { span: 24 }, sm: { span: 6 } },
      wrapperCol: { xs: { span: 24 }, sm: { span: 12 } }
    }
    const tailFormItemLayout = {
      wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 6 } }
    }
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    )
    return (
      <div className="item-action-wrap">
        <Form
          ref={this.formRef}
          {...formItemLayout}
          onFinish={this.onFinish}
          scrollToFirstError
        >
          <Form.Item
            name="name"
            label="name"
            hasFeedback
            rules={[{ required: true, message: 'Please enter a name' }]}
          >
            <Input
              value={this.state.forms.name}
              placeholder="Please enter a name"
            />
          </Form.Item>
          <Form.Item
            name="type"
            label="attribute"
            rules={[
              { required: true, type: 'array', message: 'Please select label' }
            ]}
          >
            <Checkbox.Group
              value={this.state.forms.type}
              onChange={this.onGroupChange}
            >
              <Checkbox value={0}>Houses</Checkbox>
              <Checkbox value={1}>Apartment</Checkbox>
              <Checkbox value={2}>Flat</Checkbox>
              <Checkbox value={3}>Garden</Checkbox>
              <Checkbox value={4}>Swimming pool</Checkbox>
              <Checkbox value={5}>Garage</Checkbox>
            </Checkbox.Group>
          </Form.Item>
          <Form.Item
            name="desc"
            label="description"
            rules={[{ required: true, message: 'Please enter a description' }]}
          >
            <Input.TextArea
              value={this.state.forms.desc}
              placeholder="Please enter a description"
            ></Input.TextArea>
          </Form.Item>

          <Form.Item
            name="tags"
            label="tags"
            rules={[
              { required: true, type: 'array', message: 'Please select label' }
            ]}
          >
            <Checkbox.Group
              value={this.state.forms.tags}
              onChange={this.onGroupTagsChange}
            >
              <Checkbox value={'NICE'}>NICE</Checkbox>
              <Checkbox value={'DEVELOPER'}>DEVELOPER</Checkbox>
              <Checkbox value={'LOSER'}>LOSER</Checkbox>
              <Checkbox value={'COOL'}>COOL</Checkbox>
              <Checkbox value={'TEACHER'}>TEACHER</Checkbox>
            </Checkbox.Group>
          </Form.Item>
          <Form.Item
            name="position"
            label="position"
            hasFeedback
            rules={[{ required: true, message: 'Please enter a position' }]}
          >
            <Input
              value={this.state.forms.position}
              placeholder="Please enter a position"
            />
          </Form.Item>
          <Form.Item
            name="price"
            label="price"
            hasFeedback
            rules={[{ required: true, message: 'Please enter a price' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              value={this.state.forms.price}
              min={0}
              precision={0}
              placeholder="Please enter a price"
            />
          </Form.Item>
          <Form.Item
            name="fileList"
            label="image"
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please upload the picture'
              }
            ]}
          >
            <Upload
              action="http://localhost:3030/api/v1/file"
              listType="picture-card"
              fileList={this.state.forms.fileList}
              onChange={this.handleChange}
              withCredentials={true}
            >
              {this.state.forms.fileList.length >= 8 ? null : uploadButton}
            </Upload>
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}
export default withRouter(ItemAction)
