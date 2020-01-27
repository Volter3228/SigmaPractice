import React, {Component} from "react";
import "./registration.css";

export default class RegistrationPage extends Component {
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
        
        <div className = 'register-box'>

          <h1 className='title'>P</h1>
          <h3 className='subtitle'>Pustota</h3>
          
          <form>
            <input className='register-input' name='username' type='text' placeholder='Email' />
            <input className='register-input' name='password' type='password' placeholder='Password' />
            <input type='submit' value='REGISTER' className='register-btn' />
            <a style={{float: 'left'}} href='#'>Login</a>
          </form>

        </div>
      </div>      
    );
  }
}