// tslint:disable no-console
import { Registration } from './register.type';

function postData(url = '', data: Registration) {
  // Default options are marked with *
  return fetch(url, {
    body: JSON.stringify(data), // body data type must match "Content-Type" header
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'no-cors', // no-cors, cors, *same-origin
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // no-referrer, *client
  })
    .then(response => response.text())
    .then(text => {
      console.log(`Getting data from ${url}`, text);
      return JSON.parse(text);
    });
}

export function sendData(data: Registration) {
  return postData('/api/register.php', data);
}
