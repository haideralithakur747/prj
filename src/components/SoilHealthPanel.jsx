import './SoilHealthPanel.css';

const SoilHealthPanel = ({ soilAnalysis }) => {
    if (!soilAnalysis) return null;

    const { nutrients, healthScore, sustainabilityScore } = soilAnalysis;

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'good':
            case 'optimal':
                return 'excellent';
            case 'moderate':
                return 'good';
            case 'low':
            case 'acidic':
            case 'alkaline':
                return 'warning';
            default:
                return 'good';
        }
    };

    const getBarWidth = (value, nutrient) => {
        if (nutrient === 'ph') {
            // pH scale is 0-14, optimal around 6-7.5
            return (value / 14) * 100;
        }
        // Nutrient levels 0-100
        return Math.min(value, 100);
    };

    const nutrientList = [
        {
            key: 'nitrogen',
            name: 'Nitrogen (N)',
            icon: '🧪',
            data: nutrients.nitrogen,
            description: 'Essential for leaf growth'
        },
        {
            key: 'phosphorus',
            name: 'Phosphorus (P)',
            icon: '⚗️',
            data: nutrients.phosphorus,
            description: 'Root development & flowering'
        },
        {
            key: 'potassium',
            name: 'Potassium (K)',
            icon: '🔬',
            data: nutrients.potassium,
            description: 'Overall plant health'
        },
        {
            key: 'ph',
            name: 'pH Level',
            icon: '🌡️',
            data: nutrients.ph,
            description: 'Soil acidity/alkalinity'
        }
    ];

    return (
        <div className="soil-health-panel">
            <div className="panel-header">
                <div className="header-content">
                    <span className="header-icon">🌱</span>
                    <div>
                        <h2>Soil Health Analysis</h2>
                        <p>Nutrient levels and composition</p>
                    </div>
                </div>
            </div>

            <div className="scores-section">
                <div className="score-card health-score">
                    <div className="score-ring">
                        <svg viewBox="0 0 100 100">
                            <circle
                                className="score-bg"
                                cx="50"
                                cy="50"
                                r="45"
                            />
                            <circle
                                className="score-progress"
                                cx="50"
                                cy="50"
                                r="45"
                                style={{
                                    strokeDasharray: `${healthScore * 2.83} 283`,
                                    stroke: healthScore > 70 ? 'var(--success)' : healthScore > 50 ? 'var(--warning)' : 'var(--error)'
                                }}
                            />
                        </svg>
                        <div className="score-value">
                            <span className="score-number">{healthScore}</span>
                            <span className="score-label">Health</span>
                        </div>
                    </div>
                    <span className="score-title">Land Health Score</span>
                </div>

                <div className="score-card sustainability-score">
                    <div className="score-ring">
                        <svg viewBox="0 0 100 100">
                            <circle
                                className="score-bg"
                                cx="50"
                                cy="50"
                                r="45"
                            />
                            <circle
                                className="score-progress sustainability"
                                cx="50"
                                cy="50"
                                r="45"
                                style={{
                                    strokeDasharray: `${sustainabilityScore * 2.83} 283`,
                                    stroke: 'var(--sky-blue)'
                                }}
                            />
                        </svg>
                        <div className="score-value">
                            <span className="score-number">{sustainabilityScore}</span>
                            <span className="score-label">Sustain</span>
                        </div>
                    </div>
                    <span className="score-title">Sustainability Score</span>
                </div>
            </div>

            <div className="nutrients-section">
                <h3>Nutrient Levels</h3>
                <div className="nutrient-list">
                    {nutrientList.map((nutrient, index) => (
                        <div
                            key={nutrient.key}
                            className="nutrient-item"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="nutrient-header">
                                <div className="nutrient-info">
                                    <span className="nutrient-icon">{nutrient.icon}</span>
                                    <div>
                                        <span className="nutrient-name">{nutrient.name}</span>
                                        <span className="nutrient-desc">{nutrient.description}</span>
                                    </div>
                                </div>
                                <div className="nutrient-values">
                                    <span className="current-value">
                                        {nutrient.data.value}{nutrient.data.unit}
                                    </span>
                                    <span className={`status-badge ${getStatusColor(nutrient.data.status)}`}>
                                        {nutrient.data.status}
                                    </span>
                                </div>
                            </div>
                            <div className="nutrient-bar">
                                <div className="progress-bar">
                                    <div
                                        className={`progress-bar-fill ${getStatusColor(nutrient.data.status)}`}
                                        style={{ width: `${getBarWidth(nutrient.data.value, nutrient.key)}%` }}
                                    ></div>
                                </div>
                                <span className="optimal-range">Optimal: {nutrient.data.optimal}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SoilHealthPanel;
