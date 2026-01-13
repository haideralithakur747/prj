// Mock soil data generator for GeoCrop AI

// Soil types with their characteristics
const soilTypes = {
    loamy: {
        name: "Loamy",
        description: "Well-balanced soil with good drainage and nutrients",
        color: "#8B6914",
        quality: "Excellent"
    },
    clay: {
        name: "Clay",
        description: "Heavy soil that retains water, rich in nutrients",
        color: "#964B00",
        quality: "Good"
    },
    sandy: {
        name: "Sandy",
        description: "Light soil with good drainage but low nutrient retention",
        color: "#C2B280",
        quality: "Moderate"
    },
    alluvial: {
        name: "Alluvial",
        description: "Fertile soil deposited by rivers, excellent for farming",
        color: "#A0522D",
        quality: "Excellent"
    },
    black: {
        name: "Black Cotton",
        description: "Rich in clay minerals, excellent for cotton cultivation",
        color: "#2F2F2F",
        quality: "Good"
    },
    red: {
        name: "Red Laterite",
        description: "Iron-rich soil, good for certain crops with fertilization",
        color: "#CB4154",
        quality: "Moderate"
    }
};

// Climate types
const climateTypes = {
    tropical: {
        name: "Tropical",
        avgTemp: 28,
        rainfall: "High",
        humidity: 75,
        icon: "🌴"
    },
    subtropical: {
        name: "Subtropical",
        avgTemp: 24,
        rainfall: "Moderate",
        humidity: 65,
        icon: "🌿"
    },
    temperate: {
        name: "Temperate",
        avgTemp: 18,
        rainfall: "Moderate",
        humidity: 55,
        icon: "🌲"
    },
    arid: {
        name: "Arid",
        avgTemp: 32,
        rainfall: "Low",
        humidity: 25,
        icon: "🏜️"
    },
    semiarid: {
        name: "Semi-Arid",
        avgTemp: 26,
        rainfall: "Low-Moderate",
        humidity: 40,
        icon: "🌵"
    }
};

// Generate soil analysis based on coordinates
export const generateSoilAnalysis = (lat, lng) => {
    // Use coordinates to generate deterministic but varied data
    const seed = Math.abs(lat * 1000 + lng * 100) % 100;

    // Determine soil type based on "location"
    const soilTypeKeys = Object.keys(soilTypes);
    const soilKey = soilTypeKeys[Math.floor(seed % soilTypeKeys.length)];
    const soilType = soilTypes[soilKey];

    // Determine climate based on latitude
    let climateKey;
    const absLat = Math.abs(lat);
    if (absLat < 15) climateKey = 'tropical';
    else if (absLat < 25) climateKey = 'subtropical';
    else if (absLat < 35) climateKey = 'temperate';
    else if (absLat < 45) climateKey = 'semiarid';
    else climateKey = 'arid';

    const climate = climateTypes[climateKey];

    // Generate nutrient levels (somewhat random but consistent for same location)
    const baseNitrogen = 30 + (seed % 50);
    const basePhosphorus = 20 + ((seed * 7) % 55);
    const basePotassium = 35 + ((seed * 13) % 45);
    const basePH = 5.5 + ((seed % 30) / 10);

    return {
        soilType,
        climate,
        nutrients: {
            nitrogen: {
                value: baseNitrogen,
                unit: "kg/ha",
                status: baseNitrogen > 60 ? "Good" : baseNitrogen > 40 ? "Moderate" : "Low",
                optimal: "60-80 kg/ha"
            },
            phosphorus: {
                value: basePhosphorus,
                unit: "kg/ha",
                status: basePhosphorus > 50 ? "Good" : basePhosphorus > 30 ? "Moderate" : "Low",
                optimal: "50-70 kg/ha"
            },
            potassium: {
                value: basePotassium,
                unit: "kg/ha",
                status: basePotassium > 55 ? "Good" : basePotassium > 35 ? "Moderate" : "Low",
                optimal: "55-75 kg/ha"
            },
            ph: {
                value: parseFloat(basePH.toFixed(1)),
                unit: "",
                status: basePH >= 6 && basePH <= 7.5 ? "Optimal" : basePH < 6 ? "Acidic" : "Alkaline",
                optimal: "6.0-7.5"
            }
        },
        organicMatter: {
            value: parseFloat((1.5 + (seed % 30) / 10).toFixed(1)),
            unit: "%",
            status: "Moderate"
        },
        moisture: {
            value: 35 + (seed % 30),
            unit: "%"
        },
        healthScore: Math.min(95, 55 + (seed % 40)),
        sustainabilityScore: Math.min(90, 50 + (seed % 40))
    };
};

// Get region name from coordinates (mock reverse geocoding)
export const getRegionFromCoords = (lat, lng) => {
    // Mock region names based on general location
    const regions = [
        { name: "Punjab Plains", country: "India", zone: "Northern Agricultural Zone" },
        { name: "Deccan Plateau", country: "India", zone: "Central Agricultural Zone" },
        { name: "Gangetic Basin", country: "India", zone: "Eastern Agricultural Zone" },
        { name: "Coastal Region", country: "India", zone: "Western Agricultural Zone" },
        { name: "Delta Region", country: "Bangladesh", zone: "Southern Agricultural Zone" },
        { name: "Highland Zone", country: "Nepal", zone: "Mountain Agricultural Zone" }
    ];

    const index = Math.abs(Math.floor(lat + lng)) % regions.length;
    return regions[index];
};

export { soilTypes, climateTypes };
