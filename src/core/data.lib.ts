/* eslint-disable no-console */

import { ApiResponse, Results } from './api.type';

export async function postData<T extends ApiResponse>(
  url: string,
  data: any
): Promise<T> {
  try {
    // Default options are marked with *
    const response = await window.fetch(url, {
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
    return JSON.parse(text);
  } catch (e) {
    console.error(`[API POST] Error posting data to ${url}`, e);
    return Promise.reject({ result: Results.ERROR, message: e.message });
  }
}

export async function getData<T>(url: string): Promise<T> {
  try {
    const response = await window.fetch(url, {
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        accept: 'application/json',
      },
      method: 'GET',
      mode: 'no-cors', // no-cors, cors, *same-origin
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // no-referrer, *client
    });

    const text = await response.text();
    return JSON.parse(text);
  } catch (e) {
    console.error(`[API GET] Error getting data from ${url}`, e);
    return Promise.reject({ result: Results.ERROR, message: e.message });
  }
}
