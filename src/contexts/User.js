import { createContext, useState } from "react";

const UserContext = createContext({})

const UserContextProvider = ({ children }) => {
  const [ user, setUser ] = useState({})
  const [ connected, setConnected ] = useState(false)
  const [ users, setUsers ] = useState([])

  const getUsers = async () => {
    const response = await fetch('http://localhost:5000/users', {
      credentials: 'include'
    })

    const data = await response.json()

    setUsers(data)
  }

  const value = {
    user,
    setUser,
    connected, 
    setConnected,
    users,
    setUsers,
    getUsers,
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