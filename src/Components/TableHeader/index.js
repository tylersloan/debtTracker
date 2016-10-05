import React from 'react';
import styles from './TableHeader.css';
import layout from '../../styles/Layout.css';
import table from '../../styles/Table.css';

const TableHeader = (props) => {
  return (
    <header className={styles.header}>
      <div className={`${layout.flex} ${table.table} `}>
        <div className={layout.flexChildHalf}>
          <div className={`${table.tableCell} ${styles.creditor}`}>
            <p className={styles.cell}>{props.column1}</p>
          </div>
        </div>
        <div className={`${layout.flex} ${layout.flexChildHalf}`} >
          <div className={`${layout.flexChild1of3} ${table.tableCell}`}>
            <p className={styles.cell}>{props.column2}</p>
          </div>
          <div className={`${layout.flexChild1of3} ${table.tableCell}`}>
            <p className={styles.cell}>{props.column3}</p>
          </div>
          <div className={`${layout.flexChild1of3} ${table.tableCell} ${styles.delta}`}>
            <p className={styles.cell}>{props.column4}</p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default TableHeader;
