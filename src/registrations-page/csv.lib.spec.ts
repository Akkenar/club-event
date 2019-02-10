import mockRegistrations from '../../mocks/registrations.json';
jest.mock('file-saver', () => ({
  saveAs: jest.fn(),
}));
import { saveAs } from 'file-saver';
import { convertToCsv, exportToCsv } from './csv.lib';

describe('csv', () => {
  it('should convert all registrations to CSV', () => {
    const result = convertToCsv(mockRegistrations as any);

    // Because why not using snapshots to test string data!
    expect(result).toMatchSnapshot();
  });

  it('should handle empty registrations', () => {
    expect(convertToCsv([])).toBeNull();
    expect(convertToCsv(null as any)).toBeNull();
  });

  it('should download the data', () => {
    exportToCsv(mockRegistrations as any);
    expect(saveAs).toHaveBeenCalledWith(
      new Blob([mockRegistrations as any]),
      'inscriptions.csv',
    );
  });

  it('should handle empty data', () => {
    exportToCsv(null as any);
    expect(saveAs).not.toHaveBeenCalledTimes(1);
  });
});
