import React from 'react';
// import h from '../../scripts/helpers.js';
// import styles from './AddDebtForm.css';

class AddDebtForm extends React.Component {
  createDebt(e) {
    e.preventDefault();
    const debt = {
      creditor: this.creditor.value,
      monthly: this.monthly.value,
      currentBalance: this.currentBalance.value
    };

    this.props.addDebt(debt);
    this.debtForm.reset();
  };

  render() {
    return (
      <div style={{ textAlign: 'right' }}>
        <h3>Add a debt</h3>
        <form onSubmit={(e) => this.createDebt(e) } ref={(input) => this.debtForm = input}>
          <input
            type='text'
            name='creditor'
            placeholder='Creditor'
            ref={(input) => this.creditor = input}
            onChange={(event) => {
              this.setState({ creditor: event.target.value })
            }}
          />
          <br/>
          <input
            type='text'
            name='monthly'
            placeholder='Monthly Payment'
            ref={(input) => this.monthly = input}
            onChange={(event) => {
              this.setState({ monthly: event.target.value })
            }}
          />
          <br/>
          <input
            type='text'
            name='currentBalance'
            placeholder='Current Balance'
            ref={(input) => this.currentBalance = input}
            onChange={(event) => {
              this.setState({ currentBalance: event.target.value })
            }}
          />
          <br/>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

export default AddDebtForm;
