import React from "react";
import { withRouter } from "react-router";
import { Carousel } from "antd";
import {
  Row,
  Col,
  Button,
  Modal,
  Form,
  Input,
  Layout,
  InputNumber,
} from "antd";
import { status, json } from "../utilities/requestHandlers";
/**
 * Component for every single porperty.
 * fetch from mongodb and put in to the state
 * @param props parent props 
 * @component
 */
class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: [],
      visible: false,
    };
  }

  componentDidMount() {
     /** available using withRouter()*/
    const id = this.props.match.params.id; 
    fetch(`http://localhost:3030/api/v1/items/${id}`)
      .then(status)
      .then(json)
      .then((item) => {
        this.setState({ item: item });
      })
      .catch((err) => {
        console.log(`Fetch error for post ${id}`);
      });
  }
/** make modal visible*/
  showModal = () => {
    this.setState({ visible: true });
  };

  handleOk = () => {
    this.setState({ visible: false });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };
   /** make the modal visible by on click the button*/
  onclick = () => {
    this.showModal();
  };

  onFinish = (values) => {
    console.log('Received values of form: ', values);
    /** ignore the 'confirm' value in data sent*/
    const { confirm, ...data } = values;  
    fetch('http://localhost:3030/api/v1/messages', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }        
    })
    .then(status)
    .then(json)
    .then(data => {
       
        console.log(data);
        alert("Message has been send")
    })
    .catch(err => {
       
        alert("Error adding user");
    });  
  };

  render() {
    const item = this.state.item;
    const contentStyle = {};
    const formItemLayout = {
        labelCol: { xs: { span: 24 }, sm: { span: 6 } },
        wrapperCol: { xs: { span: 24 }, sm: { span: 12 } }
      };
      const tailFormItemLayout = {
        wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 6 } },
      };
      
/** return a item page*/
    return (
      <>
        <Row>
          <Col span={16}>
            <div>
              <h3 style={{ textAlign: "center" }}>
                {" "}
                <img src={item.imageURL}></img>{" "}
              </h3>
            </div>
          </Col>
          <Col span={8}>  
            {" "}
            <div>
              <h1>{item.title}</h1>
              <p>{item.location}</p>
              <p>Guide Price: {item.price}</p>
              <Button size={"large"} onClick={this.showModal}>
                Contact Agent
              </Button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={14}>
            <p style={({ textAlign: "center" }, { marginTop: "30px" })}>
              {item.summary}
            </p>
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
        <Form {...formItemLayout} name="message" onFinish={this.onFinish} scrollToFirstError >
        <Form.Item name="name" label="name" hasFeedback rules={[{required:true, message: 'Please input your password!'}] } >
            <Input  placeholder="Please input your name"/>
        </Form.Item>
        <Form.Item name="email" label="E-mail" rules={[{type: 'email', message: 'The input is not valid E-mail!'},
    {required: true, message: 'Please input your E-mail!' }]}>
            <Input placeholder="Please input your name" />
        </Form.Item>
        <Form.Item name="tel" label="tel" rules={[{required:true}]} >
            <Input placeholder="Please input your telphone number"/>
        </Form.Item>
        <Form.Item name="itemId" label="itemId" rules={[{required:true}]} >
            <Input placeholder="Input porperty ID that you want to enquiry"/>
        </Form.Item>
        <Form.Item name="content" label="content" rules={[{required:true}]} >
         <Input.TextArea placeholder="Leave a meesage here."></Input.TextArea>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
                Send
            </Button>
        </Form.Item>
      </Form>
        </Modal>
      </>
    );
  }
}

export default withRouter(Item);
