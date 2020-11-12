import React from "react";
import { List, Avatar, Space } from "antd";


import {  MessageOutlined, LikeOutlined, StarOutlined  } from '@ant-design/icons'
//import LikeOutlined from '@ant-design/icons/LikeOutlined';




export default class Itemlist extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const listData = [];
    for (let i = 0; i < 23; i++) {
      listData.push({
        href: "https://ant.design",
        title: `Houses ${i}`,
        avatar:
          "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
        description:
          "What a beautify houses! Buy now!",
        content:
          "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
      });
    }

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
        dataSource={listData}

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
          
              title={<a href={item.href}>{item.title}</a>}
              description={item.description}
            />
            {item.content}
          </List.Item>
          
        )}
      />
    );
  }
}
