import './CropCard.css';

const CropCard = ({ crop, onClick, isSelected }) => {
    const getSuitabilityColor = (percentage) => {
        if (percentage >= 85) return 'excellent';
        if (percentage >= 70) return 'good';
        if (percentage >= 50) return 'moderate';
        return 'poor';
    };

    return (
        <div
            className={`crop-card ${isSelected ? 'selected' : ''}`}
            onClick={() => onClick && onClick(crop)}
        >
            <div className="crop-image">
                <span className="crop-emoji">{crop.image}</span>
                <div className="crop-yield-badge">
                    <span className={`yield-value ${getSuitabilityColor(crop.yieldPercentage)}`}>
                        {crop.yieldPercentage}%
                    </span>
                    <span className="yield-label">Yield</span>
                </div>
            </div>

            <div className="crop-info">
                <h3 className="crop-name">{crop.name}</h3>

                <div className="crop-details">
                    <div className="detail-item">
                        <span className="detail-icon">💧</span>
                        <span className="detail-text">{crop.waterRequirement} Water</span>
                    </div>
                    <div className="detail-item">
                        <span className="detail-icon">📅</span>
                        <span className="detail-text">{crop.season}</span>
                    </div>
                    <div className="detail-item">
                        <span className="detail-icon">⏱️</span>
                        <span className="detail-text">{crop.harvestTime}</span>
                    </div>
                </div>

                <div className="crop-footer">
                    <span className={`profit-badge ${crop.profitMargin.toLowerCase()}`}>
                        {crop.profitMargin} Profit
                    </span>
                    <span className="market-price">{crop.marketPrice}</span>
                </div>
            </div>

            <div className="suitability-bar">
                <div
                    className={`suitability-fill ${getSuitabilityColor(crop.yieldPercentage)}`}
                    style={{ width: `${crop.yieldPercentage}%` }}
                ></div>
            </div>
        </div>
    );
};

export default CropCard;
