import React from 'react';

import styles from './Toggler.css';

class Toggler extends React.Component {
  render() {
    return (
      <label className={styles.toggler}>
       <span className={styles.label}>Edit Mode</span>
       <input onChange={(e) => this.props.toggleView(e)} type="checkbox" />
       <span className={`${styles.switch} ${styles.switch}`}></span>
      </label>
    )
  }
}

export default Toggler;
