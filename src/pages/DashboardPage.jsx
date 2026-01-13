import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import LandOverview from '../components/LandOverview';
import CropCard from '../components/CropCard';
import SoilHealthPanel from '../components/SoilHealthPanel';
import NutrientRecommendation from '../components/NutrientRecommendation';
import CropComparison from '../components/CropComparison';
import { NutrientPieChart, CropYieldChart, WaterRequirementChart } from '../components/Charts/Charts';
import { generateAISoilAnalysis, generateAICropRecommendations, generateAIFertilizerPlan, isGeminiConfigured } from '../services/geminiService';
import { getRecommendedCrops, getAllCrops } from '../data/mockCrops';
import { generateSoilAnalysis, getRegionFromCoords } from '../data/mockSoilData';
import { generateCropNutrientPlan } from '../data/mockAnalysis';
import './DashboardPage.css';

const DashboardPage = () => {
    const [searchParams] = useSearchParams();
    const [location, setLocation] = useState(null);
    const [soilAnalysis, setSoilAnalysis] = useState(null);
    const [region, setRegion] = useState(null);
    const [recommendedCrops, setRecommendedCrops] = useState([]);
    const [allCrops, setAllCrops] = useState([]);
    const [nutrientRecommendations, setNutrientRecommendations] = useState([]);
    const [selectedCrop, setSelectedCrop] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [loadingStep, setLoadingStep] = useState(0);
    const [useAI, setUseAI] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const lat = parseFloat(searchParams.get('lat')) || 28.6139;
        const lng = parseFloat(searchParams.get('lng')) || 77.2090;

        const analyzeLocation = async () => {
            setIsLoading(true);
            setError(null);
            const loc = { lat, lng };
            setLocation(loc);

            // Check if Gemini API is configured
            const aiAvailable = isGeminiConfigured();
            setUseAI(aiAvailable);

            if (aiAvailable) {
                try {
                    // Step 1: Soil Analysis
                    setLoadingStep(1);
                    const soilResult = await generateAISoilAnalysis(lat, lng);

                    if (!soilResult.success) {
                        throw new Error(soilResult.error);
                    }

                    const analysis = soilResult.data;
                    setSoilAnalysis(analysis);
                    setRegion(analysis.region);

                    // Step 2: Crop Recommendations
                    setLoadingStep(2);
                    const cropsResult = await generateAICropRecommendations(
                        analysis.soilType.name,
                        analysis.climate.name,
                        analysis.nutrients
                    );

                    if (cropsResult.success) {
                        setRecommendedCrops(cropsResult.data);
                        setAllCrops(cropsResult.data);

                        // Step 3: Fertilizer Recommendations
                        setLoadingStep(3);
                        if (cropsResult.data.length > 0) {
                            setSelectedCrop(cropsResult.data[0]);
                            const fertilizerResult = await generateAIFertilizerPlan(cropsResult.data[0], analysis);
                            if (fertilizerResult.success) {
                                setNutrientRecommendations(fertilizerResult.data);
                            }
                        }
                    } else {
                        // Fallback to mock crops if AI fails
                        const mockCrops = getRecommendedCrops(analysis.soilType.name, analysis.climate.name);
                        setRecommendedCrops(mockCrops);
                        setAllCrops(getAllCrops());
                        if (mockCrops.length > 0) {
                            setSelectedCrop(mockCrops[0]);
                        }
                    }

                    setLoadingStep(4);
                } catch (err) {
                    console.error('AI Analysis Error:', err);
                    setError(err.message);
                    // Fallback to mock data
                    fallbackToMockData(lat, lng);
                }
            } else {
                // Use mock data if no API key
                fallbackToMockData(lat, lng);
            }

            setIsLoading(false);
        };

        const fallbackToMockData = (lat, lng) => {
            const analysis = generateSoilAnalysis(lat, lng);
            setSoilAnalysis(analysis);

            const regionData = getRegionFromCoords(lat, lng);
            setRegion(regionData);

            const crops = getRecommendedCrops(analysis.soilType.name, analysis.climate.name);
            setRecommendedCrops(crops);
            setAllCrops(getAllCrops());

            if (crops.length > 0) {
                setSelectedCrop(crops[0]);
                const recommendations = generateCropNutrientPlan(crops[0], analysis);
                setNutrientRecommendations(recommendations);
            }
        };

        analyzeLocation();
    }, [searchParams]);

    const handleCropSelect = async (cropId) => {
        const crop = allCrops.find(c => c.id === cropId);
        if (crop && soilAnalysis) {
            setSelectedCrop(crop);

            if (useAI && isGeminiConfigured()) {
                try {
                    const fertilizerResult = await generateAIFertilizerPlan(crop, soilAnalysis);
                    if (fertilizerResult.success) {
                        setNutrientRecommendations(fertilizerResult.data);
                        return;
                    }
                } catch (err) {
                    console.error('Fertilizer AI Error:', err);
                }
            }

            // Fallback to mock data
            const recommendations = generateCropNutrientPlan(crop, soilAnalysis);
            setNutrientRecommendations(recommendations);
        }
    };

    if (isLoading) {
        return (
            <div className="dashboard-loading">
                <div className="loading-content">
                    <div className="loading-spinner"></div>
                    <h2>
                        {useAI ? '🤖 AI Analyzing Land Data' : 'Analyzing Land Data'}
                    </h2>
                    <p>
                        {useAI
                            ? 'Using Gemini AI for real agricultural analysis...'
                            : 'Processing satellite imagery and soil composition...'}
                    </p>
                    <div className="loading-steps">
                        <div className={`loading-step ${loadingStep >= 1 ? 'active' : ''}`}>
                            📍 Locating coordinates
                        </div>
                        <div className={`loading-step ${loadingStep >= 1 ? 'active' : ''}`}>
                            🛰️ {useAI ? 'Consulting Gemini AI' : 'Fetching satellite data'}
                        </div>
                        <div className={`loading-step ${loadingStep >= 2 ? 'active' : ''}`}>
                            🧪 Analyzing soil composition
                        </div>
                        <div className={`loading-step ${loadingStep >= 3 ? 'active' : ''}`}>
                            🌾 Generating crop recommendations
                        </div>
                        <div className={`loading-step ${loadingStep >= 4 ? 'active' : ''}`}>
                            💊 Creating fertilizer plan
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard-page">
            <div className="dashboard-header">
                <div className="header-content">
                    <div className="header-info">
                        <div className="header-badges">
                            <span className="header-badge">AI Analysis Complete</span>
                            {useAI ? (
                                <span className="header-badge ai-badge">🤖 Powered by Gemini AI</span>
                            ) : (
                                <span className="header-badge mock-badge">📊 Demo Data</span>
                            )}
                        </div>
                        <h1>Land Analysis Dashboard</h1>
                        <p>
                            Showing results for coordinates:
                            <code>{location?.lat.toFixed(4)}°, {location?.lng.toFixed(4)}°</code>
                        </p>
                        {error && (
                            <p className="error-notice">
                                ⚠️ AI analysis failed, showing demo data. Error: {error}
                            </p>
                        )}
                    </div>
                    <Link to="/analyze" className="btn btn-secondary">
                        ← Analyze New Location
                    </Link>
                </div>
            </div>

            <div className="dashboard-content">
                {/* Main Grid */}
                <div className="dashboard-grid">
                    {/* Land Overview */}
                    <div className="grid-item full-width">
                        <LandOverview
                            location={location}
                            soilAnalysis={soilAnalysis}
                            region={region}
                        />
                    </div>

                    {/* Soil Health & Charts Row */}
                    <div className="grid-item span-2">
                        <SoilHealthPanel soilAnalysis={soilAnalysis} />
                    </div>

                    <div className="grid-item">
                        <NutrientPieChart nutrients={soilAnalysis?.nutrients} />
                    </div>

                    {/* Crop Recommendations */}
                    <div className="grid-item full-width">
                        <div className="section-card">
                            <div className="section-header">
                                <div className="header-title">
                                    <span className="header-icon">🌾</span>
                                    <h2>Recommended Crops</h2>
                                </div>
                                <p className="header-desc">
                                    {useAI
                                        ? 'AI-generated recommendations based on your land\'s conditions'
                                        : 'Based on your land\'s soil type and climate conditions'}
                                </p>
                            </div>
                            <div className="crops-grid">
                                {recommendedCrops.map((crop, index) => (
                                    <CropCard
                                        key={crop.id || index}
                                        crop={crop}
                                        isSelected={selectedCrop?.id === crop.id}
                                        onClick={(c) => handleCropSelect(c.id)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Charts Row */}
                    <div className="grid-item">
                        <CropYieldChart crops={recommendedCrops} />
                    </div>

                    <div className="grid-item">
                        <WaterRequirementChart crops={recommendedCrops} />
                    </div>

                    {/* Nutrient Recommendations */}
                    <div className="grid-item full-width">
                        <NutrientRecommendation
                            recommendations={nutrientRecommendations}
                            crops={allCrops}
                            onCropSelect={handleCropSelect}
                        />
                    </div>

                    {/* Crop Comparison */}
                    <div className="grid-item full-width">
                        <CropComparison
                            crops={allCrops}
                            soilAnalysis={soilAnalysis}
                            useAI={useAI}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
