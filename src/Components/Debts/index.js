import React from 'react';
import base from '../../scripts/base';
import styles from './Debts.css';

// import allDebts from '../../scripts/debts';

import TableHeader from '../TableHeader';
import RowOfDebt from '../RowOfDebt';
// import AddDebtForm from '../AddDebtForm';

 import layout from '../../styles/Layout.css';
import table from '../../styles/Table.css';
import form from '../../styles/Form.css';

class Debts extends React.Component {
  constructor() {
    super();

    this.addDebt = this.addDebt.bind(this);
    // this.loadDebts = this.loadDebts.bind(this);
    this.renderEditRows = this.renderEditRows.bind(this);
    this.handleDebtUpdate = this.handleDebtUpdate.bind(this);
    this.updateDebt = this.updateDebt.bind(this);
    this.toggleView = this.toggleView.bind(this);

    this.state = {
      editMode: false,
      debts: {}
    }
  };

  componentWillMount() {
    this.ref = base.syncState(`${this.props.params.debtId}/debts`, {
      context: this,
      state: 'debts'
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addDebt(debt) {
    // make copy of current state
    const debts = {...this.state.debts};
    // add in new debt
    const timestamp = Date.now();
    debts[`debt-${timestamp}`] = debt;
    // set state
    this.setState({ debts });
  };

  // loadDebts() {
  //   this.setState({
  //     debts: allDebts
  //   })
  // };

  updateDebt(key, updatedDebt) {
    const debts = {...this.state.debts};
    debts[key] = updatedDebt;
    this.setState({ debts });
  }

  handleDebtUpdate(e, key) {
    const debt = this.state.debts[key];
    // take copy of this debt and update with new data
    const updatedDebt = {
      ...debt,
      [e.target.name]: e.target.value
    }

    this.updateDebt(key, updatedDebt);
  }

  renderEditRows(key) {
    const debt = this.state.debts[key];

    return (
      <div key={key} className={`${layout.flex} ${table.tableRow} ${table.scroller}`}>
        <div className={`${layout.flex} ${layout.flexChildHalf}`} >
          <div className={`${layout.flexChild} ${table.tableHeader} ${table.tableCell}`}>
            <input type='text' onChange={(e) => this.handleDebtUpdate(e, key)} name='creditor' className={form.input} value={debt.creditor} />
          </div>
        </div>
        <div className={`${layout.flex} ${layout.flexChildHalf}`} >
          <div className={`${layout.flexChild1of3} ${table.tableCell}`}>
            <input type='text' onChange={(e) => this.handleDebtUpdate(e, key)} name='monthly' className={form.input} value={debt.monthly} />
          </div>
          <div className={`${layout.flexChild1of3} ${table.tableCell}`}>
            <input type='text' onChange={(e) => this.handleDebtUpdate(e, key)} name='currentBalance' className={form.input} value={debt.currentBalance} />
          </div>
          <div className={`${layout.flexChild1of3} ${table.tableCell}`}>
            <input type='text' onChange={(e) => this.handleDebtUpdate(e, key)} name='previousBalance' className={form.input} value={debt.previousBalance} />
          </div>
        </div>
      </div>
    )
  }

  toggleView(e) {
    if (e.target.checked) {
      this.setState({
        editMode: true
      })
    } else {
      this.setState({
        editMode: false
      })
    }
  };

  render() {
    return (
      <div>
        <label className={form.checkbox}>
         <span>Edit Mode</span>
         <input onChange={(e) => this.toggleView(e)} type="checkbox" />
        </label>

        <div className={this.state.editMode ? styles.hidden : styles.visible}>
          <TableHeader column1='Creditor' column2='Payment' column3='Balance' column4='Delta' />
          <main>
            <div className={`${styles.wrapper} ${table.table} ${table.scroller}`}>
              {
                Object.keys(this.state.debts)
                  .map(key => <RowOfDebt details={this.state.debts[key]} key={key}/>)
              }
            </div>
          </main>
        </div>
        <aside className={this.state.editMode ? styles.visible : styles.hidden}>
          <TableHeader column1='Creditor' column2='Payment' column3='Current' column4='Previous' />
          <div className={table.scroller}>
            {
              Object.keys(this.state.debts).map(this.renderEditRows)
            }
            {/*<AddDebtForm addDebt={this.addDebt} loadDebts={this.loadDebts} />
            <button onClick={this.props.loadDebts}>Load All Debts</button>*/}
          </div>
        </aside>
      </div>
    )
  };
}

export default Debts;
