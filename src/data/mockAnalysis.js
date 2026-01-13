// Mock AI analysis and recommendations

// Fertilizer recommendations based on nutrient deficiencies
export const fertilizerRecommendations = {
    nitrogen: {
        low: {
            fertilizer: "Urea (46-0-0)",
            amount: "120-150 kg/ha",
            application: "Split into 3 doses: basal, vegetative, flowering stage",
            alternative: "Ammonium Sulfate (21-0-0)",
            organicOption: "Composted manure or blood meal"
        },
        moderate: {
            fertilizer: "Urea (46-0-0)",
            amount: "60-80 kg/ha",
            application: "Split into 2 doses",
            alternative: "Calcium Ammonium Nitrate",
            organicOption: "Fish emulsion or alfalfa meal"
        }
    },
    phosphorus: {
        low: {
            fertilizer: "Single Super Phosphate (SSP)",
            amount: "100-125 kg/ha",
            application: "Apply as basal dose before sowing",
            alternative: "Di-ammonium Phosphate (DAP)",
            organicOption: "Bone meal or rock phosphate"
        },
        moderate: {
            fertilizer: "SSP or DAP",
            amount: "50-75 kg/ha",
            application: "Apply during land preparation",
            alternative: "Triple Super Phosphate",
            organicOption: "Composted materials"
        }
    },
    potassium: {
        low: {
            fertilizer: "Muriate of Potash (MOP)",
            amount: "80-100 kg/ha",
            application: "Apply in 2 splits: basal and before flowering",
            alternative: "Sulfate of Potash (SOP)",
            organicOption: "Wood ash or kelp meal"
        },
        moderate: {
            fertilizer: "MOP",
            amount: "40-60 kg/ha",
            application: "Single basal application",
            alternative: "Potassium Sulfate",
            organicOption: "Greensand"
        }
    },
    ph: {
        acidic: {
            treatment: "Agricultural Lime",
            amount: "2-4 tons/ha",
            application: "Apply 2-3 weeks before planting, incorporate into soil",
            note: "Raises soil pH gradually over 2-3 months"
        },
        alkaline: {
            treatment: "Elemental Sulfur",
            amount: "500-1000 kg/ha",
            application: "Apply and incorporate before planting",
            alternative: "Gypsum for high-sodium soils",
            note: "pH adjustment takes 3-6 months"
        }
    }
};

// Generate nutrient recommendations for a specific crop
export const generateCropNutrientPlan = (crop, soilAnalysis) => {
    const { nutrients } = soilAnalysis;
    const recommendations = [];

    // Check nitrogen
    if (nutrients.nitrogen.status === "Low") {
        recommendations.push({
            nutrient: "Nitrogen",
            current: nutrients.nitrogen.value,
            required: 70,
            deficit: 70 - nutrients.nitrogen.value,
            priority: "High",
            ...fertilizerRecommendations.nitrogen.low
        });
    } else if (nutrients.nitrogen.status === "Moderate") {
        recommendations.push({
            nutrient: "Nitrogen",
            current: nutrients.nitrogen.value,
            required: 70,
            deficit: 70 - nutrients.nitrogen.value,
            priority: "Medium",
            ...fertilizerRecommendations.nitrogen.moderate
        });
    }

    // Check phosphorus
    if (nutrients.phosphorus.status === "Low") {
        recommendations.push({
            nutrient: "Phosphorus",
            current: nutrients.phosphorus.value,
            required: 55,
            deficit: 55 - nutrients.phosphorus.value,
            priority: "High",
            ...fertilizerRecommendations.phosphorus.low
        });
    } else if (nutrients.phosphorus.status === "Moderate") {
        recommendations.push({
            nutrient: "Phosphorus",
            current: nutrients.phosphorus.value,
            required: 55,
            deficit: 55 - nutrients.phosphorus.value,
            priority: "Medium",
            ...fertilizerRecommendations.phosphorus.moderate
        });
    }

    // Check potassium
    if (nutrients.potassium.status === "Low") {
        recommendations.push({
            nutrient: "Potassium",
            current: nutrients.potassium.value,
            required: 60,
            deficit: 60 - nutrients.potassium.value,
            priority: "High",
            ...fertilizerRecommendations.potassium.low
        });
    } else if (nutrients.potassium.status === "Moderate") {
        recommendations.push({
            nutrient: "Potassium",
            current: nutrients.potassium.value,
            required: 60,
            deficit: 60 - nutrients.potassium.value,
            priority: "Medium",
            ...fertilizerRecommendations.potassium.moderate
        });
    }

    // Check pH
    if (nutrients.ph.status === "Acidic") {
        recommendations.push({
            nutrient: "pH Correction",
            current: nutrients.ph.value,
            required: 6.5,
            priority: "High",
            ...fertilizerRecommendations.ph.acidic
        });
    } else if (nutrients.ph.status === "Alkaline") {
        recommendations.push({
            nutrient: "pH Correction",
            current: nutrients.ph.value,
            required: 7.0,
            priority: "Medium",
            ...fertilizerRecommendations.ph.alkaline
        });
    }

    return recommendations;
};

// Compare two crops for the comparison tool
export const compareCrops = (crop1, crop2, soilAnalysis) => {
    const yieldDiff = crop1.yieldPercentage - crop2.yieldPercentage;

    // Estimate cost difference based on water and time requirements
    const waterCost = { Low: 1000, Medium: 2500, High: 4000 };
    const cost1 = waterCost[crop1.waterRequirement] || 2000;
    const cost2 = waterCost[crop2.waterRequirement] || 2000;

    // Dynamic soil impact calculation based on crop characteristics
    const calculateSoilImpact = (crop) => {
        // Calculate based on water requirement and harvest time
        const waterImpact = {
            "Low": { impact: "Minimal Impact", baseScore: 5 },
            "Medium": { impact: "Moderate Impact", baseScore: -5 },
            "High": { impact: "Significant Impact", baseScore: -15 }
        };

        const base = waterImpact[crop.waterRequirement] || waterImpact["Medium"];

        // Adjust based on crop type (legumes improve soil)
        let adjustment = 0;
        if (crop.name?.toLowerCase().includes('soy') ||
            crop.name?.toLowerCase().includes('bean') ||
            crop.name?.toLowerCase().includes('pea') ||
            crop.name?.toLowerCase().includes('lentil')) {
            adjustment = 20; // Nitrogen-fixing legumes improve soil
        }

        const finalScore = base.baseScore + adjustment;
        let impact = base.impact;

        if (finalScore > 10) impact = "Soil Enriching";
        else if (finalScore > 0) impact = "Minimal Impact";
        else if (finalScore > -10) impact = "Slight Nutrient Use";
        else impact = "Higher Nutrient Demand";

        return { impact, score: finalScore };
    };

    return {
        currentCrop: crop1,
        desiredCrop: crop2,
        yieldDifference: {
            value: yieldDiff,
            description: yieldDiff > 0
                ? `Current crop yields ${Math.abs(yieldDiff)}% more`
                : yieldDiff < 0
                    ? `Desired crop yields ${Math.abs(yieldDiff)}% more`
                    : "Both crops have similar yield potential"
        },
        costDifference: {
            current: cost1,
            desired: cost2,
            difference: cost2 - cost1,
            description: cost2 > cost1
                ? `Desired crop costs ~$${cost2 - cost1}/ha more`
                : cost2 < cost1
                    ? `Desired crop saves ~$${cost1 - cost2}/ha`
                    : "Similar cultivation costs"
        },
        recommendation: generateSwapRecommendation(crop1, crop2, soilAnalysis)
    };
};

// Generate recommendation for crop swap
const generateSwapRecommendation = (crop1, crop2, soilAnalysis) => {
    const messages = [];

    if (crop2.waterRequirement === "High" && soilAnalysis.climate.rainfall === "Low") {
        messages.push("⚠️ Warning: High water crop in low rainfall area - irrigation required");
    }

    if (crop2.yieldPercentage < 75) {
        messages.push("ℹ️ Note: This crop has moderate yield potential for this soil type");
    }

    if (crop2.name === "Soybeans") {
        messages.push("✅ Benefit: Soybeans fix nitrogen, improving soil health for future crops");
    }

    if (messages.length === 0) {
        messages.push("✅ This crop swap appears suitable for your land conditions");
    }

    return messages;
};

// Generate overall land report
export const generateLandReport = (lat, lng, soilAnalysis) => {
    return {
        coordinates: { lat, lng },
        analysisDate: new Date().toISOString(),
        overallRating: soilAnalysis.healthScore > 70 ? "Excellent" : soilAnalysis.healthScore > 50 ? "Good" : "Needs Improvement",
        summary: `Based on AI analysis, this land in the ${soilAnalysis.climate.name} zone with ${soilAnalysis.soilType.name} soil shows ${soilAnalysis.soilType.quality.toLowerCase()} agricultural potential.`,
        keyFindings: [
            `Soil Type: ${soilAnalysis.soilType.name} (${soilAnalysis.soilType.quality})`,
            `Climate: ${soilAnalysis.climate.name} with ${soilAnalysis.climate.rainfall} rainfall`,
            `Primary limiting factor: ${soilAnalysis.nutrients.nitrogen.status === "Low" ? "Nitrogen" : soilAnalysis.nutrients.phosphorus.status === "Low" ? "Phosphorus" : "None identified"}`,
            `Recommended action: ${soilAnalysis.healthScore < 60 ? "Soil amendment program recommended" : "Regular monitoring sufficient"}`
        ]
    };
};
