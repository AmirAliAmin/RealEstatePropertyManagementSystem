import React from 'react'
import Navbar from './Navbar'

export default function layout({children}) {
  return (
    <div>
      <Navbar/>
      <div>{children}</div>
    </div>
  )
}
