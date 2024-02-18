import React, { createContext } from 'react'

export const AuthContext=createContext()

const ContextAuth = ({children}) => {

    
  return (
   <AuthContext.Provider>
  {children}
   </AuthContext.Provider>
  )
}

export default ContextAuth;
