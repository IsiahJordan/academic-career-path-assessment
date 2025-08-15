import BarChart from '@/components/BarChart'
import Histogram from '@/components/Histogram'
import ScatterPlot from '@/components/ScatterPlot'
import SuggestionTable from '@/components/SuggestTable'
import GradeSide from '@/components/GradeSide'

function PerformancePage(){
  const barProps = {
    title: "Monthly Sales and Expenses",
    xlabel: "Month",
    ylabel: "Amount (USD)",
    data: [
      {
        header: "Month",
        data: ["Jan", "Feb", "Mar", "Apr", "May"]
      },
      {
        header: "Sales",
        data: [1000, 1170, 660, 1030, 1200]
      },
      {
        header: "Expenses",
        data: [400, 460, 1120, 540, 600]
      }
    ]
  };

  const scatterProps = {
    title: "Class Standing by Avg Grade",
    data: [
      {
        header: "Students",
        data: ["ugly", "stupid"]
      },
      {
        header: "Grades",
        data: [75.5, 100]
      }
    ]
  };

  const histoProps = {
    title: "Subject Grade",
    xlabel: "Score",
    header: "score",
    data: [80, 50, 70, 70, 40]
  };

  const sidePage = {
    classes: ["Test", "test"],
    options: ["test", "tt", "ttt"]
  };

  const suggestProps = [
    { course: "Civil Engineering", matchPercent: 88, percentile: 85 },
    { course: "Information Technology", matchPercent: 92, percentile: 95 },
    { course: "Mechanical Engineering", matchPercent: 75, percentile: 70 },
    { course: "Architecture", matchPercent: 68, percentile: 60 }
  ];

  return(
    <div id="performance-page">
      <div id="side">
        <GradeSide
          classes={sidePage.classes}
          options={sidePage.options}
        />
      </div>
      <div id="chart">
        <div id="bar-chart">
          <BarChart
            title={barProps.title}
            xlabel={barProps.xlabel}
            ylabel={barProps.ylabel}
            data={barProps.data}
          />
        </div>
        <div id="scatter-chart">
          <ScatterPlot
            title={scatterProps.title}
            data={scatterProps.data}
          />
        </div>
        <div id="bottom-chart">
          <div id="hist-chart">
            <Histogram
              title={histoProps.title}
              xlabel={histoProps.xlabel}
              header={histoProps.header}
              data={histoProps.data}
            />
          </div>
          <div id="suggest-chart">
            <SuggestionTable
              suggestions={suggestProps}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PerformancePage
