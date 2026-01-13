// Mock crop data for GeoCrop AI
export const mockCrops = [
  {
    id: 1,
    name: "Wheat",
    image: "🌾",
    yieldPercentage: 92,
    waterRequirement: "Low",
    season: "Rabi (Winter)",
    harvestTime: "120-150 days",
    minTemp: 10,
    maxTemp: 25,
    soilType: ["Loamy", "Clay"],
    description: "Ideal for temperate climates with moderate rainfall",
    marketPrice: "$280/ton",
    profitMargin: "High"
  },
  {
    id: 2,
    name: "Rice",
    image: "🍚",
    yieldPercentage: 88,
    waterRequirement: "High",
    season: "Kharif (Monsoon)",
    harvestTime: "100-150 days",
    minTemp: 20,
    maxTemp: 35,
    soilType: ["Clay", "Alluvial"],
    description: "Requires standing water and warm temperatures",
    marketPrice: "$320/ton",
    profitMargin: "Medium"
  },
  {
    id: 3,
    name: "Corn",
    image: "🌽",
    yieldPercentage: 85,
    waterRequirement: "Medium",
    season: "Kharif/Rabi",
    harvestTime: "90-120 days",
    minTemp: 15,
    maxTemp: 30,
    soilType: ["Loamy", "Sandy Loam"],
    description: "Versatile crop for various climate conditions",
    marketPrice: "$190/ton",
    profitMargin: "Medium"
  },
  {
    id: 4,
    name: "Sugarcane",
    image: "🎋",
    yieldPercentage: 78,
    waterRequirement: "High",
    season: "Year-round",
    harvestTime: "12-18 months",
    minTemp: 20,
    maxTemp: 40,
    soilType: ["Loamy", "Alluvial"],
    description: "Long-term crop with high water needs",
    marketPrice: "$40/ton",
    profitMargin: "High"
  },
  {
    id: 5,
    name: "Cotton",
    image: "☁️",
    yieldPercentage: 72,
    waterRequirement: "Medium",
    season: "Kharif",
    harvestTime: "150-180 days",
    minTemp: 20,
    maxTemp: 35,
    soilType: ["Black Cotton", "Loamy"],
    description: "Cash crop for textile industry",
    marketPrice: "$1,800/ton",
    profitMargin: "High"
  },
  {
    id: 6,
    name: "Soybeans",
    image: "🫘",
    yieldPercentage: 82,
    waterRequirement: "Medium",
    season: "Kharif",
    harvestTime: "80-120 days",
    minTemp: 15,
    maxTemp: 30,
    soilType: ["Loamy", "Clay Loam"],
    description: "Nitrogen-fixing legume, improves soil health",
    marketPrice: "$450/ton",
    profitMargin: "Medium"
  },
  {
    id: 7,
    name: "Potatoes",
    image: "🥔",
    yieldPercentage: 90,
    waterRequirement: "Medium",
    season: "Rabi",
    harvestTime: "90-120 days",
    minTemp: 10,
    maxTemp: 25,
    soilType: ["Sandy Loam", "Loamy"],
    description: "High-yield tuber crop for cooler climates",
    marketPrice: "$250/ton",
    profitMargin: "Medium"
  },
  {
    id: 8,
    name: "Tomatoes",
    image: "🍅",
    yieldPercentage: 86,
    waterRequirement: "Medium",
    season: "Year-round",
    harvestTime: "60-90 days",
    minTemp: 15,
    maxTemp: 30,
    soilType: ["Loamy", "Sandy Loam"],
    description: "Popular vegetable for diverse dishes",
    marketPrice: "$400/ton",
    profitMargin: "High"
  }
];

// Get recommended crops based on soil and climate
export const getRecommendedCrops = (soilType, climateType) => {
  return mockCrops.filter(crop => {
    const soilMatch = crop.soilType.some(s => 
      s.toLowerCase().includes(soilType.toLowerCase()) ||
      soilType.toLowerCase().includes(s.toLowerCase())
    );
    return soilMatch;
  }).slice(0, 6);
};

// Get all crops for comparison
export const getAllCrops = () => mockCrops;

// Get crop by ID
export const getCropById = (id) => mockCrops.find(crop => crop.id === id);
