import React from 'react'
import { Layout, Menu } from 'antd'
import { NotificationOutlined } from '@ant-design/icons'
import ItemTable from './itemTable'
const { Content, Sider } = Layout

export default class Account extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.name,
      color: 'black'
    }
  }

  onChat = () => {
    console.log('1')
  }

  render() {
    return (
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={['schat']}
            style={{ height: '100%', borderRight: 0 }}
          >
            <Menu.Item
              key="schat"
              icon={<NotificationOutlined />}
              onTitleClick={this.onChat}
            >
              Messages
            </Menu.Item>
            {/* <Menu.Item key="items" icon={<LaptopOutlined />}>
              Items
            </Menu.Item> */}
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
            <ItemTable></ItemTable>
          </Content>
        </Layout>
      </Layout>
    )
  }
}
