// Gemini AI Service for GeoCrop AI
// Uses Google's Gemini API to generate real agricultural analysis

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

// Generate soil analysis using Gemini AI
export const generateAISoilAnalysis = async (lat, lng) => {
    const prompt = `You are an agricultural AI expert. Analyze the following GPS coordinates and provide realistic soil and climate data for farming purposes.

Location: Latitude ${lat.toFixed(4)}, Longitude ${lng.toFixed(4)}

Provide a JSON response with the following structure (respond ONLY with valid JSON, no markdown):
{
  "soilType": {
    "name": "soil type name (e.g., Loamy, Clay, Sandy, Alluvial)",
    "description": "brief description",
    "quality": "Excellent/Good/Moderate/Poor"
  },
  "climate": {
    "name": "climate type (e.g., Tropical, Subtropical, Temperate, Arid)",
    "avgTemp": average temperature in Celsius (number),
    "rainfall": "High/Moderate/Low",
    "humidity": humidity percentage (number),
    "icon": "appropriate emoji"
  },
  "nutrients": {
    "nitrogen": { "value": number 20-80, "unit": "kg/ha", "status": "Good/Moderate/Low", "optimal": "60-80 kg/ha" },
    "phosphorus": { "value": number 15-70, "unit": "kg/ha", "status": "Good/Moderate/Low", "optimal": "50-70 kg/ha" },
    "potassium": { "value": number 25-75, "unit": "kg/ha", "status": "Good/Moderate/Low", "optimal": "55-75 kg/ha" },
    "ph": { "value": number 5.0-8.5, "unit": "", "status": "Optimal/Acidic/Alkaline", "optimal": "6.0-7.5" }
  },
  "organicMatter": { "value": number 1-5, "unit": "%", "status": "Good/Moderate/Low" },
  "moisture": { "value": number 20-70, "unit": "%" },
  "healthScore": number 40-95,
  "sustainabilityScore": number 35-90,
  "region": {
    "name": "specific region name",
    "country": "country name",
    "zone": "agricultural zone description"
  }
}

Base the analysis on realistic geographical and agricultural data for the given coordinates.`;

    try {
        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: prompt }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 1024,
                }
            })
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        const text = data.candidates[0].content.parts[0].text;

        // Parse JSON from response (handle potential markdown wrapping)
        let jsonStr = text;
        if (text.includes('```json')) {
            jsonStr = text.replace(/```json\n?/g, '').replace(/```\n?/g, '');
        } else if (text.includes('```')) {
            jsonStr = text.replace(/```\n?/g, '');
        }

        const analysis = JSON.parse(jsonStr.trim());
        return { success: true, data: analysis };
    } catch (error) {
        console.error('Gemini API Error:', error);
        return { success: false, error: error.message };
    }
};

// Generate crop recommendations using Gemini AI
export const generateAICropRecommendations = async (soilType, climate, nutrients) => {
    const prompt = `You are an agricultural AI expert. Based on the following soil and climate conditions, recommend suitable crops.

Soil Type: ${soilType}
Climate: ${climate}
Soil pH: ${nutrients?.ph?.value || 6.5}
Nitrogen Level: ${nutrients?.nitrogen?.status || 'Moderate'}
Phosphorus Level: ${nutrients?.phosphorus?.status || 'Moderate'}
Potassium Level: ${nutrients?.potassium?.status || 'Moderate'}

Provide a JSON array of 6 recommended crops (respond ONLY with valid JSON, no markdown):
[
  {
    "id": 1,
    "name": "crop name",
    "image": "appropriate emoji (e.g., 🌾, 🌽, 🍚)",
    "yieldPercentage": number 60-98 (suitability percentage),
    "waterRequirement": "Low/Medium/High",
    "season": "growing season (e.g., Rabi, Kharif, Year-round)",
    "harvestTime": "duration (e.g., 90-120 days)",
    "minTemp": minimum temperature in Celsius,
    "maxTemp": maximum temperature in Celsius,
    "soilType": ["suitable soil types"],
    "description": "brief description of why this crop is suitable",
    "marketPrice": "estimated price per ton in USD",
    "profitMargin": "High/Medium/Low"
  }
]

Ensure recommendations are realistic for the given conditions. Order by suitability (highest first).`;

    try {
        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: prompt }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 2048,
                }
            })
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        const text = data.candidates[0].content.parts[0].text;

        let jsonStr = text;
        if (text.includes('```json')) {
            jsonStr = text.replace(/```json\n?/g, '').replace(/```\n?/g, '');
        } else if (text.includes('```')) {
            jsonStr = text.replace(/```\n?/g, '');
        }

        const crops = JSON.parse(jsonStr.trim());
        return { success: true, data: crops };
    } catch (error) {
        console.error('Gemini API Error:', error);
        return { success: false, error: error.message };
    }
};

// Generate fertilizer recommendations using Gemini AI
export const generateAIFertilizerPlan = async (crop, soilAnalysis) => {
    const prompt = `You are an agricultural AI expert. Generate fertilizer recommendations for growing ${crop.name} based on the following soil analysis.

Crop: ${crop.name}
Soil Type: ${soilAnalysis.soilType.name}
Current Nitrogen: ${soilAnalysis.nutrients.nitrogen.value} kg/ha (${soilAnalysis.nutrients.nitrogen.status})
Current Phosphorus: ${soilAnalysis.nutrients.phosphorus.value} kg/ha (${soilAnalysis.nutrients.phosphorus.status})
Current Potassium: ${soilAnalysis.nutrients.potassium.value} kg/ha (${soilAnalysis.nutrients.potassium.status})
Soil pH: ${soilAnalysis.nutrients.ph.value} (${soilAnalysis.nutrients.ph.status})

Provide a JSON array of fertilizer recommendations (respond ONLY with valid JSON, no markdown):
[
  {
    "nutrient": "Nitrogen/Phosphorus/Potassium/pH Correction",
    "current": current value,
    "required": required value for optimal growth,
    "deficit": difference (required - current),
    "priority": "High/Medium/Low",
    "fertilizer": "recommended fertilizer name",
    "amount": "quantity per hectare",
    "application": "application method and timing",
    "alternative": "alternative fertilizer option",
    "organicOption": "organic alternative if available"
  }
]

Only include nutrients that need improvement. If soil is well-balanced, return an empty array [].`;

    try {
        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: prompt }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 1024,
                }
            })
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        const text = data.candidates[0].content.parts[0].text;

        let jsonStr = text;
        if (text.includes('```json')) {
            jsonStr = text.replace(/```json\n?/g, '').replace(/```\n?/g, '');
        } else if (text.includes('```')) {
            jsonStr = text.replace(/```\n?/g, '');
        }

        const recommendations = JSON.parse(jsonStr.trim());
        return { success: true, data: recommendations };
    } catch (error) {
        console.error('Gemini API Error:', error);
        return { success: false, error: error.message };
    }
};

// Compare two crops using Gemini AI
export const generateAICropComparison = async (crop1, crop2, soilAnalysis) => {
    const prompt = `You are an agricultural AI expert. Compare these two crops for the given soil conditions.

Crop 1: ${crop1.name}
Crop 2: ${crop2.name}
Soil Type: ${soilAnalysis.soilType.name}
Climate: ${soilAnalysis.climate.name}

Provide a JSON comparison (respond ONLY with valid JSON, no markdown):
{
  "yieldDifference": {
    "value": number (crop1 yield % - crop2 yield %),
    "description": "explanation of yield difference"
  },
  "costDifference": {
    "current": cultivation cost for crop1 in USD/ha,
    "desired": cultivation cost for crop2 in USD/ha,
    "difference": cost difference,
    "description": "cost comparison explanation"
  },
  "soilImpact": {
    "current": { "impact": "description of crop1 impact on soil", "score": number -30 to +20 },
    "desired": { "impact": "description of crop2 impact on soil", "score": number -30 to +20 }
  },
  "recommendation": ["array of 2-3 recommendation messages with emoji prefixes like ✅, ⚠️, ℹ️"]
}`;

    try {
        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: prompt }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 1024,
                }
            })
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        const text = data.candidates[0].content.parts[0].text;

        let jsonStr = text;
        if (text.includes('```json')) {
            jsonStr = text.replace(/```json\n?/g, '').replace(/```\n?/g, '');
        } else if (text.includes('```')) {
            jsonStr = text.replace(/```\n?/g, '');
        }

        const comparison = JSON.parse(jsonStr.trim());
        comparison.currentCrop = crop1;
        comparison.desiredCrop = crop2;
        return { success: true, data: comparison };
    } catch (error) {
        console.error('Gemini API Error:', error);
        return { success: false, error: error.message };
    }
};

// Check if API key is configured
export const isGeminiConfigured = () => {
    return !!GEMINI_API_KEY && GEMINI_API_KEY !== 'undefined';
};
