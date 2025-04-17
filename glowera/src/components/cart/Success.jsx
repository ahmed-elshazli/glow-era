import React from "react";
import process from "../../assets/successProcess.png";
import success from "../../assets/success.png";
import vector from "../../assets/successVector.png";
import { Link } from "react-router-dom";



function Success() {
    return (
        <div className="container h-screen mx-auto bg-[#FCE4EC] p-6 pt-20">
            {/* Progress Indicator */}
            <div className="flex justify-center mb-6">
                <img src={process} alt="Progress" className="w-full max-w-sm" />
            </div>
            <div className="flex justify-center mb-6">
                <img src={success} alt="Progress" className="w-30 max-w-sm" />
            </div>
            <div>
                <h2 className="text-5xl text-[#5C0A25] text-center">Order Successfully placed</h2>
                <p className="text-[#5C0A25] text-center">
                    Your payment was succesfully,Just wait your <br></br>skincare arrive at home
                </p>
            </div>
            <div className="flex justify-center mb-6">
                <img src={vector} alt="Progress" className="w-80 max-w-sm" />
            </div>
            <div className="flex justify-center gap-4 mt-8">
                <Link to='/'><button className="px-6 py-3 border border-[#EC4680] text-[#EC4680] rounded-lg hover:bg-[#EC4680] hover:text-white transition text-center">Back to home</button></Link>
                <Link to='/shop'><button className="px-4 py-3 bg-[#EC4680] text-white rounded-lg hover:bg-white hover:text-[#EC4680] border border-transparent hover:border-[#EC4680] transition text-center">
                    Continue shopping
                </button></Link>
            </div>
        </div>
    );
}

export default Success;
