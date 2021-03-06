import React from 'react';
import h from '../../scripts/helpers';
import layout from '../../styles/Layout.css';
import table from '../../styles/Table.css';
import styles from './RowOfDebt.css';

class RowOfDebt extends React.Component {
  render() {
    const { details } = this.props;
    const { previousBalance, currentBalance } = details;
    const delta = (currentBalance/previousBalance);

    let deltaStyles, deltaHTML;

    if (delta > 1) {
      deltaStyles = {
        'color': '#02BD88'
      }

      deltaHTML = `⬆ ${((delta*100) - 100).toFixed(2)}%`;
    } else {
      deltaStyles = {
        'color': '#EF5B5B'
      }

      deltaHTML = `⬇ ${((delta*100) - 100).toFixed(2)}%`;
    }

    let rowClass = '';

    if (details.currentBalance <= 0) {
      rowClass = `${layout.flex} ${table.tableRow} ${styles.paidOff}`
    } else {
      rowClass = `${layout.flex} ${table.tableRow}`
    }

    return (
      <div className={`${this.props.addClass} ${rowClass} ${table.scrollerChild}`}>
        <div className={`${layout.flex} ${layout.flexChildHalf}`} >
          <div className={`${layout.flexChild} ${table.tableHeader} ${table.tableCell}`}>
            <p>{details.creditor}</p>
          </div>
        </div>
        <div className={`${layout.flex} ${layout.flexChildHalf}`} >
          <div className={`${layout.flexChild1of3} ${table.tableCell}`}>
            <p>
              <span>{h.formatPrice(details.monthly)}</span>
            </p>
          </div>
          <div className={`${layout.flexChild1of3} ${table.tableCell}`}>
            <p>
              <span>{h.formatPrice(details.currentBalance)}</span>
            </p>
          </div>
          <div className={`${layout.flexChild1of3} ${table.tableCell}`}>
            <p style={deltaStyles}>{deltaHTML}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default RowOfDebt;
