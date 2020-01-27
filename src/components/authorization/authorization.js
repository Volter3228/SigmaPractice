import React, {Component} from "react";
import "./authorization.css";

export default class AuthorizationPage extends Component {
  state = {
    email: '',
    password: '',
    loginErrors: ''
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }
  
  render() {  
    return (
      <div className = 'inner-container'>
        
        <div className = 'login-box'>

          <h1 className='title'>P</h1>
          <h3 className='subtitle'>Pustota</h3>
          
          <form>
            <input className='login-input' name='username' type='text' placeholder='Email' />
            <input className='login-input' name='password' type='password' placeholder='Password' />
            <input id ='rememberme' className="checkbox" type="checkbox" name='rememberme' />
            <label htmlFor = 'rememberme' className="checkbox-container">Remember me</label>
            <input type='submit' value='LOGIN' className='login-btn' />
            <a style={{float: 'left'}} href='#'>Register</a>
            <a style={{float: 'right'}} href="#">Forgot your password?</a>
          </form>

        </div>
      </div>      
    );
  }
}
