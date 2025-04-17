import React from "react";
import rev1 from '../../assets/Ellipse41.png'
import rev2 from '../../assets/Ellipse42.png'
import rev3 from '../../assets/Ellipse43.png'
import rev4 from '../../assets/Ellipse44.png'
import './CustomerReviews.css'

function CustomerReviews() {
    return (
        <>
            <section >
                <h2 className="text-3xl md:text-4xl font-bold text-center text-[#5C0A27]   ">“Customer Reviews”</h2>
                <div className="reviews-container">
                    <div className="card">
                        <div className="card-image">
                            <img src={rev3} alt="Image" />
                        </div>
                        <div className="card-content">
                            <div className="name">
                                <h2>Rehab Awad</h2>
                                <div className="rate">
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                </div>
                            </div>
                            <span>UI & UX designer</span>
                            <p>"I've tried so many skincare brands, but GlowEra is on another level! My skin feels so soft and hydrated without any irritation. Definitely my go-to brand now!"</p>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-image">
                            <img src={rev4} alt="Image" />
                        </div>
                        <div className="card-content">
                            <div className="name">
                                <h2>Dina Sameh</h2>
                                <div className="rate">
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                </div>
                            </div>
                            <span>Engineer</span>
                            <p>"A game-changer for my skincare routine! My skin feels so much healthier and brighter. Thank you, GlowEra!"</p>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-image">
                            <img src={rev1} alt="Image" />
                        </div>
                        <div className="card-content">
                            <div className="name">
                                <h2>Ahmed Elshazly</h2>
                                <div className="rate">
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                </div>
                            </div>
                            <span>Front end engineer</span>
                            <p>The packaging, the texture, the results—everything about GlowEra is just perfect. I can’t go a day without my GlowEra routine!"</p>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-image">
                            <img src={rev2} alt="Image" />
                        </div>
                        <div className="card-content">
                            <div className="name">
                                <h2>Yousef Ahmed</h2>
                                <div className="rate">
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                </div>
                            </div>
                            <span>Back end engineer</span>
                            <p>I love how GlowEra products are lightweight yet super effective. My acne-prone skin has never been this clear and radiant!"</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default CustomerReviews;
