import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MapSelector from '../components/MapSelector';

const LandSelectionPage = () => {
    const [selectedLocation, setSelectedLocation] = useState(null);
    const navigate = useNavigate();

    const handleLocationSelect = (lat, lng) => {
        setSelectedLocation({ lat, lng });
    };

    const handleAnalyze = () => {
        if (selectedLocation) {
            // Navigate to dashboard with coordinates
            navigate(`/dashboard?lat=${selectedLocation.lat}&lng=${selectedLocation.lng}`);
        }
    };

    return (
        <MapSelector
            onLocationSelect={handleLocationSelect}
            selectedLocation={selectedLocation}
            onAnalyze={handleAnalyze}
        />
    );
};

export default LandSelectionPage;
