import React from 'react'

import './version.css'

export default function Version () {
  return (
    <span className='version'>
      {process.env.REACT_APP_VERSION}
    </span>
  )
}
