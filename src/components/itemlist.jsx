import React from "react";
import { List, Avatar, Space } from "antd";
import {Link} from 'react-router-dom'

import {  MessageOutlined, LikeOutlined, StarOutlined  } from '@ant-design/icons'
//import LikeOutlined from '@ant-design/icons/LikeOutlined';




export default class Itemlist extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      items: []
    }
  }
  
componentDidMount(){
  fetch('http://localhost:3030/api/v1/items')
  .then(res =>{
    return res.json();
  })
  .then(data =>{
    this.setState({items:data})
    
  })
  .catch(err => console.log("error fetching articles"))
}

  render() {
 

    const IconText = ({ icon, text }) => (
      <Space>
        {React.createElement(icon)}
        {text}
      </Space>
    );
    return (
      
      <List
      style={{padding:"0 15%"}}
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 3,
        }}
        dataSource={this.state.items}

        renderItem={(item) => (
          <List.Item
            key={item.title}
            extra={
              <img
                width={272}
                alt="logo"
                src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=341754771,3770930808&fm=26&gp=0.jpg"
              />
            }
          >
            <List.Item.Meta
              
              title={<a href={item.href}> {item.property_name} </a>}

              description={item.description}
            />
            {item.content}
          </List.Item>
          
        )}
      />
    );
  }
}
