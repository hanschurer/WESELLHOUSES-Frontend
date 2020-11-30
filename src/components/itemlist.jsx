import React from "react";
import { List, Avatar, Space } from "antd";
import {Link} from 'react-router-dom'

import {  MessageOutlined, MoneyCollectOutlined, StarOutlined  } from '@ant-design/icons'
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
            actions={[
              <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
              <IconText icon={MoneyCollectOutlined} text={item.price} key="list-vertical-like-o" />,
              <IconText icon={MessageOutlined} text="Chat Now" key="list-vertical-message" />,
            ]}
            extra={
              <img
                width={350}
                alt="logo"
                src={item.imageURL}
              />
            }
          >
            <List.Item.Meta
              
              title={<a href={item.href}> {item.title} </a>}

              description={item.location}
            />
            {item.summary}
          </List.Item>
          
        )}
      />
    );
  }
}
