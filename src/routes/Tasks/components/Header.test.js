import React from 'react';
import { shallow } from 'enzyme';
import Header from './Header';
import SearchItem from './SearchItem';

describe('Header', () => {
  const wrapper = shallow(<Header />);

  it('should render the SearchItem', () => {
    expect(wrapper.containsMatchingElement(<SearchItem />)).toEqual(true);
  });
});
