// tslint:disable object-literal-sort-keys
import { Errors, Products, Registration } from '../register-page/register.type';

const LINE_DELIMITER = '\r\n';
const COL_DELIMITER = '\t';
const PRODUCT_OBJECT_KEY = 'products';

// With column title when exporting.
const personalData: { [key: string]: string } = {
  id: 'Identifiant technique',
  reference: 'Référence',
  date: 'Date',
  total: 'A payer',
  language: 'Langue',
  club: 'Club',
  email: 'Email',
  firstName: 'Prénom',
  lastName: 'Nom',
  locality: 'Localité',
  no: 'Numéro',
  npa: 'NPA',
  street: 'Address',
  products: 'Nombre de types de commande',
};

const productsToDisplay: { [key: string]: string } = {
  breakfast: 'Petit Déjeuner',
  dinner: 'Souper',
  vegetarian: 'Souper',
  picknick: 'Pick Nick',
  sleeping: 'Nuit PC',
  camping: 'Nuit Camping',
  itemSize1: 'T-Shirt 1',
  itemSize2: 'T-Shirt 2',
  itemSize3: 'T-Shirt 3',
  itemSize4: 'T-Shirt 4',
};

function addFilePrefix(data: string) {
  if (!data.match(/^data:text\/csv/i)) {
    return 'data:text/csv;charset=utf-8,' + data;
  }
  return data;
}

function downloadFile(data: string, filename: string) {
  if (!data) {
    return;
  }

  const encodedData = encodeURI(addFilePrefix(data));

  const link = document.createElement('a');
  link.setAttribute('href', encodedData);
  link.setAttribute('download', filename);
  link.click();
}

function toString(value: any): string {
  if (typeof value === 'string') {
    return value;
  }

  if (typeof value === 'number') {
    return value.toString();
  }

  if (typeof value === 'object') {
    // Counts the items rather than displaying the object as a string
    return Object.keys(value).length.toString();
  }

  return '';
}

function toCsvLine(lineData: any) {
  const personalDataCsv = Object.keys(lineData)
    .map(key => toString(lineData[key]))
    .join(COL_DELIMITER);

  // The products object is nested, and might not contain ALL the objects.
  const productsCsv = Object.keys(productsToDisplay)
    .map(key => toString(lineData[PRODUCT_OBJECT_KEY][key]))
    .join(COL_DELIMITER);

  return personalDataCsv + COL_DELIMITER + productsCsv;
}

export function convertToCsv(registrations: Registration[]): string | null {
  if (!registrations || !registrations.length) {
    return null;
  }

  // Body
  const firstLine = registrations[0];
  if (!firstLine) {
    return null;
  }

  // Header
  const header =
    Object.keys(firstLine)
      .map(key => personalData[key])
      .join(COL_DELIMITER) +
    COL_DELIMITER +
    Object.keys(productsToDisplay)
      .map(key => productsToDisplay[key])
      .join(COL_DELIMITER);

  // Body
  const body = registrations.map(toCsvLine).join(LINE_DELIMITER);

  return header + LINE_DELIMITER + body;
}

export function exportToCsv(registrations: Registration[]) {
  const data = convertToCsv(registrations);
  if (data) {
    downloadFile(data, 'inscriptions.csv');
  }
}
