import apiCall from './apiCall';
import M from 'materialize-css';

const checkEmail = (email) => {
  if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
    M.toast({ html: 'Invalid email', classes: '#e64a19 deep-orange darken-2' });
    return false;
  }
  return true;
}

const postData = async (action, history) => {
  if (action.body.email && !checkEmail(action.body.email)) {
    return;
  }
  const data = await apiCall(action);
  if (data.error) {
    M.toast({ html: data.error, classes: '#e64a19 deep-orange darken-2' });
  }
  else {
    M.toast({ html: action.message || data.message, classes: '#388e3c green darken-2' });
    history.push(action.url);
  }
};

export default postData;