import mockRegistrations from '../../mocks/registrations.json';
import { convertToCsv, exportToCsv } from './csv.lib';

describe('csv', () => {
  it('should convert all registrations to CSV', () => {
    const result = convertToCsv(mockRegistrations as any);

    // Because why not using snapshots to test string data!
    expect(result).toMatchSnapshot();
  });

  it('should download the data', () => {
    const createElementSpy = jest.spyOn(document, 'createElement');
    exportToCsv(mockRegistrations as any);
    expect(createElementSpy).toHaveBeenCalledWith('a');
  });
});
