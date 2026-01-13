import Hero from '../components/Hero';
import './LandingPage.css';

const LandingPage = () => {
    return (
        <div className="landing-page">
            <Hero />

            {/* Features Section */}
            <section className="features-section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-badge">Features</span>
                        <h2>Powerful Agricultural Intelligence</h2>
                        <p>Everything you need to make informed farming decisions</p>
                    </div>

                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">🛰️</div>
                            <h3>GPS-Based Analysis</h3>
                            <p>Select any location on Earth using our interactive map or GPS coordinates for instant soil analysis.</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">🌱</div>
                            <h3>Crop Recommendations</h3>
                            <p>Get AI-powered suggestions for the best crops suited to your land's unique conditions.</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">🧪</div>
                            <h3>Soil Health Analysis</h3>
                            <p>Comprehensive nutrient level assessment including N-P-K values, pH, and organic matter.</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">💊</div>
                            <h3>Treatment Plans</h3>
                            <p>Personalized fertilizer recommendations with exact quantities and application schedules.</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">📊</div>
                            <h3>Data Visualization</h3>
                            <p>Beautiful charts and graphs to help you understand your land's potential at a glance.</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">⚖️</div>
                            <h3>Crop Comparison</h3>
                            <p>Compare different crops side by side to make the best economic and ecological choice.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="how-it-works-section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-badge">Process</span>
                        <h2>How It Works</h2>
                        <p>Three simple steps to smarter farming</p>
                    </div>

                    <div className="steps-container">
                        <div className="step">
                            <div className="step-number">01</div>
                            <div className="step-content">
                                <h3>Select Your Land</h3>
                                <p>Use our interactive map to click on any location, or enter GPS coordinates directly.</p>
                            </div>
                            <div className="step-visual">🗺️</div>
                        </div>

                        <div className="step-connector"></div>

                        <div className="step">
                            <div className="step-number">02</div>
                            <div className="step-content">
                                <h3>AI Analysis</h3>
                                <p>Our system analyzes soil composition, climate patterns, and regional agricultural data.</p>
                            </div>
                            <div className="step-visual">🤖</div>
                        </div>

                        <div className="step-connector"></div>

                        <div className="step">
                            <div className="step-number">03</div>
                            <div className="step-content">
                                <h3>Get Recommendations</h3>
                                <p>Receive detailed crop recommendations, soil health reports, and treatment plans.</p>
                            </div>
                            <div className="step-visual">📋</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="stats-section">
                <div className="container">
                    <div className="stats-grid">
                        <div className="stat-card">
                            <span className="stat-number">50M+</span>
                            <span className="stat-text">Hectares Analyzed</span>
                        </div>
                        <div className="stat-card">
                            <span className="stat-number">150+</span>
                            <span className="stat-text">Crop Types</span>
                        </div>
                        <div className="stat-card">
                            <span className="stat-number">98%</span>
                            <span className="stat-text">Accuracy Rate</span>
                        </div>
                        <div className="stat-card">
                            <span className="stat-number">25K+</span>
                            <span className="stat-text">Farmers Helped</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="landing-footer">
                <div className="container">
                    <div className="footer-content">
                        <div className="footer-brand">
                            <span className="footer-logo">🌍 GeoCrop AI</span>
                            <p>Smart AI-Powered Crop Planning using Land & GPS Data</p>
                        </div>
                        <div className="footer-links">
                            <div className="link-group">
                                <h4>Product</h4>
                                <a href="#">Features</a>
                                <a href="#">Pricing</a>
                                <a href="#">API</a>
                            </div>
                            <div className="link-group">
                                <h4>Resources</h4>
                                <a href="#">Documentation</a>
                                <a href="#">Blog</a>
                                <a href="#">Support</a>
                            </div>
                            <div className="link-group">
                                <h4>Company</h4>
                                <a href="#">About</a>
                                <a href="#">Careers</a>
                                <a href="#">Contact</a>
                            </div>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <p>© 2024 GeoCrop AI. Academic Project Demo.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
