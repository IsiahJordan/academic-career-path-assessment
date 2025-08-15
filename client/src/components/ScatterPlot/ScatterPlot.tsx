import { Chart } from 'react-google-charts';
import { BarChartProps } from './types';
import { formatData } from './scatterPlot.utils.ts';

function ScatterPlot({
  title,
  data
}: ScatterPlotProps){ 
  const parse_data = formatData(data);
  const options = {
    title: title,
    curveType: "function",
    vAxis:{
      viewWindow: {
        min: 0,
        height: 100
      }
    }
  };

  return (
    <div>
      <Chart
        chartType="ScatterChart"
        width="100%"
        height="100%"
        data={parse_data}
        options={options}/>
    </div> 
  );
}

export default ScatterPlot;

