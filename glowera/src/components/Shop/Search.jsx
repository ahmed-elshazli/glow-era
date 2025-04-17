import React from 'react'
import { FaSearch } from 'react-icons/fa'

function Search() {
  return (
      <>
          <form>
              <label for="search" class="mb-2 text-sm font-medium text-[#F0759E] sr-only bg-[#FCE8EF] ">
                  Search
              </label>
              <div class="relative p-50 pb-30">
                  <div class="absolute pt-20 inset-y-0 start-50 flex items-center ps-3 pointer-events-none">
                      <svg class="w-4 h-4 text-[#F0759E] " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                      </svg>
                  </div>
                  <input
                      type="search"
                      id="search"
                      class="block w-full p-4 ps-10 text-sm text-[#F0759E] border border-[#F0759E] rounded-lg bg-[#FCE8EF] focus:outline-[#f06392] "
                      placeholder="search about anything"
                      required
                  />
              </div>
          </form>
      </>
  );
}

export default Search
