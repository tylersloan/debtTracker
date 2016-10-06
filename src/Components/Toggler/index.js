import React from 'react';

import styles from './Toggler.css';
import form from '../../styles/Form.css';

class Toggler extends React.Component {
  render() {
    return (
      <label className={`${form.checkbox} ${styles.toggler}`}>
       <span className={form.label}>Edit Mode</span>
       <input onChange={(e) => this.props.toggleView(e)} type="checkbox" />
       <span className={form.switch}></span>
      </label>
    )
  }
}

export default Toggler;
