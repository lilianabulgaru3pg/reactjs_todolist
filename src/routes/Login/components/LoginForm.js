import React, { Component } from 'react';
import { signInWithEmailAndPassword } from '../../../services/firebase';

export default class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    errorMessage: '',
    isValid: false
  };

  handleLogin = event => {
    event.preventDefault();
    const auth = signInWithEmailAndPassword(
      this.state.username,
      this.state.password
    );
    auth.catch(err => {
      this.setState({ errorMessage: err.message });
    });
  };

  onInputChange = event => {
    console.log(event.target);
    this.setState({
      [event.target.name]: event.target.value,
      isValid: event.target.form.checkValidity()
    });
  };

  render() {
    const { username, password, errorMessage, isValid } = this.state;

    return (
      <form onSubmit={this.handleLogin} className="left-card-1">
        <h3>Login</h3>
        <input
          name="username"
          value={username}
          onChange={this.onInputChange}
          // pattern="/S+@S+.S+/"
          type="email"
          className="input-border-blue input-username"
          required
        />
        <br />
        <input
          name="password"
          value={password}
          onChange={this.onInputChange}
          // pattern=".{4,}"
          minLength="4"
          type="password"
          className="input-border-blue input-password"
          required
        />
        <br />
        <button type="submit" disabled={!isValid} value="Login">
          Login
        </button>
        <p className="message-error"> {errorMessage}</p>
      </form>
    );
  }
}
