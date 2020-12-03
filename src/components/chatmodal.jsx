import React from "react";
import { Modal, Button } from "antd";

export default class Chatmodal extends React.Component {
  constructor(props) {
    super(props);
  }

  showModal = () => {
    setVisible(true);
  };

  handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };
  render() {
    return (
      <>
        <Button type="primary" onClick={showModal}>
          Open Modal with async logic
        </Button>

        <Modal
          title="Send A Message"
          visible={visible}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
          <Form>
            <Form.Item label={"头像"} {...formItemLayout}>
              {getFieldDecorator("avatar", {
                rules: [{ required: true, message: "请上传用户头像" }],
                getValueFromEvent: this._normFile, //将上传的结果作为表单项的值（用normalize报错了，所以用的这个属性）
              })(
                <Upload {...uploadProps} style={styles.avatarUploader}>
                  {avatar ? (
                    <img src={avatar} alt="avatar" style={styles.avatar} />
                  ) : (
                    <Icon
                      style={styles.icon}
                      type={uploading ? "loading" : "plus"}
                    />
                  )}
                </Upload>
              )}
            </Form.Item>
            <Form.Item label={"用户名"} {...formItemLayout}>
              {getFieldDecorator("username", {
                validateFirst: true,
                rules: [
                  { required: true, message: "用户名不能为空" },
                  { pattern: /^[^\s']+$/, message: "不能输入特殊字符" },
                  { min: 3, message: "用户名至少为3位" },
                ],
              })(<Input placeholder="请输入用户名" />)}
            </Form.Item>
            <Form.Item label={"出生年月日"} {...formItemLayout}>
              {getFieldDecorator("birth", {
                // rules: [{ required: true, message: '请选择出生年月日' }],
              })(<DatePicker />)}
            </Form.Item>
            <Form.Item label={"电话"} {...formItemLayout}>
              {getFieldDecorator("phone", {
                // rules: [{ required: true, message: '请输入电话号码' }, { pattern: /^[0-9]*$/, message: '请输入正确的电话号码' }],
              })(<Input placeholder="请输入电话号码" />)}
            </Form.Item>
            <Form.Item label={"所在地"} {...formItemLayout}>
              {getFieldDecorator("location", {
                validateFirst: true,
                // rules: [{ required: true, message: '请输入目前所在地' }],
              })(<Input placeholder="请输入目前所在地" />)}
            </Form.Item>
            <Form.Item label={"性别"} {...formItemLayout}>
              {getFieldDecorator("gender", {
                initialValue: "男",
                // rules: [{ required: true, message: '请选择性别' }],
              })(
                <RadioGroup>
                  <Radio value={"男"}>男</Radio>
                  <Radio value={"女"}>女</Radio>
                </RadioGroup>
              )}
            </Form.Item>
            <Form.Item>
              <Alert
                message={"注：此信息仅为项目模拟数据，无其他用途"}
                type="info"
              />
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  }
}
