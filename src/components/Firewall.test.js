import React from 'react';
import { shallow } from 'enzyme';
import { Firewall } from './Firewall';
import { LOGIN, TASKS } from '../constants';
import { Firebase } from '../services/firebaseConfig';

jest.mock('../services/firebase');
jest.mock('../services/firebaseConfig', () => ({
  Firebase: { auth: jest.fn() }
}));

describe('Firewall', () => {
  it('redirects to Login page after auth state changes when no user found', done => {
    const historySpy = { push: jest.fn() };
    const onAuthStateChanged = callback => {
      callback();
      expect(historySpy.push).toHaveBeenCalledWith({
        pathname: LOGIN,
        state: {}
      });
      done();
    };
    require
      .requireMock('../services/firebaseConfig')
      .Firebase.auth.mockReturnValue({ onAuthStateChanged });
    shallow(<Firewall history={historySpy} />);
    Firebase.auth();
  });

  it('redirects to Tasks page after auth state changes after a successful login', done => {
    const historySpy = { replace: jest.fn() };
    const onAuthStateChanged = callback => {
      callback({ email: 'test', uid: '123' });
      expect(historySpy.replace).toHaveBeenCalledWith({
        pathname: TASKS,
        state: {}
      });
      done();
    };
    require
      .requireMock('../services/firebaseConfig')
      .Firebase.auth.mockReturnValue({ onAuthStateChanged });
    shallow(<Firewall history={historySpy} />);
    Firebase.auth();
  });
});
