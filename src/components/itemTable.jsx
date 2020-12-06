import React from 'react'
import { Table, Button, message, Input, Tag, Checkbox, Divider } from 'antd'
import axios from '../http'
import moment from 'moment'
import { types } from '../util'
import { withRouter } from 'react-router-dom'
const { Search } = Input
class itemTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      values: [],
      tags: []
    }
  }
  onSearch = value => {
    axios({
      url: '/api/v1/action/items',
      method: 'post',
      data: {
        type: this.state.values,
        name: value,
        tags: this.state.tags
      }
    }).then(({ data }) => {
      this.setState({ items: data })
    })
  }
  onGroupChange = values => {
    this.setState({
      values
    })
  }
  onGroupTagChange = tags => {
    this.setState({
      tags
    })
  }
  componentDidMount() {
    this.search()
  }
  search = () => {
    axios.post('/api/v1/action/items').then(({ data }) => {
      this.setState({ items: data })
    })
  }
  onAchieve = (_id, status) => {
    axios({
      url: '/api/v1/item/status/' + _id,
      method: 'put',
      data: {
        status
      }
    }).then(({ data }) => {
      message.success('Achieve succeeded')
      this.search()
    })
  }
  onDel = _id => {
    axios({
      url: '/api/v1/item/' + _id,
      method: 'delete'
    }).then(({ data }) => {
      message.success('Deletion succeeded')
      this.search()
    })
  }
  render() {
    const columns = [
      {
        title: 'name',
        dataIndex: 'name',
        align: 'center',
        key: 'name'
      },
      {
        title: 'status',
        dataIndex: 'status',
        align: 'center',
        key: 'status',
        render: text => <span>{text === 0 ? 'hide' : 'show'}</span>
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
        title: 'attribute',
        dataIndex: 'type',
        key: 'type',
        align: 'center',
        render: text => (
          <span>
            {text.map((t, i) => (
              <Tag key={i}>{types[t]}</Tag>
            ))}
          </span>
        )
      },
      {
        title: 'tags',
        dataIndex: 'tags',
        key: 'tags',
        align: 'center',
        render: tags => (
          <span>
            {tags.map((t, i) => (
              <Tag key={i}>{t}</Tag>
            ))}
          </span>
        )
      },
      {
        title: 'Action',
        key: 'action',
        align: 'center',
        width: 220,
        render: (text, record) => (
          <div>
            <Button
              type="link"
              onClick={() => this.props.history.push(`/item?id=${record._id}`)}
            >
              Details
            </Button>
            <Button
              type="link"
              onClick={() =>
                this.props.history.push(`/create/item?id=${record._id}`)
              }
            >
              Edit
            </Button>
            <Button
              type="link"
              onClick={() =>
                this.onAchieve(record._id, record.status === 0 ? 1 : 0)
              }
            >
              {record.status === 1 ? 'Achieve' : 'Show'}
            </Button>
            <Button type="link" onClick={() => this.onDel(record._id)}>
              Delete
            </Button>
          </div>
        )
      }
    ]
    return (
      <div>
        <Search
          placeholder="input search text"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={this.onSearch}
        />
        <Checkbox.Group value={this.state.values} onChange={this.onGroupChange}>
          <div style={{ padding: '2% 0 2% 0' }}>
            <Checkbox value={0}>Houses</Checkbox>
            <Checkbox value={1}>Apartment</Checkbox>
            <Checkbox value={2}>Flat</Checkbox>
          </div>
        </Checkbox.Group>
        <Divider />
        <Checkbox.Group
          value={this.state.tags}
          onChange={this.onGroupTagChange}
        >
          <div style={{ padding: '2% 0 2% 0' }}>
            <Checkbox value={'under offer'}>under offer</Checkbox>
            <Checkbox value={'high priority'}>high priority</Checkbox>
            <Checkbox value={'Garden'}>Garden</Checkbox>
            <Checkbox value={'Swimming pool'}>Swimming pool</Checkbox>
            <Checkbox value={'Garage'}>Garage</Checkbox>
          </div>
        </Checkbox.Group>
        <Table columns={columns} rowKey="_id" dataSource={this.state.items} />
      </div>
    )
  }
}
export default withRouter(itemTable)
