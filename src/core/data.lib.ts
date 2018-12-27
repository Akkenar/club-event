// tslint:disable no-console

import { ApiResponse, Results } from './api.type';

export async function postData<T extends ApiResponse>(
  url: string,
  data: any
): Promise<T> {
  try {
    // Default options are marked with *
    const response = await fetch(url, {
      body: JSON.stringify(data),
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'no-cors', // no-cors, cors, *same-origin
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // no-referrer, *client
    });

    const text = await response.text();
    console.log(`Getting data from ${url}`, text || 'NO DATA');
    return JSON.parse(text);
  } catch (e) {
    console.error(`Error getting data from ${url}`, e);
    return Promise.reject({ result: Results.ERROR, message: e.message });
  }
}
