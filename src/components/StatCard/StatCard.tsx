import "./stat-card.css";
import ArrowIncrease from "../../assets/arrowIncrease.svg";
import ArrowDecrease from "../../assets/arrowDecrease.svg";

interface StatCardProps {
    icon: React.ReactNode,
    title: String,
    value: String,
    difference: number,
    isPositive: boolean,
}

const StatCard: React.FC<StatCardProps> = ({
    icon,
    title,
    value,
    difference,
    isPositive,
}) => {
    return (
        <div className="stat-card">
            <div className="stat-heading">
                <div className="stat-icon">{icon}</div>
                <span className="stat-title">{title}</span>
            </div>
            <div className="stat-content">
                <span className="stat-value">{value}</span>
                {difference && (
                    <div className="stat-perc">
                        <span className={`stat-diff ${isPositive ? "positive" : "negative"}`}>
                            {difference}%
                            {isPositive ? <img className="arrowIcon" src={ArrowIncrease} />
                                :
                                <img className="arrowIcon" src={ArrowDecrease} />
                            }
                        </span>
                    </div>


                )}
            </div>
        </div>
    )
}

export default StatCard;