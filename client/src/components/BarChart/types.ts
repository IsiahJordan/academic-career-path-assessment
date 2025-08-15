export type DataStruct = {
  header: string; 
  data: number[] | string[];
};

export type BarChartProps = {
  title: string;
  xlabel: string;
  ylabel: string;
  data: DataStruct[];
};
