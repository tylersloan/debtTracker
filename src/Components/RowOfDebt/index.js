import React from 'react';
import h from '../../scripts/helpers';
import layout from '../../styles/Layout.css';
import table from '../../styles/Table.css';
import styles from './RowOfDebt.css';

class RowOfDebt extends React.Component {
  render() {
    const { details } = this.props;
    const { previousBalance, currentBalance } = details;
    // const delta = (1 - (currentBalance/previousBalance))*100;
    const delta = (currentBalance/previousBalance);

    let deltaStyles, deltaHTML;

    if (delta > 1) {
      deltaStyles = {
        'color': 'green'
      }

      deltaHTML = `⬆ ${((delta*100) - 100).toFixed(2)}%`;
    } else {
      deltaStyles = {
        'color': 'red'
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
      <div className={`${rowClass} ${table.scrollerChild}`}>
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
            {/*<p className="js-delta">{delta.toFixed(2)}%</p>*/}
            <p style={deltaStyles}>{deltaHTML}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default RowOfDebt;
