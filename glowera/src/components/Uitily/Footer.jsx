import React from "react";

function Footer() {
    return (
        <div className="bg-[#FCE8EF] pt-4 sm:pt-10 lg:pt-12 w-full">
            <footer className="mx-auto max-w-screen-2xl px-4 md:px-8">
                <div className="mb-16 grid grid-cols-2 gap-6 sm:gap-8 md:gap-12 pt-10 md:grid-cols-4 lg:grid-cols-6">
                    <div className="col-span-full lg:col-span-2">
                        <div className="mb-4 lg:-mt-2">
                            <a href="/" className="inline-flex items-center gap-2 text-xl font-bold text-black md:text-2xl" aria-label="logo">
                                Glow Era
                            </a>
                        </div>
                        <p className="mb-4 text-[#B8144B] sm:pr-8">Follow Us</p>
                        <div className="flex gap-4">
                            <a href="#" target="_blank" className="text-black text-2xl hover:text-gray-500">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="#" target="_blank" className="text-black text-2xl hover:text-gray-500">
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a href="#" target="_blank" className="text-black text-xl hover:text-gray-500">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                        </div>
                    </div>

                    {/** Navigation Sections **/}
                    {[
                        { title: "Products", links: ["Sensitive", "Combination", "Dry", "Oily"] },
                        { title: "Guides", links: [ "Vision", "Q&A"] },
                        // { title: "Service", links: ["About Concierge", "Online Consultation", "Market"] },
                        { title: "Contact", links: ["Contact Us"] },
                    ].map((section, index) => (
                        <div key={index}>
                            <div className="mb-4 font-bold uppercase tracking-widest text-gray-800">{section.title}</div>
                            <nav className="flex flex-col gap-4">
                                {section.links.map((link, idx) => (
                                    <a key={idx} href="#" className="text-[#170309] hover:text-gray-600">
                                        {link}
                                    </a>
                                ))}
                            </nav>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col items-center text-center text-sm text-[#B8144B] py-6 border-t border-gray-300 sm:flex-row sm:justify-between">
                    <span>GlowEra. 2025 KINS All rights reserved.</span>
                    <ul className="flex flex-wrap justify-center gap-4 mt-4 sm:mt-0">
                        {["Company Profile", "Privacy Policy", "Cancellation Policy", "Terms of Service", "Refund/Return Policy"].map((item, idx) => (
                            <li key={idx}>
                                <a href="#" className="text-[#B8144B] hover:text-[#170309]">
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </footer>
        </div>
    );
}

export default Footer;
