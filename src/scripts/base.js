import Rebase from 're-base';
import fbConfig from '../../config/firebase.config';

const base = Rebase.createClass({
  apiKey: fbConfig.apiKey,
  authDomain: fbConfig.authDomain,
  databaseURL: fbConfig.databaseURL,
});

export default base;
