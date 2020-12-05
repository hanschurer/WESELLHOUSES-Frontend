import React from 'react'
import { PlusOutlined } from '@ant-design/icons'
import axios from '../http'
import { PageHeader, Input, Checkbox, Tag } from 'antd'
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
      values: []
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
        name: value
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
  onAddClick = () => {
    this.props.history.push('/create/item')
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
            </div>
            <div>
              <Checkbox value={3}>Garden</Checkbox>
              <Checkbox value={4}>Swimming pool</Checkbox>
              <Checkbox value={5}>Garage</Checkbox>
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
              <div className="item-price">${item.price}</div>
            </div>
          )
        })}
      </>
    )
  }
}
export default withRouter(Itemlist)
