import React from 'react';
import Collapsible from 'react-collapsible';
import {Form , Dropdown,Header,Input, Radio,Checkbox} from 'semantic-ui-react';

class Register extends React.Component {

  constructor() {
    super();
    this.state={option: ''}
    this.handlechange=this.handlechange.bind(this);
  }
  handlechange( event,data )
    {
      var value=data.value;
      //  e.preventDefalt();
     this.setState({

       option: value
     });
     console.log(this.state.option);
    }
  render() {
        const options = [
      { key: 1, text: 'Alabama', value: 1 },
      { key: 2, text: 'Alaska', value: 2 },
      { key: 3, text: 'Chicago', value: 3 },
    ];
      const options1 = [
      { key: 1, text: 'Residential', value: 1 },
      { key: 2, text: 'Business', value: 2 },
      ];
      const options3 = [
      { key: 1, text: 'Accomodation and Food Services', value: 1 },
      { key: 2, text: 'Administrative support and waste management', value: 2 },
      { key: 3, text: 'Agriculture,Forestry,Fishing and Hunting', value: 3 },
      { key: 4, text: 'Construction', value: 4 },
      ];
      const options2 = [
      { key: 1, text: '1-5', value: 1 },
      { key: 2, text: '5-9', value: 2 },
      { key: 3, text: '10-19', value: 3 },
      { key: 4, text: '20-49', value: 4 },
      { key: 5, text: '50-99', value: 5 },
      { key: 6, text: '100-249', value: 6 },
      ];
return (
  <div style={{marginLeft:'20%',marginRight:'20%'}}>
  <div style={{marginTop:'2%',marginBottom:'4%'}}>
    <Collapsible className="Collapsible" trigger="Login Information">
      <div style={{marginTop:'3%'}}>
          <Form>
             <Form.Input label='Email' placeholder='joe@schmoe.com' />
             <Form.Input type='password' label='Password'/>
             <Form.Input type='Re-type password' label='Re-type Password'/>
          </Form>
    </div>
  </Collapsible>
</div>
<div>
    <Collapsible trigger="Your Address" style={{color:'#051B36'}}>
        <Form>
        <Form.Input label='First Name' />
        <Form.Input label='Last Name'  />
        <Form.Input label='Company Name' />
        <Form.Input label='Address Line'  />
        <Form.Input label='Address Line2'  />
        <Form.Input label='City' />

         </Form>
         <Header>State</Header>
         <Dropdown text='Select' fluid selection options={options}/>
         <Form>
         <Form.Input label='ZipCode' />
         </Form>
         <Header>Address Type</Header>
         <Dropdown text='Select' fluid selection options={options1}/>
         <Form>
          <label>Phone Number</label>
          <Form.Group inline>
          <Form.Field>
          <Input placeholder='(xxx)' />
          </Form.Field>
          <Form.Field>
          <Input placeholder='xxx' />
          </Form.Field>
          <Form.Field>
          <Input placeholder='xxxx' />
          </Form.Field>
          </Form.Group>
        </Form>
     </Collapsible>
</div>
<div style={{marginTop:'3%'}}>
    <Collapsible trigger="Account Details">
     <Radio
      label='Home'
      value='Radio1'
      checked= {this.state.option === 'Radio1'}
      onChange={this.handlechange.bind(this)}
      name='radioGroup'
      />
      <Radio
      label='Business'
      value='Radio2'
      checked= {this.state.option === 'Radio2'}
      onChange={this.handlechange.bind(this)}
      name='radioGroup'
      />
      <Radio
      label='Goverment'
      value='Radio3'
      checked= {this.state.option === 'Radio3'}
      onChange={this.handlechange.bind(this)}
      name='radioGroup'
      />
      <Radio
      label='Education'
      value='Radio4'
      checked= {this.state.option === 'Radio4'}
      onChange={this.handlechange.bind(this)}
      name='radioGroup'
      />
      <Radio
      label='HealthCare'
      value='Radio5'
      checked= {this.state.option === 'Radio5'}
      onChange={this.handlechange.bind(this)}
      name='radioGroup'
      />
<Header style={{margintop:'1%'}}>Number of Employees</Header>
<Dropdown text='Select' fluid selection options={options2}/>
<Header style={{margintop:'1%'}}>Industry</Header>
<Dropdown text='Select' fluid selection options={options3}/>
<Header style={{margintop:'1%'}}>Select Account flag</Header>
<Checkbox
  label=' Non-Profit Organization'
/>
<Checkbox
  label=' P.O. may come from a Purchasing Agent'
/>
<Header style={{margintop:'1%'}}>Select your category</Header>
<Checkbox
  label='PSF'
/>
<Checkbox
  label='EPRO'
/>
<Checkbox
  label='API/CATALOG'
/>
</Collapsible>
</div>

</div>

);
}
}

module.exports = Register;
