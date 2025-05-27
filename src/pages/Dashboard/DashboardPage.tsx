import StatCard from "../../components/StatCard/StatCard";
import "./dashboard-page.css";
import { ReactComponent as ViewsIcon } from "../../assets/viewsIcon.svg"
import { ReactComponent as UsersIcon } from "../../assets/userIcon.svg"
import { ReactComponent as SignUpsIcon } from "../../assets/signupsIcon.svg"
import { ReactComponent as StarIcon } from "../../assets/starIcon.svg"
import { ReactComponent as ArrowIncrease } from "../../assets/arrowIncrease.svg";
import { ReactComponent as ProfitIcon } from "../../assets/profitIcon.svg";
import { ReactComponent as SessionsIcon } from "../../assets/sessionsIcon.svg";
import { ReactComponent as DateIcon } from "../../assets/dateSelectIcon.svg";
import { ReactComponent as DropDownIcon } from "../../assets/chevronDown.svg";
import AreaChartComponent from "../../components/AreaChart/AreaChart";
import BarChartComponent from "../../components/BarChart/BarChart";
import LineChartComponent from "../../components/LineChart/LineChart";
import { SelectField } from "../../components/SelectField/SelectField";
import { useState } from "react";
import { areaChartData1, areaChartData2, areaChartData3, areaChartData4 } from "../../data/chartData";

const DashboardPage: React.FC = () => {

    const [selected, setSelected] = useState<string>("areaChartData1");
    const options = [
        { label: "Jan 2025 - Dec 2025", value: "areaChartData1" },
        { label: "Jan 2024 - Dec 2024", value: "areaChartData2" },
        { label: "Jan 2023 - Dec 2023", value: "areaChartData3" },
        { label: "Jan 2022 - Dec 2022", value: "areaChartData4" },
    ];
    const chartDataMap = {
        areaChartData1,
        areaChartData2,
        areaChartData3,
        areaChartData4,
    };


    return (
        <div className="container">
            <div className="sub-container">
                <div className="heading">
                    <span className="title">Welcome back, John</span>
                    <span className="description">Measure your advertising ROI and report website traffic.</span>
                </div>
                <div className="statistics">
                    <div className="top-container">
                        <StatCard
                            icon={<ViewsIcon />}
                            title={"Pageviews"}
                            value={"50.8K"}
                            difference={28.4}
                            isPositive={true}
                        />
                        <StatCard
                            icon={<UsersIcon className="icon-adjust users" />}
                            title={"Monthly users"}
                            value={"23.6K"}
                            difference={12.6}
                            isPositive={false}
                        />
                        <StatCard
                            icon={<SignUpsIcon className="icon-adjust signups" />}
                            title={"New sign ups"}
                            value={"756"}
                            difference={3.1}
                            isPositive={true}
                        />
                        <StatCard
                            icon={<StarIcon className="icon-adjust signups" />}
                            title={"Subscriptions"}
                            value={"2.3K"}
                            difference={11.3}
                            isPositive={true}
                        />
                    </div>
                    <div className="bottom-container">
                        <div className="chart-card">
                            <div className="left-section">
                                <div className="left-section-top">
                                    <div className="heading-left">
                                        <span className="stat-title">Total revenue</span>
                                        <div className="stat-content">
                                            <span className="stat-bottom-value">$240.8K</span>
                                            <div className="stat-perc">
                                                <span className="stat-diff positive">
                                                    24.6%
                                                    <ArrowIncrease className="arrowIcon" />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="heading-right">
                                        <div className="legend">
                                            <div className="revenue">
                                                <div className="revenue-legend" />
                                                <span className="revenue-text">Revenue</span>
                                            </div>
                                            <div className="expenses">
                                                <div className="expenses-legend" />
                                                <span className="expenses-text">Expenses</span>
                                            </div>
                                        </div>
                                        <div className="selector">
                                            <SelectField
                                                leftIcon={<DateIcon />}
                                                rightIcon={<DropDownIcon />}
                                                options={options}
                                                value={selected}
                                                onChange={setSelected} />
                                        </div>
                                    </div>
                                </div>
                                <div className="left-section-bottom">
                                    <AreaChartComponent
                                        chartData={chartDataMap[selected as keyof typeof chartDataMap]}
                                    />
                                </div>
                            </div>
                            <div className="right-section">
                                <div className="right-section-top">
                                    <div className="small-chart-heading">
                                        <span className="chart-icon">
                                            <ProfitIcon className="profitIcon" />
                                            <span className="chart-title">Total profit</span>
                                        </span>
                                        <div className="stat-content">
                                            <span className="stat-bottom-value">$144.6K</span>
                                            <div className="stat-perc">
                                                <span className="stat-diff positive">
                                                    28.5%
                                                    <ArrowIncrease className="arrowIcon" />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="small-chart-one">
                                        <BarChartComponent />
                                    </div>
                                    <span className="small-chart-one-desc">Last 12 months</span>
                                </div>
                                <div className="right-section-bottom">
                                    <div className="small-chart-heading">
                                        <span className="chart-icon">
                                            <SessionsIcon className="profitIcon" />
                                            <span className="chart-title">Total sessions</span>
                                        </span>
                                        <div className="stat-content">
                                            <span className="stat-bottom-value">400</span>
                                            <div className="stat-perc">
                                                <span className="stat-diff positive">
                                                    16.8%
                                                    <ArrowIncrease className="arrowIcon" />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="small-chart-two ">
                                        <LineChartComponent />
                                    </div>
                                    <span className="small-chart-two-desc">
                                        <span className="live">
                                            <div className="live-icon" />
                                            <span>Live</span>
                                        </span>
                                        <span className="visitors-text">10k visitors</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default DashboardPage;