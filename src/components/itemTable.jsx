import React from 'react'
import { Table, Tooltip, Avatar, Button, message } from 'antd'
import axios from '../http'
import moment from 'moment'
export default class itemTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      msgs: []
    }
  }

  componentDidMount() {
    this.searchMsgs()
  }
  searchMsgs = () => {
    axios('/api/v1/msgs').then(({ data }) => {
      this.setState({ msgs: data })
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
  render() {
    const columns = [
      {
        title: 'img',
        key: 'img',
        align: 'center',
        render: row => (
          <Avatar
            src={`http://localhost:3030${row.createUser &&
              row.createUser.avatarURL}`}
          />
        )
      },
      {
        title: 'username',
        key: 'username',
        align: 'center',
        render: row => <span>{row.createUser && row.createUser.username}</span>
      },
      {
        title: 'content',
        dataIndex: 'content',
        align: 'center',
        key: 'content',
        render: text => (
          <Tooltip title={text}>
            {text.length > 10 ? text.subtring(0, 10) + '...' : text}
          </Tooltip>
        )
      },
      {
        title: 'createdAt',
        dataIndex: 'createdAt',
        key: 'createdAt',
        align: 'center',
        render: text => (
          <span>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</span>
        )
      },
      {
        title: 'Action',
        key: 'action',
        align: 'center',
        render: (text, record) => (
          <div>
            <Button
              type="link"
              onClick={() => this.onCancellation(record._id)}
              style={{ marginRight: '10px' }}
            >
              Cancellation
            </Button>
            <Button type="link" onClick={() => this.onDel(record._id)}>
              Delete
            </Button>
          </div>
        )
      }
    ]
    return <Table columns={columns} rowKey="_id" dataSource={this.state.msgs} />
  }
}
