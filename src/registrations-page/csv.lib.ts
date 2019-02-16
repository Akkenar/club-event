import { saveAs } from 'file-saver';
import { Registration } from '../register-page/register.type';

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
  email: 'E-mail',
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
  dinnerKid: 'Souper (enfant)',
  vegetarian: 'Souper',
  vegetarianKid: 'Souper (enfant)',
  picknick: 'Pique-nique',
  sleeping: 'Nuit PC',
  sleepingAtGym: 'Nuit Salle de Gym',
  camping: 'Nuit Camping',
};

function toString(value: any): string {
  if (typeof value === 'object') {
    // Counts the items rather than displaying the object as a string
    return Object.keys(value).length.toString();
  }

  return (value || '').toString();
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

  // Header
  const header =
    Object.keys(registrations[0])
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
    saveAs(new Blob([data]), 'inscriptions.csv');
  }
}
