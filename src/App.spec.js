/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import App, {
  doIncrement, doDecrement, doReset, Counter,
} from './App';

configure({ adapter: new Adapter() });

describe('Local State', () => {
  it('should increment the counter in state', () => {
    const state = { counter: 0 };
    const newState = doIncrement(state);

    expect(newState.counter).to.equal(1);
  });

  it('should decrement the counter in state', () => {
    const state = { counter: 0 };
    const newState = doDecrement(state);

    expect(newState.counter).to.equal(-1);
  });

  it('should reset the counter in state', () => {
    const state = { counter: 0 };
    const newState = doReset(state);

    expect(newState.counter).to.equal(0);
  });
});

describe('App Component', () => {
  it('renders the Counter wrapper', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Counter)).to.have.length(1);
  });

  it('passes all props to Counter wrapper', () => {
    const wrapper = shallow(<App />);
    let counterWrapper = wrapper.find(Counter);
    expect(counterWrapper.props().counter).to.equal(0);
    wrapper.setState({ counter: -1 });
    counterWrapper = wrapper.find(Counter);
    expect(counterWrapper.props().counter).to.equal(-1);
  });

  it('increments the counter', () => {
    const wrapper = shallow(<App />);
    wrapper.setState({ counter: 0 });
    wrapper.find('button').at(0).simulate('click');
    expect(wrapper.state().counter).to.equal(1);
  });

  it('decrements the counter', () => {
    const wrapper = shallow(<App />);
    wrapper.setState({ counter: 0 });
    wrapper.find('button').at(1).simulate('click');
    expect(wrapper.state().counter).to.equal(-1);
  });

  it('resets the counter', () => {
    const wrapper = shallow(<App />);
    wrapper.setState({ counter: 1 });
    wrapper.find('button').at(2).simulate('click');
    expect(wrapper.state().counter).to.equal(0);
  });
});

// describe('App Component Asynchronous', () => {
//   it('calls componentDidMount', () => {
//     sinon.spy(App.prototype, 'componentDidMount');
//     const wrapper = mount(<App />);
//     expect(App.prototype.componentDidMount.calledOnce).to.equal(true);
//   });
// });
