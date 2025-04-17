import React from 'react'
import { Link } from 'react-router-dom'
import er from "../../assets/error.png"

function Error404() {
  return (
      <>
          <div class="bg-white py-6 sm:py-8 lg:py-12">
              <div class="mx-auto max-w-screen-2xl px-4 md:px-8">
                  <h2 class="mb-4 text-center text-5xl font-bold text-[#EC4680] md:mb-6 lg:text-7xl">ERROR</h2>
                  <img src={er} alt="" class="mx-auto h-56 w-56 md:h-72 md:w-72" />
                  <p class="mx-auto mt-4 max-w-screen-md text-center text-lg text-[#EC4680] md:mt-6 md:text-xl">
                      "Oops! Something went wrong. The page you’re looking for doesn’t exist or has been moved. Try going back to the homepage or checking the URL."{" "}
                  </p>
                  <Link to="/">
                  <button class="mx-auto mt-4 block rounded-xl border border-[#EC4680] bg-[#FFF] px-8 py-4 text-sm font-semibold text-[#EC4680]  hover:bg-[#EC4680] hover:text-[#FFF] ">
                      Back
                      </button>
                  </Link>
              </div>
          </div>
      </>
  );
}

export default Error404
