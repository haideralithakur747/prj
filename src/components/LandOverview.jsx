import './LandOverview.css';

const LandOverview = ({ location, soilAnalysis, region }) => {
    if (!location || !soilAnalysis) return null;

    const { soilType, climate, organicMatter, moisture } = soilAnalysis;

    const infoItems = [
        {
            icon: '📍',
            label: 'Coordinates',
            value: `${location.lat.toFixed(4)}°, ${location.lng.toFixed(4)}°`,
            subValue: null
        },
        {
            icon: '🌍',
            label: 'Region',
            value: region?.name || 'Unknown Region',
            subValue: region?.zone || null
        },
        {
            icon: '🏔️',
            label: 'Soil Type',
            value: soilType.name,
            subValue: soilType.quality,
            color: soilType.color
        },
        {
            icon: climate.icon,
            label: 'Climate',
            value: climate.name,
            subValue: `Avg ${climate.avgTemp}°C`
        },
        {
            icon: '💧',
            label: 'Rainfall',
            value: climate.rainfall,
            subValue: `${climate.humidity}% humidity`
        },
        {
            icon: '🌿',
            label: 'Organic Matter',
            value: `${organicMatter.value}%`,
            subValue: organicMatter.status
        }
    ];

    return (
        <div className="land-overview">
            <div className="overview-header">
                <div className="header-title">
                    <span className="header-icon">📊</span>
                    <h2>Land Overview</h2>
                </div>
                <div className="analysis-badge">
                    <span className="pulse-dot"></span>
                    AI Analysis Complete
                </div>
            </div>

            <div className="overview-grid">
                {infoItems.map((item, index) => (
                    <div
                        key={index}
                        className="info-card"
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                        <div className="info-icon">{item.icon}</div>
                        <div className="info-content">
                            <span className="info-label">{item.label}</span>
                            <span className="info-value" style={item.color ? { color: item.color } : {}}>
                                {item.value}
                            </span>
                            {item.subValue && (
                                <span className="info-sub">{item.subValue}</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="moisture-bar">
                <div className="moisture-header">
                    <span>💧 Soil Moisture Level</span>
                    <span className="moisture-value">{moisture.value}%</span>
                </div>
                <div className="progress-bar">
                    <div
                        className={`progress-bar-fill ${moisture.value > 60 ? 'excellent' : moisture.value > 40 ? 'good' : 'warning'}`}
                        style={{ width: `${moisture.value}%` }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default LandOverview;
