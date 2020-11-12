import React from 'react';
import { PageHeader, Input,Checkbox } from 'antd';
import Itemlist from './itemlist';

const { Search } = Input;

function Home(props) {
  return (
    <>
      <div className="site-layout-content">
        <div style={{ padding: '2% 20%' }}>

        <PageHeader className="site-page-header"
            title="We Sell Houses"
            subTitle="Welcome to the WeSellHouses."/>

          <Search placeholder="input search text"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={null}/>
       
            <div style={{padding:"2% 0 2% 0"}}>
              <Checkbox>Houses</Checkbox>
              <Checkbox>Apartment</Checkbox>
              <Checkbox>Flat</Checkbox>
              </div>
              <div>
              <Checkbox>Garden</Checkbox>
              <Checkbox>Swimming pool</Checkbox>
              <Checkbox>Garage</Checkbox>
            </div>
        </div>  
        <Itemlist />
      </div>
    </>  
  );
}

export default Home;