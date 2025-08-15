import { Chart } from 'react-google-charts';
import { SuggestTableProps } from './types';

function SuggestionTable({ suggestions }: SuggestTableProps[]){
  return (
    <table style={{ borderCollapse: "collapse", width: "100%", textAlign: "left" }}>
      <thead>
        <tr>
          <th style={{ borderBottom: "2px solid #ccc", padding: "8px" }}>Course</th>
          <th style={{ borderBottom: "2px solid #ccc", padding: "8px" }}>Match %</th>
          <th style={{ borderBottom: "2px solid #ccc", padding: "8px" }}>Class Percentile</th>
        </tr>
      </thead>
      <tbody>
        {suggestions.map((s, i) => (
          <tr key={i}>
            <td style={{ padding: "8px" }}>{s.course}</td>
            <td style={{ padding: "8px" }}>{s.matchPercent}%</td>
            <td style={{ padding: "8px" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div
                  style={{
                    width: "100px",
                    height: "8px",
                    backgroundColor: "#eee",
                    marginRight: "8px",
                    borderRadius: "4px",
                  }}
                >
                  <div
                    style={{
                      width: `${s.percentile}%`,
                      height: "100%",
                      backgroundColor:
                        s.percentile >= 80
                          ? "#4caf50"
                          : s.percentile >= 50
                          ? "#ff9800"
                          : "#f44336",
                      borderRadius: "4px",
                    }}
                  ></div>
                </div>
                <span>{s.percentile}th</span>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default SuggestionTable
