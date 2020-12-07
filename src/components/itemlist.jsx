import React from 'react'
import { PlusOutlined } from '@ant-design/icons'
import axios from '../http'
import { types } from '../util'
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
import { connect } from 'react-redux'
const { Search } = Input

/**
 * Component for showing porperty list and also search fucntion.
 *
 */
class Itemlist extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      values: [],
      tags: []
    }
  }
/**
 * set data to the item
 *
 */
  componentDidMount() {
    axios.post('/api/v1/items').then(({ data }) => {
      this.setState({ items: data })
    })
  }
  /**
 * search fucniton
 * @param value input value
 * 
 *
 */
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
  /**
 * add a item
 *
 */
  onAddClick = () => {
    this.props.history.push('/create/item')
  }
  /**
 * delete a item by id
 *@param int item id
 */
  onItemDel = _id => {
    axios({
      url: '/api/v1/item/' + _id,
      method: 'delete'
    }).then(({ data }) => {
      message.success('Deletion succeeded')
      this.onSearch('')
    })
  }
  /**
 * update a item by id
 *@param int item id
 */
  onItemUpdate = _id => {
    axios({
      url: '/api/v1/item/status/' + _id,
      method: 'put',
      data: {
        status: 1
      }
    }).then(({ data }) => {
      message.success('Achieve succeeded')
      this.onSearch('')
    })
  }
  render() {
    return (
      <>
        <div style={{ padding: '2% 20%' }}>
          {this.props.user._id && (
            <div className="add-btn" onClick={this.onAddClick}>
              <PlusOutlined />
            </div>
          )}

          <PageHeader
            className="site-page-header"
            title="We Sell Houses"
            subTitle="Welcome to the WeSellHouses."
          />

          <Search
            placeholder="Search for you house"
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
            <span>Category:&nbsp;</span>  <Checkbox value={0}>Houses</Checkbox>
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
            <span>Features:&nbsp;</span>   <Checkbox value={'under offer'}>under offer</Checkbox>
              <Checkbox value={'high priority'}>high priority</Checkbox>
              <Checkbox value={'Garden'}>Garden</Checkbox>
              <Checkbox value={'Swimming pool'}>Swimming pool</Checkbox>
              <Checkbox value={'Garage'}>Garage</Checkbox>
            </div>
          </Checkbox.Group>
        </div>
        {this.state.items.map(item => {
          return (
            <div className="item" key={item._id}>
              <div className="item-left">
                <img src={'http://localhost:3030' + item.imgUrl[0]} />
              </div>
              <div className="item-body">
                <div
                  className="item-title"
                  onClick={() =>
                    this.props.history.push(`/item?id=${item._id}`)
                  }
                >
                  {item.name}
                </div>
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
              <div className="item-price">
                <p>${item.price}</p>
                {/* {this.props.user._id === item.createUser._id ||
                this.props.user.role === 'admin' ? (
                  <Dropdown
                    overlay={
                      <Menu>
                        <Menu.Item
                          onClick={() =>
                            this.props.history.push(
                              `/create/item?id=${item._id}`
                            )
                          }
                        >
                          Update
                        </Menu.Item>
                        <Menu.Item
                          danger
                          onClick={() => this.onItemUpdate(item._id)}
                        >
                          Achieve
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
                ) : null} */}
              </div>
            </div>
          )
        })}
      </>
    )
  }
}
export default withRouter(
  connect(state => ({
    user: state.user
  }))(Itemlist)
)
