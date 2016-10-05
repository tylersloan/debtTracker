import React from 'react';
import styles from './SignIn.css';

class SignIn extends React.Component {
  goToDebt(e) {
    e.preventDefault();
    this.context.router.transitionTo(`/debts/${this.debtInput.value}`)
  }

  render() {
    return (
      <div>
        <h3>Log in</h3>
        <form onSubmit={(e) => this.goToDebt(e)}>
          <input className={styles.input} type='text' defaultValue='debt-9c279' placeholder='Debt Name' ref={(input) => { this.debtInput = input }} />
          <button className={styles.button} type='submit'>See Debts</button>
        </form>
      </div>
    )
  }
}

SignIn.contextTypes = {
  router: React.PropTypes.object
}

export default SignIn;
