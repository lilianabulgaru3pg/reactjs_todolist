import React from 'react';
import { shallow } from 'enzyme';
import RoutedTasksList from './TasksList';

describe('TastList', () => {
  it('should have initial state', () => {
    const wrapper = shallow(<RoutedTasksList />);
    expect(wrapper).toHaveState({ tasks: [], firstTaskID: '' });
  });
});
