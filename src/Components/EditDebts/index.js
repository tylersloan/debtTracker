import React from 'react';

import TableHeader from '../TableHeader';

import layout from '../../styles/Layout.css';
import table from '../../styles/Table.css';
import form from '../../styles/Form.css';

class EditDebts extends React.Component {
  renderEditRows(key) {
    const debt = this.props.debts[key];
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

  render() {
    console.log(this);

    return (
      <main>
        <TableHeader column1='Creditor' column2='Payment' column3='Current' column4='Previous' />
        <div className={table.scroller}>
          {
            // Object.keys(this.props.debts).map(this.renderEditRows)
          }
          {/*<AddDebtForm addDebt={this.addDebt} loadDebts={this.loadDebts} />
          <button onClick={this.props.loadDebts}>Load All Debts</button>*/}
        </div>
      </main>
    )
  }
}

EditDebts.contextTypes = {
  router: React.PropTypes.object
}

export default EditDebts
