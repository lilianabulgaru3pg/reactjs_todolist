import React from 'react';
import LoginForm from './components/LoginForm';

const LoginPage = () => (
  <React.Fragment>
    <main className="flex-item-1 center-content">
      <LoginForm />
    </main>
    <aside className="flex-item-2 center-content right-card-1 blue-bg">
      <h3 className="card-label">To-do List</h3>
    </aside>
  </React.Fragment>
);
export default LoginPage;
