import React from 'react'

export default function PropertyList() {
  return (
    <div>
       <div className="flex flex-col items-center border text-white justify-center h-screen bg-black">
        <div
              className="top-[150px] -left-8.5 absolute -rotate-90 z-1
                  before:content-[''] before:absolute before:-left-20 before:top-1/2 
                  before:w-20 before:h-[2px] before:bg-white before:-translate-y-1/2"
            >
              P R O P E R T I E S
            </div>
            <div className="w-[2%] rounded-4xl h-[4%] bg-amber-600 top-[210px] left-4 absolute"></div>
      </div>
    </div>
  )
}
