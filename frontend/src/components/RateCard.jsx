
import React, { useState } from 'react';

const MatrimonyRates = () => {
    const [isAnnual, setIsAnnual] = useState(false);

    const plans = [
        {
            name: 'Basic Starter',
            priceMonthly: 0,
            priceAnnual: 0,
            description: 'Perfect for exploring and creating your initial presence.',
            features: [
                'Create profile with 5 photos',
                'Browse verified members',
                'Send 5 express interests / day',
                'Basic search filters',
                'Standard 90-day password reset safety'
            ],
            cta: 'Get Started Free',
            popular: false,
        },
        {
            name: 'Premium Match',
            priceMonthly: 29,
            priceAnnual: 19,
            description: 'Our most popular tier for active, serious relationship seekers.',
            features: [
                'Everything in Basic Starter',
                'View verified contact numbers',
                'Unlimited personalized messages',
                'Advanced filters (Religion, Profession)',
                'Priority profile matching metrics',
                'Dedicated relationship assistant'
            ],
            cta: 'Upgrade to Premium',
            popular: true,
        },
        {
            name: 'Elite Royal',
            priceMonthly: 79,
            priceAnnual: 59,
            description: 'Exclusive matchmaking with complete privacy controls.',
            features: [
                'Everything in Premium Match',
                'Hidden profile browsing mode',
                '1-on-1 human matchmaker sessions',
                'Background verified badge',
                'Profile highlighted at top of searches',
                'Instant WhatsApp chat matching alerts'
            ],
            cta: 'Go Elite Royal',
            popular: false,
        }
    ];

    
    return (
        <div  id="pricing-section" /* 🌟 This matches the href anchor link above */
            style={{
                fontFamily: 'Arial, sans-serif',
                backgroundColor: '#fcf9f2',
                padding: '60px 20px',
                minHeight: '100vh',
                color: '#333333'
            }}
        >
        </div>
           
    )  

    return (
        <div style={{
            fontFamily: 'Arial, sans-serif',
            backgroundColor: '#fcf9f2',
            padding: '60px 20px',
            minHeight: '100vh',
            color: '#333333'
        }}>
            {/* Header section */}
            <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                <h2 style={{ color: '#800000', fontSize: '32px', marginBottom: '10px' }}>
                    Find Your Perfect Life Partner
                </h2>
                <p style={{ color: '#666666', fontSize: '16px', marginBottom: '30px' }}>
                    Select a flexible plan crafted to help you connect safely and securely.
                </p>

                {/* Toggle Switch */}
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    backgroundColor: '#ffffff',
                    padding: '6px',
                    borderRadius: '30px',
                    border: '1px solid #d4af37',
                    cursor: 'pointer'
                }} onClick={() => setIsAnnual(!isAnnual)}>
                    <button style={{
                        padding: '10px 24px',
                        borderRadius: '20px',
                        border: 'none',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        backgroundColor: !isAnnual ? '#800000' : 'transparent',
                        color: !isAnnual ? '#ffffff' : '#800000',
                        transition: '0.3s'
                    }}>
                        Monthly
                    </button>
                    <button style={{
                        padding: '10px 24px',
                        borderRadius: '20px',
                        border: 'none',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        backgroundColor: isAnnual ? '#800000' : 'transparent',
                        color: isAnnual ? '#ffffff' : '#800000',
                        transition: '0.3s'
                    }}>
                        Annually <span style={{ fontSize: '11px', color: isAnnual ? '#fcf9f2' : '#d4af37' }}>(Save 30%)</span>
                    </button>
                </div>
            </div>

            {/* Pricing Cards Layout */}
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '30px',
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                {plans.map((plan, index) => {
                    const currentPrice = isAnnual ? plan.priceAnnual : plan.priceMonthly;

                    return (
                        <div key={index} style={{
                            backgroundColor: '#ffffff',
                            borderRadius: '12px',
                            border: plan.popular ? '2px solid #800000' : '1px solid #e0e0e0',
                            boxShadow: plan.popular ? '0 10px 30px rgba(128,0,0,0.15)' : '0 4px 15px rgba(0,0,0,0.05)',
                            padding: '40px 30px',
                            width: '320px',
                            display: 'flex',
                            flexDirection: 'column',
                            position: 'relative',
                            transform: plan.popular ? 'scale(1.03)' : 'none',
                            zIndex: plan.popular ? 2 : 1
                        }}>
                            {/* Popular Tag */}
                            {plan.popular && (
                                <span style={{
                                    position: 'absolute',
                                    top: '-15px',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    backgroundColor: '#800000',
                                    color: '#ffffff',
                                    padding: '6px 16px',
                                    borderRadius: '20px',
                                    fontSize: '12px',
                                    fontWeight: 'bold',
                                    letterSpacing: '1px',
                                    textTransform: 'uppercase'
                                }}>
                                    Most Popular
                                </span>
                            )}

                            {/* Plan Metadata */}
                            <h3 style={{ color: '#800000', margin: '0 0 10px 0', fontSize: '22px' }}>{plan.name}</h3>
                            <p style={{ color: '#777777', fontSize: '14px', minHeight: '40px', margin: '0 0 20px 0' }}>
                                {plan.description}
                            </p>

                            {/* Pricing Display */}
                            <div style={{ marginBottom: '30px', borderBottom: '1px solid #f0f0f0', paddingBottom: '20px' }}>
                                <span style={{ fontSize: '42px', fontWeight: 'bold', color: '#333333' }}>
                                    ${currentPrice}
                                </span>
                                <span style={{ color: '#888888', fontSize: '14px' }}> / month</span>
                                {isAnnual && plan.priceAnnual > 0 && (
                                    <div style={{ color: '#d4af37', fontSize: '12px', marginTop: '4px', fontWeight: 'bold' }}>
                                        Billed as ${plan.priceAnnual * 12}/year
                                    </div>
                                )}
                            </div>

                            {/* Features List */}
                            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 35px 0', flexGrow: 1 }}>
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} style={{
                                        fontSize: '14px',
                                        color: '#555555',
                                        marginBottom: '14px',
                                        display: 'flex',
                                        alignItems: 'flex-start'
                                    }}>
                                        <span style={{
                                            color: plan.popular ? '#800000' : '#d4af37',
                                            marginRight: '10px',
                                            fontWeight: 'bold'
                                        }}>✓</span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            {/* Call To Action Button */}
                            <button style={{
                                width: '100%',
                                padding: '14px',
                                borderRadius: '8px',
                                border: plan.popular ? 'none' : '2px solid #800000',
                                backgroundColor: plan.popular ? '#800000' : 'transparent',
                                color: plan.popular ? '#ffffff' : '#800000',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                outline: 'none'
                            }}
                                onMouseEnter={(e) => {
                                    if (!plan.popular) {
                                        e.currentTarget.style.backgroundColor = '#800000';
                                        e.currentTarget.style.color = '#ffffff';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!plan.popular) {
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                        e.currentTarget.style.color = '#800000';
                                    }
                                }}>
                                {plan.cta}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MatrimonyRates;
