import React from 'react'
import { Table, Tooltip, Avatar, Button, message } from 'antd'
import axios from '../http'
import moment from 'moment'
/**
 * Component for message table.
 *
 * @component
 
 */
export default class itemTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      msgs: []
    }
  }
/**
 * call the searchmsgs fucntion to get the public message
 *
 */
  componentDidMount() {
    this.searchMsgs()
  }
  searchMsgs = () => {
    axios('/api/v1/action/msgs').then(({ data }) => {
      this.setState({ msgs: data })
    })
  }
  /**
 * achieve one message
 *@param int _id message id
 *@param boolean visible of not
 */
  onAchieve = (_id, status) => {
    axios({
      url: '/api/v1/msg/' + _id,
      method: 'put',
      data: {
        status
      }
    }).then(({ data }) => {
      message.success('Achieve succeeded')
      this.searchMsgs()
    })
  }
  /**
 * delete a message by ID
 *
 */
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
        title: 'status',
        dataIndex: 'status',
        align: 'center',
        key: 'status',
        render: text => <span>{text === 0 ? 'hide' : 'show'}</span>
      },
      {
        title: 'content',
        dataIndex: 'content',
        align: 'center',
        key: 'content',
        render: text => (
          <Tooltip title={text}>
            {text.length > 10 ? text.substring(0, 10) + '...' : text}
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
              onClick={() =>
                this.onAchieve(record._id, record.status === 0 ? 1 : 0)
              }
              style={{ marginRight: '10px' }}
            >
              {record.status === 1 ? 'Achieve' : 'show'}
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
