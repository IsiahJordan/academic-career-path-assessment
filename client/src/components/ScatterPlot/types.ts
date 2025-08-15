export type DataStruct = {
  header: string; 
  data: number[] | string[];
};

export type ScatterPlotProps = {
  title: string;
  data: DataStruct[];
};
