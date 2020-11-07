import React from "react";

import { List, Space } from "antd";
import { MessageOutlined, LikeOutlined, StarOutlined } from "@ant-design/icons";

export default class Listitem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const listData = [];
    for (let i = 0; i < 23; i++) {
      listData.push({
        href: "https://ant.design",
        title: `We sell houses part ${i}`,
        description:
          "Ant Design, a design language for background applications, is refined by Ant UED Team.",
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
      <div>
<List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 6,
        }}
        dataSource={listData}
        footer={
          <div>
            <b>ant design</b> footer part
          </div>
        }
        renderItem={(item) => (
          <List.Item
            key={item.title}
            actions={[
              <IconText
                icon={StarOutlined}
                text="156"
                key="list-vertical-star-o"
              />,
              <IconText
                icon={LikeOutlined}
                text="156"
                key="list-vertical-like-o"
              />,
            ]}
            extra={
              <img
                width={272}
                alt="logo"
                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
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

      </div>
      
    );
  }
}
