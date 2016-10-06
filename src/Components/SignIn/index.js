import React from 'react';
import fbConfig from '../../../config/firebase.config';
import styles from './SignIn.css';

class SignIn extends React.Component {
  constructor() {
    super();
    this.state = {
      uid: null
    }
  }

  goToDebt(e) {
    e.preventDefault();
    this.context.router.transitionTo(`/debts/${this.debtInput.value}`)
  }

  renderLogin() {
    return (
      <div>
        <h3>Log in</h3>
        <form onSubmit={(e) => this.goToDebt(e)}>
          <input className={styles.input} type='text' defaultValue={fbConfig.databaseName} placeholder='Debt Name' ref={(input) => { this.debtInput = input }} />
          <button className={styles.button} type='submit'>See Debts</button>
        </form>
      </div>
    )
  };

  render() {
    console.log(this.state.uid);

    if (this.state.uid) {
      return <div>{this.goToDebt()}</div>;
    } else {
      return <div>{this.renderLogin()}</div>;
    }
  }
}

SignIn.contextTypes = {
  router: React.PropTypes.object
}

export default SignIn;
