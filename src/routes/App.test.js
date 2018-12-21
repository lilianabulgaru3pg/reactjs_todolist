import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import RoutedFirewall from '../components/Firewall';

describe('App', () => {
  const wrapper = shallow(<App />);

  it('should render a <BrowserRouter />', () => {
    expect(wrapper.find('BrowserRouter')).toHaveLength(1);
  });

  it('should render correctly', () => expect(wrapper).toMatchSnapshot());

  it('should render the Firewall', () => {
    expect(wrapper.find(RoutedFirewall).exists()).toBe(true);
  });
});
