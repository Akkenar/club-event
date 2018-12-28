import mockRegistrations from '../../mocks/registrations.json';
import { convertToCsv } from './csv.lib';

describe('csv', () => {
  it('should convert all registrations to CSV', () => {
    const result = convertToCsv(mockRegistrations as any);

    // Because why not using snapshots to test string data!
    expect(result).toMatchSnapshot();
  });
});
