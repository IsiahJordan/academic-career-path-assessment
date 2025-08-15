import { Chart } from 'react-google-charts';
import { HistogramProps } from './types';
import { formatData, mean, standardDeviation } from './histogram.utils.ts';

function Histogram({
  title,
  xlabel,
  header,
  data
}: HistogramProps){ 
  const parse_data = formatData({header: header, data: data});
  const avg = mean(data);
  const stdDev = standardDeviation(data);

  const options = {
    title: title,
    subtitle: `Average Grade: ${avg} & Deviation: ${stdDev}`,
    hAxis: {
      minvalue: 50,
      maxvalue: 100
    },
    histogram: {
      bucketSize: 10
    } 
  };

  return (
    <div>
      <Chart
        chartType="Histogram"
        width="100%"
        height="100%"
        data={parse_data}
        options={options}/>
    </div> 
  );
}

export default Histogram;
