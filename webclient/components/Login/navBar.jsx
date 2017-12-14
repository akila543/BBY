import React from 'react';

import {Menu, Input, Button, Icon } from 'semantic-ui-react';
class Navbar extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div style={{marginLeft:'20%',marginRight:'20%'}}>
      <Menu>
        <Menu.Item>
          <img src= './image/bestbuylogo.png' style={{}}/>
        </Menu.Item>
        <Menu.Item
          name='reviews'>
          Reviews
        </Menu.Item>
        <Menu.Item
          name='upcomingEvents'>
          Upcoming Events
        </Menu.Item>
      </Menu>
      <Menu secondary style={{backgroundColor:'#051B36',marginTop:'-1%'}}>
        <Menu.Item name='PRODUCT' style={{color:'white'}}/>
        <Menu.Item name='SOLUTION & SERVICES' style={{color:'white'}}/>
        <Menu.Menu position='right'>
          <Menu.Item>
            <Input icon='search' placeholder='Search...' />
          </Menu.Item>
          <Menu.Item style={{color:'#051B36'}}>
      <Button color='yellow'>
        <Icon name='shopping cart' />
        0 items
      </Button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </div>
    );
  }
}

module.exports = Navbar;
