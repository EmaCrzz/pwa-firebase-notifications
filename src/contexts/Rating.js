import React, { useState } from 'react'

import { analytics } from '../config/firebase'

export const RatingContext = React.createContext()

export function RatingProvider ({ children }) {
  const [userRated, setuserRated] = useState(false)

  const toggleUserRated = () => {
    setuserRated(!userRated)
  }

  const ratePositive = () => {
    analytics.logEvent('rate_site', {
      rate: 'positive'
    })
    toggleUserRated()
  }

  const rateNegative = () => {
    analytics.logEvent('rate_site', {
      rate: 'negative'
    })
    toggleUserRated()
  }

  const value = {
    userRated,
    // Modifiers
    ratePositive,
    rateNegative
  }

  return (
    <RatingContext.Provider value={value}>
        {children}
    </RatingContext.Provider>
  )
}

export default RatingContext
