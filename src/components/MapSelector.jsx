import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './MapSelector.css';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Custom marker icon
const customIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// Map click handler component
const MapClickHandler = ({ onLocationSelect }) => {
    useMapEvents({
        click: (e) => {
            onLocationSelect(e.latlng.lat, e.latlng.lng);
        }
    });
    return null;
};

// Map center updater component
const MapCenterUpdater = ({ center }) => {
    const map = useMap();
    useEffect(() => {
        if (center) {
            map.flyTo(center, 10, { duration: 1.5 });
        }
    }, [center, map]);
    return null;
};

const MapSelector = ({ onLocationSelect, selectedLocation, onAnalyze }) => {
    const [inputLat, setInputLat] = useState('');
    const [inputLng, setInputLng] = useState('');
    const [mapCenter, setMapCenter] = useState([20, 78]); // Default to India center
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const handleCoordinateSubmit = (e) => {
        e.preventDefault();
        const lat = parseFloat(inputLat);
        const lng = parseFloat(inputLng);

        if (!isNaN(lat) && !isNaN(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
            onLocationSelect(lat, lng);
            setMapCenter([lat, lng]);
        }
    };

    const handleAnalyzeClick = async () => {
        if (selectedLocation) {
            setIsAnalyzing(true);
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1500));
            setIsAnalyzing(false);
            onAnalyze();
        }
    };

    const handleMapLocationSelect = (lat, lng) => {
        onLocationSelect(lat, lng);
        setInputLat(lat.toFixed(6));
        setInputLng(lng.toFixed(6));
    };

    // Quick location presets
    const presets = [
        { name: "Punjab, India", lat: 30.9010, lng: 75.8573 },
        { name: "California, USA", lat: 36.7783, lng: -119.4179 },
        { name: "São Paulo, Brazil", lat: -23.5505, lng: -46.6333 },
        { name: "Queensland, Australia", lat: -20.9176, lng: 142.7028 },
    ];

    return (
        <div className="map-selector">
            <div className="map-sidebar">
                <div className="sidebar-header">
                    <h2>📍 Select Location</h2>
                    <p>Click on the map or enter GPS coordinates</p>
                </div>

                <form className="coordinate-form" onSubmit={handleCoordinateSubmit}>
                    <div className="form-group">
                        <label htmlFor="latitude">Latitude</label>
                        <input
                            type="number"
                            id="latitude"
                            value={inputLat}
                            onChange={(e) => setInputLat(e.target.value)}
                            placeholder="-90 to 90"
                            step="any"
                            min="-90"
                            max="90"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="longitude">Longitude</label>
                        <input
                            type="number"
                            id="longitude"
                            value={inputLng}
                            onChange={(e) => setInputLng(e.target.value)}
                            placeholder="-180 to 180"
                            step="any"
                            min="-180"
                            max="180"
                        />
                    </div>

                    <button type="submit" className="btn btn-secondary locate-btn">
                        <span>🎯</span> Locate on Map
                    </button>
                </form>

                <div className="quick-presets">
                    <h3>Quick Locations</h3>
                    <div className="preset-buttons">
                        {presets.map((preset, index) => (
                            <button
                                key={index}
                                className="preset-btn"
                                onClick={() => {
                                    onLocationSelect(preset.lat, preset.lng);
                                    setInputLat(preset.lat.toString());
                                    setInputLng(preset.lng.toString());
                                    setMapCenter([preset.lat, preset.lng]);
                                }}
                            >
                                {preset.name}
                            </button>
                        ))}
                    </div>
                </div>

                {selectedLocation && (
                    <div className="selected-location-info">
                        <h3>📌 Selected Location</h3>
                        <div className="location-details">
                            <div className="detail-row">
                                <span className="detail-label">Latitude</span>
                                <span className="detail-value">{selectedLocation.lat.toFixed(6)}°</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">Longitude</span>
                                <span className="detail-value">{selectedLocation.lng.toFixed(6)}°</span>
                            </div>
                        </div>

                        <button
                            className={`btn btn-primary analyze-btn ${isAnalyzing ? 'loading' : ''}`}
                            onClick={handleAnalyzeClick}
                            disabled={isAnalyzing}
                        >
                            {isAnalyzing ? (
                                <>
                                    <span className="spinner"></span>
                                    Analyzing...
                                </>
                            ) : (
                                <>
                                    <span>🔬</span>
                                    Analyze This Land
                                </>
                            )}
                        </button>
                    </div>
                )}
            </div>

            <div className="map-container">
                <MapContainer
                    center={mapCenter}
                    zoom={5}
                    className="leaflet-map"
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <MapClickHandler onLocationSelect={handleMapLocationSelect} />
                    <MapCenterUpdater center={selectedLocation ? [selectedLocation.lat, selectedLocation.lng] : null} />

                    {selectedLocation && (
                        <Marker
                            position={[selectedLocation.lat, selectedLocation.lng]}
                            icon={customIcon}
                        />
                    )}
                </MapContainer>

                <div className="map-overlay-info">
                    <span>🖱️ Click anywhere on the map to select a location</span>
                </div>
            </div>
        </div>
    );
};

export default MapSelector;
