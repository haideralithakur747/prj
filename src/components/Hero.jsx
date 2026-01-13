import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero">
            <div className="hero-background">
                <div className="hero-gradient"></div>
                <div className="hero-grid"></div>
                <div className="hero-particles">
                    {[...Array(20)].map((_, i) => (
                        <div key={i} className="particle" style={{
                            '--delay': `${i * 0.5}s`,
                            '--x': `${Math.random() * 100}%`,
                            '--duration': `${15 + Math.random() * 10}s`
                        }}></div>
                    ))}
                </div>
            </div>

            <div className="hero-content">
                <div className="hero-badge animate-fade-in">
                    <span className="badge-icon">🛰️</span>
                    <span>AI-Powered Agricultural Intelligence</span>
                </div>

                <h1 className="hero-title animate-fade-in" style={{ animationDelay: '0.2s' }}>
                    <span className="title-geo">Geo</span>
                    <span className="title-crop">Crop</span>
                    <span className="title-ai">AI</span>
                </h1>

                <p className="hero-subtitle animate-fade-in" style={{ animationDelay: '0.4s' }}>
                    Smart AI-Powered Crop Planning using Land & GPS Data
                </p>

                <p className="hero-description animate-fade-in" style={{ animationDelay: '0.6s' }}>
                    Analyze any piece of land instantly. Get personalized crop recommendations,
                    soil health insights, and fertilizer guidance powered by advanced AI technology.
                </p>

                <div className="hero-actions animate-fade-in" style={{ animationDelay: '0.8s' }}>
                    <Link to="/analyze" className="btn btn-primary btn-large hero-cta">
                        <span>🗺️</span>
                        Analyze My Land
                    </Link>
                    <Link to="/dashboard" className="btn btn-secondary btn-large">
                        View Demo Dashboard
                    </Link>
                </div>

                <div className="hero-stats animate-fade-in" style={{ animationDelay: '1s' }}>
                    <div className="stat-item">
                        <span className="stat-value">50M+</span>
                        <span className="stat-label">Hectares Analyzed</span>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-item">
                        <span className="stat-value">98%</span>
                        <span className="stat-label">Accuracy Rate</span>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-item">
                        <span className="stat-value">150+</span>
                        <span className="stat-label">Crop Types</span>
                    </div>
                </div>
            </div>

            <div className="hero-visual animate-fade-in" style={{ animationDelay: '0.5s' }}>
                <div className="visual-globe">
                    <div className="globe-ring ring-1"></div>
                    <div className="globe-ring ring-2"></div>
                    <div className="globe-ring ring-3"></div>
                    <div className="globe-core">
                        <span>🌍</span>
                    </div>
                    <div className="data-point point-1">
                        <span>🌾</span>
                    </div>
                    <div className="data-point point-2">
                        <span>📊</span>
                    </div>
                    <div className="data-point point-3">
                        <span>🌱</span>
                    </div>
                </div>
            </div>

            <div className="scroll-indicator">
                <div className="scroll-mouse">
                    <div className="scroll-wheel"></div>
                </div>
                <span>Scroll to explore</span>
            </div>
        </section>
    );
};

export default Hero;
