import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import { barChartData } from '../../data/chartData';
import "../AreaChart/custom-tooltip.css";
import ArrowIncrease from "../../assets/arrowIncrease.svg";

const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;

  const hovered = payload[0];
  const formattedValue = `$${hovered.value / 1000}k`;
  const formattedDate = `${label} 21, 2023`;

  return (
    <div className="tooltip">
      <div className="tooltip-stat">
        <span className='tooltip-value'>{formattedValue}</span>
        <span className='tooltip-diff'>12.5%
          <img className="arrowIcon" src={ArrowIncrease} />
        </span>
      </div>
      <span className='tooltip-date'>{formattedDate}</span>
    </div>
  );
};

const BarChartComponent = () => {
    return (
        <div style={{ width: '100%', height: 100 }}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    width={450}
                    height={150}
                    data={barChartData}
                >
                    <XAxis dataKey="month"
                        tick={{ fill: '#AEB9E1', fontSize: 8, dx: -10 }}
                        tickLine={false}
                        axisLine={false}
                        tickMargin={10}
                        tickSize={0} />
                    <YAxis hide />
                    <Tooltip cursor={{ fill: '#343B4F', opacity: 0.5 }} content={<CustomTooltip />} />
                    <Bar dataKey="revenue" fill="#CB3CFF" />
                    <Bar dataKey="expenses" fill="#00C2FF" 
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default BarChartComponent;

