import React from 'react'
import { Table, Tag, Space } from 'antd'

export default class itemTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: []
    }
  }

  componentDidMount() {
    fetch('http://localhost:3030/api/v1/items')
      .then(res => {
        return res.json()
      })
      .then(data => {
        this.setState({ items: data })
      })
      .catch(err => console.log('error fetching articles'))
  }

  render() {
    const data = [
      {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer']
      },
      {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser']
      },
      {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher']
      }
    ]
    const columns = [
      {
        title: 'ID',
        dataIndex: 'age',
        key: 'age'
      },
      {
        title: 'Property Title',
        dataIndex: 'name',
        key: 'name',
        render: text => <a>{text}</a>
      },

      {
        title: 'Location',
        dataIndex: 'address',
        key: 'address'
      },
      {
        title: 'Under Offer',
        dataIndex: 'address',
        key: 'address'
      },
      {
        title: 'Archived',
        dataIndex: 'address',
        key: 'address'
      },
      {
        title: 'High Priority',
        dataIndex: 'address',
        key: 'address'
      },
      {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',

        render: tags => (
          <>
            {tags.map(tag => {
              let color = tag.length > 5 ? 'geekblue' : 'green'
              if (tag === 'loser') {
                color = 'volcano'
              }
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              )
            })}
          </>
        )
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <Space size="middle">
            <a>Modify</a>
          </Space>
        )
      }
    ]

    return <Table columns={columns} dataSource={data} />
  }
}
