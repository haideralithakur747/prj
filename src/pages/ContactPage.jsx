import { useState } from 'react';
import './ContactPage.css';

const ContactPage = () => {
    const [isImageExpanded, setIsImageExpanded] = useState(false);

    return (
        <div className="contact-page">
            <div className="contact-container">
                <div className="contact-header">
                    <h1>Contact <span className="gradient-text">Me</span></h1>
                    <p>Get in touch for collaboration or inquiries</p>
                </div>

                <div className="contact-content">
                    <div className="profile-section">
                        <div className="profile-image-wrapper">
                            <div
                                className="profile-image"
                                onClick={() => setIsImageExpanded(true)}
                                title="Click to expand"
                            >
                                <img
                                    src="/haider-photo.png"
                                    alt="Haider Ali Thakur"
                                />
                            </div>
                            <div className="profile-glow"></div>
                        </div>

                        <div className="profile-info">
                            <h2>Haider Ali Thakur</h2>
                            <p className="profile-title">Developer & AI Enthusiast</p>
                        </div>
                    </div>

                    <div className="contact-details">
                        <div className="contact-card">
                            <div className="contact-icon">📧</div>
                            <div className="contact-info">
                                <span className="contact-label">Email</span>
                                <a href="mailto:haideralithakur747@gmail.com" className="contact-value">
                                    haideralithakur747@gmail.com
                                </a>
                            </div>
                        </div>

                        <div className="contact-card">
                            <div className="contact-icon">🌍</div>
                            <div className="contact-info">
                                <span className="contact-label">Project</span>
                                <span className="contact-value">GeoCrop AI</span>
                            </div>
                        </div>

                        <div className="contact-card">
                            <div className="contact-icon">🎓</div>
                            <div className="contact-info">
                                <span className="contact-label">Purpose</span>
                                <span className="contact-value">Academic Project</span>
                            </div>
                        </div>
                    </div>

                    <div className="contact-cta">
                        <a
                            href="mailto:haideralithakur747@gmail.com?subject=Inquiry about GeoCrop AI"
                            className="btn btn-primary btn-large"
                        >
                            <span>✉️</span>
                            Send Me an Email
                        </a>
                    </div>
                </div>

                <div className="contact-footer">
                    <p>Built with 💚 using React & Gemini AI</p>
                </div>
            </div>

            {/* Image Lightbox Modal */}
            {isImageExpanded && (
                <div
                    className="image-lightbox"
                    onClick={() => setIsImageExpanded(false)}
                >
                    <div className="lightbox-content">
                        <img
                            src="/haider-photo.png"
                            alt="Haider Ali Thakur"
                        />
                        <button
                            className="lightbox-close"
                            onClick={() => setIsImageExpanded(false)}
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContactPage;
