import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import RoutedFirewall from '../components/Firewall';
import { LOGIN } from '../constants';
import LoginPage from './Login/index';
import Tasks from './Tasks/index';

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <RoutedFirewall>
        <Tasks />
      </RoutedFirewall>
      <Route exact path={LOGIN} component={LoginPage} />
    </Suspense>
  </Router>
);

export default App;
