import React from 'react'
import PropertyCard from './PropertyCard'

export default function PropertySection() {
  return (
    <div>
        <div className="flex flex-col border text-white bg-black">
        <div
              className="top-[660px] -left-8.5 absolute -rotate-90 z-1
                  before:content-[''] before:absolute before:-left-20 before:top-1/2 
                  before:w-20 before:h-[2px] before:bg-white before:-translate-y-1/2"
            >
              P R O P E R T I E S
            </div>
            <div className="w-[2%] rounded-4xl h-[4%] bg-amber-600 top-[720px] left-4 absolute"></div>
            <div className='mx-20'>
                <div className=' mt-10 w-[25%] font-bold'>
                    <h1>Discover the latest properties available today in Pakistan </h1>
                </div>
                <div className='flex border'>
                    <PropertyCard/>
                </div>
            </div>
      </div>
      
    </div>
  )
}
