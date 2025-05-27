import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceDot } from 'recharts';
import "./custom-tooltip.css";
import ArrowIncrease from "../../assets/arrowIncrease.svg";

type ChartDataType = {
  month: string;
  revenue: number;
  expenses: number;
}

interface ChartProps {
  chartData: ChartDataType[];
}

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

const AreaChartComponent: React.FC<ChartProps> = ({ chartData }) => {

  return (
    <div style={{ width: '100%', height: 360 }}>
      <ResponsiveContainer >
        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#575DFF" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#575DFF" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="expensesGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#57C3FF" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#57C3FF" stopOpacity={0} />
            </linearGradient>
          </defs>

          <XAxis dataKey="month"
            tick={{ fill: '#AEB9E1', fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            tickMargin={20}
            tickSize={0}
          />
          <YAxis
            domain={[0, 250000]}
            ticks={[0, 50000, 100000, 150000, 200000, 250000]}
            tickFormatter={(value) => `${value / 1000}K`}
            tick={{ fill: '#AEB9E1', fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            tickMargin={20}
            tickSize={0}
          />
          <Tooltip content={<CustomTooltip />} cursor={false} />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#CB3CFF"
            fill="url(#revenueGradient)"
            strokeWidth={2}
            activeDot={{ r: 8, fill: '#0B1739', stroke: '#CB3CFF', strokeWidth: 2 }}
          />
          <Area
            type="monotone"
            dataKey="expenses"
            stroke="#00C2FF"
            fill="url(#expensesGradient)"
            strokeWidth={2}
            activeDot={{ r: 8, fill: '#0B1739', stroke: '#00C2FF', strokeWidth: 2 }}
          />
          <ReferenceDot
            x={chartData[chartData.length - 1].month}
            y={chartData[chartData.length - 1].revenue}
            r={3}
            fill="#CB3CFF"
            stroke="#CB3CFF"
            strokeWidth={2}
            isFront
          />
          <ReferenceDot
            x={chartData[chartData.length - 1].month}
            y={chartData[chartData.length - 1].expenses}
            r={3}
            fill="#00C2FF"
            stroke="#00C2FF"
            strokeWidth={2}
            isFront
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AreaChartComponent;