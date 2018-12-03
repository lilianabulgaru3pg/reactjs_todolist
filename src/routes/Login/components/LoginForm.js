import React, { Component } from "react";
import InputField from "../../../components/InputField";
import { signInWithEmailAndPassword } from "../../firebaseConfig";
import { Redirect } from "react-router-dom";

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errorMessage: "",
      isValid: false,
      redirectToReferrer: false
    };
  }

  handleLogin = event => {
    event.preventDefault();
    const auth = signInWithEmailAndPassword(
      this.state.username,
      this.state.password
    );
    auth
      .then(() => this.setState({ redirectToReferrer: true }))
      .catch(err => {
        this.setState({ errorMessage: err.message });
        console.log(err);
      });
  };

  onInputChange = event => {
    console.log(event.target);
    this.setState({
      [event.target.name]: event.target.value,
      isValid: event.target.form.checkValidity()
    });
    console.log(event.target.form.checkValidity());
  };

  render() {
    const {
      username,
      password,
      errorMessage,
      isValid,
      redirectToReferrer
    } = this.state;

    let { from } = { from: { pathname: "/tasks" } };
    if (redirectToReferrer) return <Redirect to={from} />;

    return (
      <form onSubmit={this.handleLogin} className="left-card-1">
        <h3>Login</h3>
        <InputField
          name="username"
          value={username}
          onChange={this.onInputChange}
          // pattern="/S+@S+.S+/"
          type="email"
          className="input-border-blue"
        />
        <br />
        <InputField
          name="password"
          value={password}
          onChange={this.onInputChange}
          // pattern=".{4,}"
          minLength="4"
          type="password"
          className="input-border-blue"
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
