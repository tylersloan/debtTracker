import React from 'react';

import { BrowserRouter, Match, Miss } from 'react-router'

import SignIn from './Components/SignIn';
import AddDebtForm from './Components/AddDebtForm';
import EditDebts from './Components/EditDebts';
import Debts from './Components/Debts';
import NoMatch from './Components/NoMatch';

import layout from './styles/Layout.css';

class App extends React.Component {
  render() {
    return (
      // 2. render a `Router`, it will listen to the url changes
      //    and make the location available to other components
      //    automatically
      <BrowserRouter>
        <div className={layout.container}>
          {/*
          3. Link to some paths with `Link`
          <ul className={nav.list}>
            <li className={nav.item}><Link to='/debts/' activeClassName={nav.active}>Home</Link></li>
            <li className={nav.item}><Link to='/editdebts' activeClassName={nav.active}>Edit Debts</Link></li>
          </ul>
          */}

          {/* 4. Render some `<Match/>` components.
                 When the current location matches the `pattern`
                 then the `component` will render.
          */}
          <Match exactly pattern="/" component={SignIn} />
          <Match pattern="/debts/:debtId" component={Debts} />
          <Match pattern="/adddebt" component={AddDebtForm} />
          <Match pattern="/editdebts" component={EditDebts} />

          {/* If none of those match, then a sibling `Miss` will render. */}
          {<Miss component={NoMatch}/>}
        </div>
      </BrowserRouter>
    )
  }
};

export default App;
