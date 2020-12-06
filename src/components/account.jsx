import React from 'react'
import { Layout, Menu } from 'antd'
import { NotificationOutlined } from '@ant-design/icons'
import ItemTable from './itemTable'
import MsgTable from './msgTable'
import { LaptopOutlined } from '@ant-design/icons'
const { Content, Sider } = Layout
export default class Account extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.name,
      color: 'black',
      selectedKeys: ['schat']
    }
  }

  onChat = () => {
    console.log('1')
  }
  onItemClick = ({ item, key, keyPath, domEvent }) => {
    this.setState({
      selectedKeys: [key]
    })
  }
  render() {
    return (
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={['schat']}
            selectedKeys={this.state.selectedKeys}
            style={{ height: '100%', borderRight: 0 }}
            onClick={this.onItemClick}
          >
            <Menu.Item
              key="schat"
              icon={<NotificationOutlined />}
              onTitleClick={this.onChat}
            >
              Messages
            </Menu.Item>
            <Menu.Item key="items" icon={<LaptopOutlined />}>
              Items
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280
            }}
          >
            {this.state.selectedKeys[0] === 'schat' ? (
              <MsgTable></MsgTable>
            ) : (
              <ItemTable></ItemTable>
            )}
          </Content>
        </Layout>
      </Layout>
    )
  }
}
