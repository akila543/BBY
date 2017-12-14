const React = require('react');
const ReactDOM = require('react-dom');
const {browserHistory, hashHistory, Route, Router} = require('react-router');
const Navbar = require('./components/Login/Navbar.jsx');
const Login = require('./components/Login/Login.jsx');
const MainComp = React.createClass({
  render: function() {
    return (
      <div>
                  <Navbar />
                  <br/>
                  <br/>

                  {this.props.children}
              </div>
    );
  }
});
ReactDOM.render(
  <Router history={hashHistory}>
  <Route component={MainComp}>
    <Route path="/" component={Login}/>
   </Route>
</Router>, document.getElementById('app'));
