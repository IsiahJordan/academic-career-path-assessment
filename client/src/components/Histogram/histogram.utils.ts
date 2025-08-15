import { HistogramInput } from './types'

export function formatData(data: HistogramInput): any[][]{
  /* To convert props data to valid input to google chart
   * ====
   *  + group headers
   *  + group rows
   * */
  const new_data: (number | string)[][] = [[data.header]];

  for (let row = 0; row < data.data.length; row++) {
    const newRow: (string | number)[] = [data.data[row]];
    new_data.push(newRow);
  }

  return new_data;
}

export function mean(values: number[]): number {
  return values.reduce((sum, v) => sum + v, 0) / values.length;
}

export function standardDeviation(values: number[]): number {
  const avg = mean(values);
  const variance = values.reduce((sum, v) => sum + Math.pow(v - avg, 2), 0) / values.length;
  return Math.sqrt(variance);
}
