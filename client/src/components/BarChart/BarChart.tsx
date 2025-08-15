import { Chart } from 'react-google-charts';
import { BarChartProps } from './types';
import { formatData } from './barChart.utils.ts';

function BarChart({
  title,
  xlabel,
  ylabel,
  data
}: BarChartProps){ 
  const parse_data = formatData(data);
  const options = {
    title: title,
    hAxis: {title: xlabel},
    vAxis: {title: ylabel},
  };

  return (
    <div>
      <Chart
        chartType="ColumnChart"
        width="100%"
        height="100%"
        data={parse_data}
        options={options}/>
    </div> 
  );
}

export default BarChart;
