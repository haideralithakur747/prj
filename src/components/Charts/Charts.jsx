import { Pie, Bar, Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import './Charts.css';

// Register ChartJS components
ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

// Common chart options
const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'bottom',
            labels: {
                color: '#C5D0C8',
                padding: 20,
                font: {
                    family: "'Inter', sans-serif",
                    size: 12
                }
            }
        },
        tooltip: {
            backgroundColor: 'rgba(21, 36, 32, 0.95)',
            titleColor: '#FFFFFF',
            bodyColor: '#C5D0C8',
            borderColor: '#1F3530',
            borderWidth: 1,
            padding: 12,
            cornerRadius: 8,
            titleFont: {
                family: "'Inter', sans-serif",
                weight: 'bold'
            },
            bodyFont: {
                family: "'Inter', sans-serif"
            }
        }
    }
};

// Nutrient Distribution Pie Chart
export const NutrientPieChart = ({ nutrients }) => {
    const data = {
        labels: ['Nitrogen', 'Phosphorus', 'Potassium', 'Other Minerals'],
        datasets: [{
            data: [
                nutrients?.nitrogen?.value || 45,
                nutrients?.phosphorus?.value || 32,
                nutrients?.potassium?.value || 58,
                20
            ],
            backgroundColor: [
                'rgba(76, 175, 80, 0.8)',
                'rgba(74, 144, 217, 0.8)',
                'rgba(245, 158, 11, 0.8)',
                'rgba(139, 69, 19, 0.8)'
            ],
            borderColor: [
                'rgba(76, 175, 80, 1)',
                'rgba(74, 144, 217, 1)',
                'rgba(245, 158, 11, 1)',
                'rgba(139, 69, 19, 1)'
            ],
            borderWidth: 2
        }]
    };

    return (
        <div className="chart-container">
            <h3 className="chart-title">🧪 Nutrient Distribution</h3>
            <div className="chart-wrapper">
                <Pie data={data} options={commonOptions} />
            </div>
        </div>
    );
};

// Crop Yield Bar Chart
export const CropYieldChart = ({ crops }) => {
    const topCrops = crops?.slice(0, 5) || [];

    const data = {
        labels: topCrops.map(c => c.name),
        datasets: [{
            label: 'Yield Potential (%)',
            data: topCrops.map(c => c.yieldPercentage),
            backgroundColor: [
                'rgba(76, 175, 80, 0.8)',
                'rgba(34, 197, 94, 0.8)',
                'rgba(74, 144, 217, 0.8)',
                'rgba(245, 158, 11, 0.8)',
                'rgba(139, 69, 19, 0.8)'
            ],
            borderColor: [
                'rgba(76, 175, 80, 1)',
                'rgba(34, 197, 94, 1)',
                'rgba(74, 144, 217, 1)',
                'rgba(245, 158, 11, 1)',
                'rgba(139, 69, 19, 1)'
            ],
            borderWidth: 2,
            borderRadius: 8
        }]
    };

    const options = {
        ...commonOptions,
        scales: {
            x: {
                grid: {
                    color: 'rgba(31, 53, 48, 0.5)'
                },
                ticks: {
                    color: '#94A89A'
                }
            },
            y: {
                beginAtZero: true,
                max: 100,
                grid: {
                    color: 'rgba(31, 53, 48, 0.5)'
                },
                ticks: {
                    color: '#94A89A',
                    callback: (value) => `${value}%`
                }
            }
        }
    };

    return (
        <div className="chart-container">
            <h3 className="chart-title">🌾 Crop Yield Potential</h3>
            <div className="chart-wrapper bar">
                <Bar data={data} options={options} />
            </div>
        </div>
    );
};

// Health Score Doughnut
export const HealthScoreChart = ({ score, label }) => {
    const getColor = (value) => {
        if (value >= 70) return ['rgba(34, 197, 94, 0.8)', 'rgba(34, 197, 94, 1)'];
        if (value >= 50) return ['rgba(245, 158, 11, 0.8)', 'rgba(245, 158, 11, 1)'];
        return ['rgba(239, 68, 68, 0.8)', 'rgba(239, 68, 68, 1)'];
    };

    const [bgColor, borderColor] = getColor(score);

    const data = {
        datasets: [{
            data: [score, 100 - score],
            backgroundColor: [bgColor, 'rgba(31, 53, 48, 0.5)'],
            borderColor: [borderColor, 'rgba(31, 53, 48, 0.8)'],
            borderWidth: 2,
            cutout: '75%'
        }]
    };

    const options = {
        ...commonOptions,
        plugins: {
            ...commonOptions.plugins,
            legend: {
                display: false
            }
        }
    };

    return (
        <div className="score-chart-container">
            <div className="score-chart-wrapper">
                <Doughnut data={data} options={options} />
                <div className="score-center">
                    <span className="score-value">{score}</span>
                    <span className="score-label">{label}</span>
                </div>
            </div>
        </div>
    );
};

// Water Requirement Chart
export const WaterRequirementChart = ({ crops }) => {
    const waterLevels = { Low: 1, Medium: 2, High: 3 };
    const topCrops = crops?.slice(0, 6) || [];

    const data = {
        labels: topCrops.map(c => c.name),
        datasets: [{
            label: 'Water Requirement',
            data: topCrops.map(c => waterLevels[c.waterRequirement] || 2),
            backgroundColor: topCrops.map(c => {
                if (c.waterRequirement === 'Low') return 'rgba(34, 197, 94, 0.8)';
                if (c.waterRequirement === 'Medium') return 'rgba(245, 158, 11, 0.8)';
                return 'rgba(74, 144, 217, 0.8)';
            }),
            borderRadius: 8
        }]
    };

    const options = {
        ...commonOptions,
        indexAxis: 'y',
        scales: {
            x: {
                beginAtZero: true,
                max: 3,
                grid: {
                    color: 'rgba(31, 53, 48, 0.5)'
                },
                ticks: {
                    color: '#94A89A',
                    callback: (value) => ['', 'Low', 'Medium', 'High'][value]
                }
            },
            y: {
                grid: {
                    display: false
                },
                ticks: {
                    color: '#C5D0C8'
                }
            }
        }
    };

    return (
        <div className="chart-container">
            <h3 className="chart-title">💧 Water Requirements</h3>
            <div className="chart-wrapper bar horizontal">
                <Bar data={data} options={options} />
            </div>
        </div>
    );
};
