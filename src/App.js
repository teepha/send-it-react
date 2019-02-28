/* eslint-disable no-console */
import React from 'react';

export const doIncrement = prevState => ({
  counter: prevState.counter + 1,
});

export const doDecrement = prevState => ({
  counter: prevState.counter - 1,
});

export const doReset = () => ({
  counter: 0,
});

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      counter: 0,
    };

    this.onIncrement = this.onIncrement.bind(this);
    this.onDecrement = this.onDecrement.bind(this);
    this.onReset = this.onReset.bind(this);
  }

  onIncrement() {
    this.setState(doIncrement);
  }

  onDecrement() {
    this.setState(doDecrement);
  }

  onReset() {
    this.setState(doReset);
  }

  render() {
    const { counter } = this.state;

    return (
      <div>
        <h1>My Counter</h1>
        <Counter counter={counter} />

        <button type="button" onClick={this.onIncrement}>
          Increment
        </button>

        <button type="button" onClick={this.onDecrement}>
          Decrement
        </button>

        <button type="button" onClick={this.onReset}>
          Reset
        </button>
      </div>
    );
  }
}

export const Counter = ({ counter }) => <p>{counter}</p>;

export default App;
