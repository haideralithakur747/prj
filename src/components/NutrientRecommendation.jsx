import { useState } from 'react';
import './NutrientRecommendation.css';

const NutrientRecommendation = ({ recommendations, crops, onCropSelect }) => {
    const [selectedCropId, setSelectedCropId] = useState(crops[0]?.id || null);

    const handleCropChange = (e) => {
        const cropId = parseInt(e.target.value);
        setSelectedCropId(cropId);
        onCropSelect && onCropSelect(cropId);
    };

    const getPriorityColor = (priority) => {
        switch (priority.toLowerCase()) {
            case 'high':
                return 'high';
            case 'medium':
                return 'medium';
            default:
                return 'low';
        }
    };

    return (
        <div className="nutrient-recommendation">
            <div className="recommendation-header">
                <div className="header-content">
                    <span className="header-icon">🧬</span>
                    <div>
                        <h2>Nutrient Recommendations</h2>
                        <p>Fertilizer guidance for your selected crop</p>
                    </div>
                </div>

                <div className="crop-selector">
                    <label htmlFor="crop-select">Target Crop:</label>
                    <select
                        id="crop-select"
                        value={selectedCropId || ''}
                        onChange={handleCropChange}
                    >
                        {crops.map(crop => (
                            <option key={crop.id} value={crop.id}>
                                {crop.image} {crop.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {recommendations.length === 0 ? (
                <div className="no-recommendations">
                    <span className="success-icon">✅</span>
                    <h3>Soil is well-balanced!</h3>
                    <p>No additional nutrients required for the selected crop.</p>
                </div>
            ) : (
                <div className="recommendations-list">
                    {recommendations.map((rec, index) => (
                        <div
                            key={index}
                            className="recommendation-card"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="card-header">
                                <div className="nutrient-info">
                                    <span className={`priority-badge ${getPriorityColor(rec.priority)}`}>
                                        {rec.priority} Priority
                                    </span>
                                    <h3>{rec.nutrient}</h3>
                                </div>
                                <div className="deficit-info">
                                    <span className="deficit-value">-{rec.deficit?.toFixed(0) || 'N/A'}</span>
                                    <span className="deficit-label">Deficit</span>
                                </div>
                            </div>

                            <div className="card-body">
                                <div className="stat-row">
                                    <span className="stat-label">Current Level</span>
                                    <span className="stat-value">{rec.current} {rec.nutrient !== 'pH Correction' ? 'kg/ha' : ''}</span>
                                </div>
                                <div className="stat-row">
                                    <span className="stat-label">Required Level</span>
                                    <span className="stat-value">{rec.required} {rec.nutrient !== 'pH Correction' ? 'kg/ha' : ''}</span>
                                </div>
                            </div>

                            <div className="fertilizer-section">
                                <h4>💊 Recommended Treatment</h4>
                                <div className="fertilizer-details">
                                    <div className="detail-item main">
                                        <span className="detail-label">Fertilizer</span>
                                        <span className="detail-value">{rec.fertilizer || rec.treatment}</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="detail-label">Amount</span>
                                        <span className="detail-value">{rec.amount}</span>
                                    </div>
                                    <div className="detail-item full">
                                        <span className="detail-label">Application</span>
                                        <span className="detail-value">{rec.application}</span>
                                    </div>
                                    {rec.alternative && (
                                        <div className="detail-item">
                                            <span className="detail-label">Alternative</span>
                                            <span className="detail-value">{rec.alternative}</span>
                                        </div>
                                    )}
                                    {rec.organicOption && (
                                        <div className="detail-item organic">
                                            <span className="detail-label">🌿 Organic Option</span>
                                            <span className="detail-value">{rec.organicOption}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default NutrientRecommendation;
