import getKey from './getKey';
import { IntlKey } from './intl.type';

const messages: IntlKey = {
  foo: 'bar',
};

describe('getKey', () => {
  it('should get the key from a message', () => {
    expect(getKey('foo', messages)).toEqual('bar');
  });

  it('should default to the name of the key if the key does not exist', () => {
    expect(getKey('invalid', messages)).toEqual('invalid');
  });

  it('should default to the name of the key if messages are not there', () => {
    // @ts-ignore
    expect(getKey('invalid', undefined)).toEqual('invalid');
  });
});
