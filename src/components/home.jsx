import React from 'react';
import { PageHeader, Input } from 'antd';
import ItemGrid from './itemgrid';

const { Search } = Input;

function Home(props) {
  return (
    <>
      <div className="site-layout-content">
        <div style={{ padding: '2% 20%' }}>
          <Search placeholder="input search text"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={null}/>
          <PageHeader className="site-page-header"
            title="We Sell Houses"
            subTitle="Welcome to the WeSellHouses."/>
        </div>  
        <ItemGrid />
      </div>
    </>  
  );
}

export default Home;