import React from "react";
import { List, Space, Modal } from "antd";
import {Link} from 'react-router-dom'
import {  MessageOutlined, MoneyCollectOutlined, StarOutlined  } from '@ant-design/icons'

//import LikeOutlined from '@ant-design/icons/LikeOutlined';




export default class Itemlist extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      items: [],
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
      <>
      
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
              <IconText icon={MoneyCollectOutlined} text={item.price} key="list-vertical-like-o" />,
              
            ]}
            extra={
              <img
                width={350}
                alt="logo"
                src={item.imageURL}
              />
            }
          >
            
            <Link to={`items/${item.ID}`}>
            <List.Item.Meta
              title={<a href={item.href}> {item.title} </a>}
              description={item.location}
            />
            <p style={{color:'black'}}>
            {item.summary}
            </p>
            
            </Link>
          </List.Item>
        
        )}
      />
      <Modal
        title="Title"
        visible={this.state.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <p>{this.modalText}</p>
        <p>{this.modalText}</p>
        <p>{this.modalText}</p>
        
      </Modal>
      </>
    );
  }
}
