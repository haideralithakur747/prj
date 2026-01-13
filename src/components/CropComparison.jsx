import { useState, useEffect } from 'react';
import { compareCrops } from '../data/mockAnalysis';
import { generateAICropComparison, isGeminiConfigured } from '../services/geminiService';
import './CropComparison.css';

const CropComparison = ({ crops, soilAnalysis, useAI = false }) => {
    const [currentCropId, setCurrentCropId] = useState(crops[0]?.id || null);
    const [desiredCropId, setDesiredCropId] = useState(crops[1]?.id || null);
    const [comparison, setComparison] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchComparison = async () => {
            if (currentCropId && desiredCropId && soilAnalysis) {
                const currentCrop = crops.find(c => c.id === currentCropId);
                const desiredCrop = crops.find(c => c.id === desiredCropId);

                if (currentCrop && desiredCrop) {
                    // Try AI comparison if available
                    if (useAI && isGeminiConfigured()) {
                        setIsLoading(true);
                        try {
                            const result = await generateAICropComparison(currentCrop, desiredCrop, soilAnalysis);
                            if (result.success) {
                                setComparison(result.data);
                                setIsLoading(false);
                                return;
                            }
                        } catch (err) {
                            console.error('AI Comparison Error:', err);
                        }
                        setIsLoading(false);
                    }

                    // Fallback to mock comparison
                    setComparison(compareCrops(currentCrop, desiredCrop, soilAnalysis));
                }
            }
        };

        fetchComparison();
    }, [currentCropId, desiredCropId, crops, soilAnalysis, useAI]);

    const getYieldBarStyle = (value) => {
        return {
            width: `${value}%`,
            background: value >= 80 ? 'var(--success)' : value >= 60 ? 'var(--warning)' : 'var(--error)'
        };
    };

    return (
        <div className="crop-comparison">
            <div className="comparison-header">
                <div className="header-content">
                    <span className="header-icon">⚖️</span>
                    <div>
                        <h2>Crop Comparison Tool</h2>
                        <p>Compare yield, cost, and soil impact between crops</p>
                    </div>
                </div>
                {useAI && (
                    <span className="ai-tag">🤖 AI-Powered</span>
                )}
            </div>

            <div className="crop-selectors">
                <div className="selector-group">
                    <label>Current Recommendation</label>
                    <select
                        value={currentCropId || ''}
                        onChange={(e) => setCurrentCropId(parseInt(e.target.value))}
                    >
                        {crops.map((crop, index) => (
                            <option key={crop.id || index} value={crop.id || index}>
                                {crop.image} {crop.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="vs-badge">VS</div>

                <div className="selector-group">
                    <label>Desired Crop</label>
                    <select
                        value={desiredCropId || ''}
                        onChange={(e) => setDesiredCropId(parseInt(e.target.value))}
                    >
                        {crops.map((crop, index) => (
                            <option key={crop.id || index} value={crop.id || index}>
                                {crop.image} {crop.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {isLoading ? (
                <div className="comparison-loading">
                    <div className="mini-spinner"></div>
                    <span>Generating AI comparison...</span>
                </div>
            ) : comparison && (
                <div className="comparison-results">
                    {/* Yield Comparison */}
                    <div className="comparison-section">
                        <h3>🌾 Yield Potential</h3>
                        <div className="comparison-bars">
                            <div className="bar-group">
                                <div className="bar-label">
                                    <span>{comparison.currentCrop?.image} {comparison.currentCrop?.name}</span>
                                    <span className="bar-value">{comparison.currentCrop?.yieldPercentage}%</span>
                                </div>
                                <div className="bar-track">
                                    <div
                                        className="bar-fill current"
                                        style={getYieldBarStyle(comparison.currentCrop?.yieldPercentage || 0)}
                                    ></div>
                                </div>
                            </div>
                            <div className="bar-group">
                                <div className="bar-label">
                                    <span>{comparison.desiredCrop?.image} {comparison.desiredCrop?.name}</span>
                                    <span className="bar-value">{comparison.desiredCrop?.yieldPercentage}%</span>
                                </div>
                                <div className="bar-track">
                                    <div
                                        className="bar-fill desired"
                                        style={getYieldBarStyle(comparison.desiredCrop?.yieldPercentage || 0)}
                                    ></div>
                                </div>
                            </div>
                        </div>
                        <p className="comparison-desc">{comparison.yieldDifference?.description}</p>
                    </div>

                    {/* Cost Comparison */}
                    <div className="comparison-section">
                        <h3>💰 Cultivation Cost</h3>
                        <div className="cost-cards">
                            <div className="cost-card">
                                <span className="cost-emoji">{comparison.currentCrop?.image}</span>
                                <span className="cost-value">${comparison.costDifference?.current}/ha</span>
                                <span className="cost-label">{comparison.currentCrop?.name}</span>
                            </div>
                            <div className="cost-arrow">
                                <span>{comparison.costDifference?.difference > 0 ? '📈' : comparison.costDifference?.difference < 0 ? '📉' : '➡️'}</span>
                            </div>
                            <div className="cost-card">
                                <span className="cost-emoji">{comparison.desiredCrop?.image}</span>
                                <span className="cost-value">${comparison.costDifference?.desired}/ha</span>
                                <span className="cost-label">{comparison.desiredCrop?.name}</span>
                            </div>
                        </div>
                        <p className="comparison-desc">{comparison.costDifference?.description}</p>
                    </div>



                    {/* Recommendations */}
                    <div className="comparison-recommendations">
                        <h3>💡 Recommendations</h3>
                        <ul>
                            {comparison.recommendation?.map((msg, index) => (
                                <li key={index}>{msg}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CropComparison;
