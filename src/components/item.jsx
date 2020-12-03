import React from 'react';
import { withRouter } from 'react-router';
import { Carousel } from 'antd';
import { Row, Col, Button, Modal, Form, Input, Layout, InputNumber } from 'antd';
import { status, json } from '../utilities/requestHandlers';

class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: [],
            visible: false,
        }
    }

    componentDidMount() {

        const id = this.props.match.params.id; // available using withRouter()
        fetch(`http://localhost:3030/api/v1/items/${id}`)
            .then(status)
            .then(json)
            .then(item => {
                this.setState({ item: item })
            })
            .catch(err => {
                console.log(`Fetch error for post ${id}`)
            });
    }

    showModal = () => {
        this.setState({ visible: true })
    };

    handleOk = () => {
        this.setState({ visible: false })

    };

    handleCancel = () => {
        this.setState({ visible: false })
    };
    onclick = () => {
        this.showModal()
    }

    render() {

        const item = this.state.item;
        const contentStyle = {

        };
        const formItemLayout = {
            labelCol: {
                span: 10
            },
            wrapperCol: {
                span: 14
            },
        };

        return (
            <>
                <Row>
                    <Col span={16}>

                        <div>
                            <h3 style={{ textAlign: 'center' }}> <img src={item.imageURL}></img>  </h3>
                        </div>
                    </Col>
                    <Col span={8}>            <div>
                        <h1>{item.title}</h1>
                        <p>{item.location}</p>
                        <p>Guide Price: {item.price}</p>
                        <Button size={"large"} onClick={this.showModal}>Contact Agent</Button>

                    </div></Col>
                </Row>
                <Row>
                    <Col span={14}>
                        <p style={{ textAlign: 'center' }, { marginTop: '30px' }}>{item.summary}</p>
                    </Col>
                    <Col span={10}>
                        <p>Features: {item.features}</p>
                        <p>Category: {item.category}</p>
                        <p>Under offer: {item.underoffer}</p>
                        <p>High Priority: {item.highp}</p>
                    </Col>
                </Row>

                <Modal
                    title="Leave a Message"
                    visible={this.state.visible}
                    onOk={this.handleOk}

                    onCancel={this.handleCancel}
                >
                    <Form {...formItemLayout} style={{ marginLeft: -40 }}>
                        <Form.Item
                            name={['user', 'name']}
                            label="Name"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name={['user', 'email']}
                            label="Email"
                            rules={[
                                {
                                    type: 'email',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name={['user', 'age']}
                            label="Age"
                            rules={[
                                {
                                    type: 'number',
                                    min: 0,
                                    max: 99,
                                },
                            ]}
                        >
                            <InputNumber />
                        </Form.Item>
                      
                       
                        <Form.Item name={['user', 'introduction']} label="Message">
                            <Input.TextArea />
                        </Form.Item>
                        <Form.Item >
                            <Button type="primary" htmlType="submit">
                                Submit
        </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </>

        )
    }

}

export default withRouter(Item);

