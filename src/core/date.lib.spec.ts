import { mockGlobalProperty } from '../test-utils/test-utils.lib';
import { formatDate } from './date.lib';

const TEST_DATE = '2018-12-28 14:29:48';

describe('date.lib', () => {
  it('should format the date', () => {
    expect(formatDate(TEST_DATE)).toEqual('12/28/2018, 14:29:48');
  });

  it('should handle empty dates', () => {
    expect(formatDate(undefined)).toEqual('');
  });

  it('should handle missing Intl', () => {
    mockGlobalProperty(window)('Intl')(undefined);
    expect(formatDate(TEST_DATE)).toEqual(TEST_DATE);
  });

  it('should handle invalid dates', () => {
    expect(formatDate('rubbish')).toEqual('rubbish');
  });
});
