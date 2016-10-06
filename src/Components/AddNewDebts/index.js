import React from 'react';

import AddDebtForm from '../AddDebtForm';

class AddNewDebts extends React.Component {
  render() {
    return (
      <div>
        <AddDebtForm addDebt={this.props.addDebt} />
        <button onClick={this.props.loadDebts}>Load All Debts</button>
      </div>
    )
  }
}

export default AddNewDebts;
