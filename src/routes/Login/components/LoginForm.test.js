import React from 'react';
import { shallow } from 'enzyme';
import LoginForm from './LoginForm';

jest.mock('../../../services/firebase');
require('../../../services/firebase');

describe('LoginForm', () => {
  it('should render a <form />', () => {
    const wrapper = shallow(<LoginForm />);
    expect(wrapper.find('form')).toExist();
  });

  it('should render a <input />', () => {
    const wrapper = shallow(<LoginForm />);
    expect(wrapper.find('input')).toHaveLength(2);
  });

  it('should have initial state', () => {
    const wrapper = shallow(<LoginForm />);
    expect(wrapper).toHaveState({
      username: '',
      password: '',
      errorMessage: '',
      isValid: false
    });
  });

  it('disables Login button on bad input', () => {
    const wrapper = shallow(<LoginForm />);
    wrapper.setState({
      username: 'a@a.a',
      password: 'Test@123',
      errorMessage: '',
      isValid: true
    });
    const event = {
      target: {
        name: 'username',
        value: 'a@a.a',
        form: {
          checkValidity: () => false
        }
      }
    };
    wrapper
      .find('input')
      .first()
      .simulate('change', event);
    expect(wrapper.find('button')).toBeDisabled();
  });

  it('displays error message on bad login', () => {
    const wrapper = shallow(<LoginForm />);
    const errorMessage = new Error('error');

    const submitEvent = {
      preventDefault: () => true
    };

    wrapper
      .find('form')
      .first()
      .simulate('submit', submitEvent);
    expect(wrapper).toHaveState(errorMessage);
  });
});
