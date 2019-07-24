import React from 'react';
import { shallow } from 'enzyme';
import Tasks from './index';
import UserContent from './components/UserContent';
import AddNewTask from './components/AddNewTask';
import RoutedTasksList from './components/TasksList';
import Header from './components/Header';
import AddItem from './components/AddItem';

describe('Tasks', () => {
  const wrapper = shallow(<Tasks />);

  it('should render the UserContent', () => {
    expect(wrapper.containsMatchingElement(<UserContent />)).toEqual(true);
  });

  it('should render the TasksList', () => {
    expect(wrapper.containsMatchingElement(<RoutedTasksList />)).toEqual(true);
  });

  it('should render the AddNewTask', () => {
    expect(wrapper.containsMatchingElement(<AddNewTask />)).toEqual(true);
  });

  it('should render the AddItem', () => {
    expect(wrapper.containsMatchingElement(<AddItem />)).toEqual(true);
  });

  it('should render the Header', () => {
    expect(wrapper.containsMatchingElement(<Header />)).toEqual(true);
  });
});
