import React from 'react';
import { Menu } from 'antd';

function Nav(props) {
  return (
    <>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}
      style={{textAlign:"right"}}
      >
        <Menu.Item key="1">Home</Menu.Item>
        <Menu.Item key="2">Account</Menu.Item>
        <Menu.Item key="3">LogIn</Menu.Item>
        <Menu.Item key="4">LogOut</Menu.Item>        
      </Menu>
    </>
  );
}

export default Nav;