import { getData, postData } from './data.lib';

const URL = '/test';

function mockFetch() {
  window.fetch = jest.fn(() =>
    Promise.resolve({
      text: () =>
        new Promise(resolve => {
          const mockResult = JSON.stringify({});
          setTimeout(() => {
            resolve(mockResult);
          }, 50);
        }),
    })
  );
}

function mockFetchWithError() {
  window.fetch = jest.fn(() => Promise.reject({ message: 'boom' }));
}

describe('data.lib', () => {
  beforeEach(() => {
    delete window.fetch;
  });

  it('should post data', done => {
    mockFetch();
    postData(URL, { foo: 'bar' }).then(() => {
      expect(window.fetch).toHaveBeenCalledWith(URL, {
        body: '{"foo":"bar"}',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        method: 'POST',
        mode: 'no-cors',
        redirect: 'follow',
        referrer: 'no-referrer',
      });
      done();
    });
  });

  it('should handle error whilst posting data', done => {
    mockFetchWithError();
    postData(URL, {}).catch(e => {
      expect(e).toEqual({ message: 'boom', result: 'error' });
      done();
    });
  });

  it('should get data', done => {
    mockFetch();
    getData(URL).then(() => {
      expect(window.fetch).toHaveBeenCalledWith(URL, {
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: { accept: 'application/json' },
        method: 'GET',
        mode: 'no-cors',
        redirect: 'follow',
        referrer: 'no-referrer',
      });
      done();
    });
  });

  it('should handle error whilst getting data', done => {
    mockFetchWithError();
    getData(URL).catch(e => {
      expect(e).toEqual({ message: 'boom', result: 'error' });
      done();
    });
  });
});
