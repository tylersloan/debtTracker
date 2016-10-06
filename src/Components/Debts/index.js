import React from 'react';
import base from '../../scripts/base';
// import fbConfig from '../../../config/firebase.config';
import styles from './Debts.css';

import allDebts from '../../scripts/debts';

import TableHeader from '../TableHeader';
import RowOfDebt from '../RowOfDebt';
import Toggler from '../Toggler';
import Logout from '../Logout';
import AddNewDebts from '../AddNewDebts';

import layout from '../../styles/Layout.css';
import table from '../../styles/Table.css';
import form from '../../styles/Form.css';

class Debts extends React.Component {
  constructor() {
    super();

    this.addDebt = this.addDebt.bind(this);
    this.loadDebts = this.loadDebts.bind(this);
    this.renderEditRows = this.renderEditRows.bind(this);
    this.handleDebtUpdate = this.handleDebtUpdate.bind(this);
    this.updateDebt = this.updateDebt.bind(this);
    this.toggleView = this.toggleView.bind(this);
    this.authHandler = this.authHandler.bind(this);
    this.logout = this.logout.bind(this);

    this.state = {
      uid: null,
      loggedIn: false,
      user: {},
      editMode: false,
      debts: {}
    }
  };

  componentWillMount() {
    this.ref = base.syncState(`/debts`, {
      context: this,
      state: 'debts'
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  componentDidMount() {
    base.onAuth((user) => {
      // console.log(user.uid);
      if (user) {
        this.authHandler(null, user);
      }
    })
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

  loadDebts() {
    this.setState({
      debts: allDebts
    })
  };

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

  authHandler(error, authData) {
    if (error) {
      console.error(error.code, error.message);
      document.body.style.background = "#EF5B5B";
      return;
    } else {
      // console.log(authData);
      // grab info about debt database
      const debtRef = base.database().ref(this.props.params.debtId)

      // query db once for data
      debtRef.once('value', (snapshot) => {
        const data = snapshot.val() || {};

        if (!data.owner) {
          debtRef.set({
            owner: authData.uid
          })
        }

        this.setState({
          uid: authData.uid,
          owner: data.owner || authData.uid
        })
      })
    }
  }

  authenticate(e) {
    e.preventDefault();

    base.authWithPassword({
      email: this.emailInput.value,
      password: this.passwordInput.value
    }, this.authHandler);
  }

  logout() {
    base.unauth();
    this.setState({
      uid: null
    })
  }

  renderLogin() {
    return (
      <div className={`${layout.flex} ${layout.centered}`}>
        <div className={layout.narrow}>
          <form className={form.form} onSubmit={(e) => this.authenticate(e)}>
            <input
              className={form.input}
              type='email'
              placeholder='email address'
              ref={(input) => { this.emailInput = input }}
            />
            <input
              className={form.input}
              type='password'
              placeholder='password'
              ref={(input) => { this.passwordInput = input }}
            />
            <button className={form.button} type='submit'>Log In</button>

            {/*<input className={form.input} type='text' defaultValue={fbConfig.databaseName} placeholder='Debt Name' ref={(input) => { this.debtInput = input }} />
            <button className={form.button} type='submit'>See Debts</button>*/}
          </form>
        </div>
      </div>
    )
  };

  render() {
    if (this.state.uid !== this.state.owner) {
      return <div>{this.renderLogin()}</div>;
    } else {
      let tableHeaderColumns = {}

      if (this.state.editMode) {
        tableHeaderColumns = {
          column1: 'Creditor',
          column2: 'Payment',
          column3: 'Balance',
          column4: 'Delta',
        }
      } else {
        tableHeaderColumns = {
          column1: 'Creditor',
          column2: 'Payment',
          column3: 'Current',
          column4: 'Previous',
        }
      }

      return (
        <div>
          <Logout logout={this.logout} />
          <Toggler toggleView={this.toggleView} />

          <main>
            <TableHeader {...tableHeaderColumns} />
          {/*
            <AllDebts  />
          */}
            <section className={this.state.editMode ? styles.hidden : styles.visible}>
              <div className={`${styles.wrapper} ${table.table} ${table.scroller}`}>
                {
                  Object.keys(this.state.debts)
                    .map(key => <RowOfDebt details={this.state.debts[key]} key={key}/>)
                }
              </div>
            </section>

            <section className={this.state.editMode ? styles.visible : styles.hidden}>
              <div className={table.scroller}>
                {
                  Object.keys(this.state.debts).map(this.renderEditRows)
                }
              </div>
            </section>
          </main>
        </div>
      )
    }
  };
}

Debts.contextTypes = {
  router: React.PropTypes.object
}

export default Debts;
