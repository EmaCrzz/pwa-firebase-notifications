import React, { useState } from 'react'

export const RatingContext = React.createContext()

export function RatingProvider ({ children }) {
  const [userRated, setuserRated] = useState(false)

  const toggleUserRated = () => {
    setuserRated(!userRated)
  }

  const value = {
    userRated,
    // Modifiers
    toggleUserRated
  }

  return (
    <RatingContext.Provider value={value}>
        {children}
    </RatingContext.Provider>
  )
}

export default RatingContext
