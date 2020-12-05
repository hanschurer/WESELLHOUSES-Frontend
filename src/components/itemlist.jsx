import React from 'react'
import { PlusOutlined } from '@ant-design/icons'
import axios from '../http'
import {
  PageHeader,
  Input,
  Checkbox,
  Tag,
  Divider,
  Menu,
  Dropdown,
  Button,
  message
} from 'antd'
import '../css/item.css'
import { withRouter } from 'react-router-dom'
const { Search } = Input

const types = [
  'Houses', //0
  'Apartment', //1
  'Flat', //2
  'Garden', //3
  'Swimming pool', //4
  'Garage' //5
]
class Itemlist extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      values: [],
      tags: []
    }
  }

  componentDidMount() {
    axios.post('/api/v1/items').then(({ data }) => {
      this.setState({ items: data })
    })
  }
  onSearch = value => {
    axios({
      url: '/api/v1/items',
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
  onAddClick = () => {
    this.props.history.push('/create/item')
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
  render() {
    return (
      <>
        <div style={{ padding: '2% 20%' }}>
          <div className="add-btn" onClick={this.onAddClick}>
            <PlusOutlined />
          </div>
          <PageHeader
            className="site-page-header"
            title="We Sell Houses"
            subTitle="Welcome to the WeSellHouses."
          />

          <Search
            placeholder="input search text"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={this.onSearch}
          />
          <Checkbox.Group
            value={this.state.values}
            onChange={this.onGroupChange}
          >
            <div style={{ padding: '2% 0 2% 0' }}>
              <Checkbox value={0}>Houses</Checkbox>
              <Checkbox value={1}>Apartment</Checkbox>
              <Checkbox value={2}>Flat</Checkbox>
              <Checkbox value={3}>Garden</Checkbox>
              <Checkbox value={4}>Swimming pool</Checkbox>
              <Checkbox value={5}>Garage</Checkbox>
            </div>
          </Checkbox.Group>
          <Divider />
          <Checkbox.Group
            value={this.state.tags}
            onChange={this.onGroupTagChange}
          >
            <div style={{ padding: '2% 0 2% 0' }}>
              <Checkbox value={'NICE'}>NICE</Checkbox>
              <Checkbox value={'DEVELOPER'}>DEVELOPER</Checkbox>
              <Checkbox value={'LOSER'}>LOSER</Checkbox>
              <Checkbox value={'COOL'}>COOL</Checkbox>
              <Checkbox value={'TEACHER'}>TEACHER</Checkbox>
            </div>
          </Checkbox.Group>
        </div>
        {this.state.items.map(item => {
          return (
            <div className="item">
              <div className="item-left">
                <img src={'http://localhost:3030' + item.imgUrl[0]} />
              </div>
              <div className="item-body">
                <div className="item-title">{item.name}</div>
                <div className="item-tags">
                  {item.type.map(t => {
                    return <Tag>{types[t]}</Tag>
                  })}
                </div>
                <div className="item-type">
                  {item.tags.map(t => {
                    return <span>{t}</span>
                  })}
                </div>
                <div className="item-desc">{item.desc}</div>
                <div className="item-position">{item.position}</div>
                <div className="item-user">
                  {item.createUser && item.createUser.username} publish
                </div>
              </div>
              <div className="item-price">
                <p>${item.price}</p>
                <Dropdown
                  overlay={
                    <Menu>
                      <Menu.Item onClick={() => this.props.history.push(`/create/item?id=${item._id}`)}>Update</Menu.Item>
                      <Menu.Item
                        danger
                        onClick={() => this.onItemUpdate(item._id)}
                      >
                        Cancellation
                      </Menu.Item>
                      <Menu.Item
                        danger
                        onClick={() => this.onItemDel(item._id)}
                      >
                        Delete
                      </Menu.Item>
                    </Menu>
                  }
                >
                  <Button>Action</Button>
                </Dropdown>
              </div>
            </div>
          )
        })}
      </>
    )
  }
}
export default withRouter(Itemlist)
