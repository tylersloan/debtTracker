import React from 'react';

import styles from './Logout.css';

class Logout extends React.Component {
  render() {
    return <button className={styles.logout} onClick={this.props.logout}>Logout</button>
  }
}

export default Logout;
