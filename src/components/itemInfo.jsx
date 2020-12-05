import React from 'react'
import axios from '../http'
import {
  Tag,
  Menu,
  Dropdown,
  Button,
  message,
  Carousel,
  Divider,
  Comment,
  Tooltip,
  Avatar,
  Form,
  Input
} from 'antd'
import '../css/item.css'
import { withRouter } from 'react-router-dom'
import { getQueryString, types } from '../util'
import moment from 'moment'

const { TextArea } = Input
const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Add Comment
      </Button>
    </Form.Item>
  </>
)
class ItemInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      submitting: false,
      msgs: [],
      item: {
        imgUrl: [],
        tags: [],
        type: []
      }
    }
  }

  componentDidMount() {
    if (getQueryString('id')) {
      axios.get('/api/v1/item/' + getQueryString('id')).then(({ data }) => {
        this.setState({
          item: data
        })
      })
      this.searchMsgs()
    }
  }
  onItemDel = _id => {
    axios({
      url: '/api/v1/item/' + _id,
      method: 'delete'
    }).then(({ data }) => {
      message.success('Deletion succeeded')
      this.onSearch('')
    })
  }
  onItemUpdate = _id => {
    axios({
      url: '/api/v1/item/' + _id,
      method: 'put',
      data: {
        status: 1
      }
    }).then(({ data }) => {
      message.success('Cancellation succeeded')
      this.onSearch('')
    })
  }
  handleChange = e => {
    this.setState({
      value: e.target.value
    })
  }
  searchMsgs = () => {
    axios({
      url: '/api/v1/msgs/' + getQueryString('id')
    }).then(({ data }) => {
      this.setState({ msgs: data })
    })
  }
  addMsg = () => {
    axios({
      url: '/api/v1/msg',
      method: 'post',
      data: {
        item: getQueryString('id'),
        content: this.state.value
      }
    }).then(({ data }) => {
      this.setState({
        submitting: false,
        value: ''
      })
      this.searchMsgs()
    })
  }
  onCancellation = _id => {
    axios({
      url: '/api/v1/msg/' + _id,
      method: 'put',
      data: {
        status: 1
      }
    }).then(({ data }) => {
      message.success('Cancellation succeeded')
      this.searchMsgs()
    })
  }
  onDel = _id => {
    axios({
      url: '/api/v1/msg/' + _id,
      method: 'delete'
    }).then(({ data }) => {
      message.success('Deletion succeeded')
      this.searchMsgs()
    })
  }
  handleSubmit = () => {
    if (this.state.submitting || !this.state.value) return
    this.state.submitting = true
    this.setState({
      submitting: true
    })
    this.addMsg()
  }
  render() {
    const item = this.state.item
    return (
      <>
        <Carousel style={{ marginTop: '40px' }} autoplay>
          {item.imgUrl.map((url, index) => {
            return (
              <div className="banner" key={index}>
                <img src={'http://localhost:3030' + url} />
              </div>
            )
          })}
        </Carousel>
        <div className="item item-row-price">
          <div>${item.price}</div>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item
                  onClick={() =>
                    this.props.history.push(`/create/item?id=${item._id}`)
                  }
                >
                  Update
                </Menu.Item>
                <Menu.Item danger onClick={() => this.onItemUpdate(item._id)}>
                  Cancellation
                </Menu.Item>
                <Menu.Item danger onClick={() => this.onItemDel(item._id)}>
                  Delete
                </Menu.Item>
              </Menu>
            }
          >
            <Button>Action</Button>
          </Dropdown>
        </div>
        <div className="item item-info">
          <div className="item-body">
            <div className="item-title">{item.name}</div>
            <div className="item-tags">
              {item.type.map((t, index) => {
                return <Tag key={index}>{types[t]}</Tag>
              })}
            </div>
            <div className="item-type">
              {item.tags.map((t, index) => {
                return <span key={index}>{t}</span>
              })}
            </div>
            <div className="item-desc">{item.desc}</div>
            <div className="item-position">{item.position}</div>
            <div className="item-user">
              {item.createUser && item.createUser.username} publish
            </div>
          </div>
        </div>
        <Divider />

        {/*  */}
        <div className="item-info-ctx">
          <h3>Message</h3>
          <Comment
            avatar={null}
            content={
              <Editor
                onChange={this.handleChange}
                onSubmit={this.handleSubmit}
                submitting={this.state.submitting}
                value={this.state.value}
              />
            }
          />
          {this.state.msgs.map(msg => {
            return (
              <Comment
                key={msg._id}
                actions={[
                  <Button
                    type="link"
                    onClick={() => this.onCancellation(msg._id)}
                    style={{ marginRight: '10px' }}
                  >
                    Cancellation
                  </Button>,
                  <Button type="link" onClick={() => this.onDel(msg._id)}>
                    Delete
                  </Button>
                ]}
                author={<a>{msg.createUser && msg.createUser.username}</a>}
                avatar={null}
                content={<p>{msg.content}</p>}
                datetime={
                  <Tooltip
                    title={moment(msg.createdAt).format('YYYY-MM-DD HH:mm:ss')}
                  >
                    <span>{moment(msg.createdAt).fromNow()}</span>
                  </Tooltip>
                }
              />
            )
          })}
        </div>
      </>
    )
  }
}
export default withRouter(ItemInfo)
