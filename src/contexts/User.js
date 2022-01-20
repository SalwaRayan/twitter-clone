import { createContext, useState } from "react";

const UserContext = createContext({})

const UserContextProvider = ({ children }) => {
  const [ user, setUser ] = useState({})
  const [ connected, setConnected ] = useState(false)

  const value = {
    user,
    setUser,
    connected, 
    setConnected
  }

  return (
    <UserContext.Provider value={value} >
      {children}
    </UserContext.Provider>
  )
}

export {
  UserContext,
  UserContextProvider
}