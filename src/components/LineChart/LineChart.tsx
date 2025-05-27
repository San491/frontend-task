import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import "../AreaChart/custom-tooltip.css";
import { lineChartData } from '../../data/chartData';
import ArrowIncrease from "../../assets/arrowIncrease.svg";

const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
    if (!active || !payload || !payload.length) return null;

    const hovered = payload[0];
    const formattedValue = hovered.value;
    const formattedDate = `${label}`;

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

const LineChartComponent = () => {
    return (
        <div style={{ width: '100%', height: 120 }}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    width={450}
                    height={150}
                    data={lineChartData}
                    margin={{ top: 0, right: 10, left: -20, bottom: 0 }}
                >
                    <XAxis dataKey="time"
                        tick={{ fill: '#AEB9E1', fontSize: 8, dx: -10 }}
                        tickLine={false}
                        axisLine={false}
                        tickMargin={20}
                        tickSize={0} />
                    <YAxis
                        domain={[0, 600]}
                        ticks={[0, 200, 400, 600]}
                        tick={{ fill: '#AEB9E1', fontSize: 8 }}
                        tickLine={false}
                        axisLine={false}
                        tickMargin={20}
                        tickSize={0} />
                    <Tooltip cursor={false} content={<CustomTooltip />} />
                    <Line dataKey="sessions" stroke="#CB3CFF" dot={false}
                        activeDot={{ r: 2, fill: '#CB3CFF', stroke: '#CB3CFF', strokeWidth: 2 }} />

                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default LineChartComponent;

