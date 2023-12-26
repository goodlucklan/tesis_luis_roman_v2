import * as XLSX from 'xlsx/xlsx.mjs';

export function excelToArray(workbook) {
  const result = [];
  workbook.SheetNames.forEach((sheetName) => {
    const sheet = workbook.Sheets[sheetName];
    const options = { dateNF: 'YYYY-MM-DDTHH:mm:ss.SSSZ' };
    result.push(XLSX.utils.sheet_to_json(sheet, { raw: false, dateNF: options }));
  });
  return result;
}
