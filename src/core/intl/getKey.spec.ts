import getKey from './getKey';
import { IntlKey } from './intl.type';

const messages: IntlKey = {
  foo: 'bar',
  withPlaceholder: 'Foo {bar} {goo} {bar} {notreplaced}',
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

  it('should replace placeholders', () => {
    const result = getKey('withPlaceholder', messages, {
      bar: '0',
      goo: ' this is a test {test} (test)',
    });

    expect(result).toEqual(
      'Foo 0  this is a test {test} (test) 0 {notreplaced}'
    );
  });
});
