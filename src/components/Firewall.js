import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Firebase } from '../services/firebaseConfig';
import { FirebaseContext } from '../services/firebase';
import { TASKS, LOGIN } from '../constants';

export class Firewall extends Component {
  constructor(props) {
    super(props);
    this.state = { user: '', uid: '' };
  }

  componentDidMount() {
    this.unsubscribe = Firebase.auth().onAuthStateChanged(
      this.handleAuthStateChange
    );
  }

  componentWillUnmount() {
    if (this.unsubscribe) this.unsubscribe();
  }

  handleAuthStateChange = user => {
    console.log('user.email', user);
    const { history } = this.props;
    if (!user) {
      this.setState({ user: '', uid: '' });
      history.push({ pathname: LOGIN, state: {} });
    } else {
      this.setState({ user: user.email, uid: user.uid });
      history.replace({
        pathname: TASKS,
        state: {}
      });
    }
  };

  render() {
    const { uid, user } = this.state;
    return (
      <FirebaseContext.Provider value={this.state}>
        {uid && user && this.props.children}
      </FirebaseContext.Provider>
    );
  }
}

const FirewallWithRouter = withRouter(Firewall);

export default FirewallWithRouter;
