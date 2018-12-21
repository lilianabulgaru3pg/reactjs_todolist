import React from 'react';
import { shallow } from 'enzyme';
import LoginPage from './index';

describe('LoginPage', () => {
  const wrapper = shallow(<LoginPage />);

  it('should render a <LoginForm />', () => {
    expect(wrapper.find('LoginForm')).toHaveLength(1);
  });

  it('LoginPage should render correctly', () =>
    expect(wrapper).toMatchSnapshot());
});
