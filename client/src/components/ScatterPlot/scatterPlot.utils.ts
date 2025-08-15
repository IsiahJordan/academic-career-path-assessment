import { DataStruct } from './types'

export function formatData(data: DataStruct[]): any[][]{
  /* To convert props data to valid input to google chart
   * ====
   *  + group headers
   *  + group rows
   * */
  const headers = data.map(d => d.header);
  const new_data: (string | number)[][] = [headers];

  // Grab longest data list
  let long_len = 0;
  for (let i = 0; i < data.length; i++) {
    long_len = Math.max(long_len, data[i].data.length);
  }

  for (let row = 0; row < long_len; row++) {
    const newRow: (string | number)[] = [];
    for (let col = 0; col < data.length; col++) {
      const colData = data[col].data;
      if (row < colData.length) {
        newRow.push(colData[row]);
      } else {
        // Fallback if missing
        newRow.push(typeof colData[0] === "string" ? "" : 0);
      }
    }
    new_data.push(newRow);
  }

  return new_data
;}
