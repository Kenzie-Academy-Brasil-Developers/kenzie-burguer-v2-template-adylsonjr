/* eslint-disable no-console */

import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IUserWithToken, IRegisterFormValues, ILoginFormValues, IDefaultProviderProps } from "./@Types";
import { api } from "../../services/api";

interface IUserContext{
  user: IUserWithToken | null,
  setUser: React.Dispatch<React.SetStateAction<IUserWithToken | null>>,
  registerUser: (formData: IRegisterFormValues) => Promise<void>,
  userLogin: (formData: ILoginFormValues) => Promise<void>,
  userLogout: () => Promise<void>
}


export const UserContext = createContext({} as IUserContext );


export const UserProvider = ({children}: IDefaultProviderProps)=>{

  const [user, setUser] = useState<IUserWithToken | null>(null)

  const navigate = useNavigate()


  const registerUser = async (formData: IRegisterFormValues)=>{
    try {
      const response = await api.post("/users", formData)
      setUser(response.data.user)
      localStorage.setItem("@TOKEN", response.data.accessToken)
      navigate("/shop")
    } catch (error) {
      console.log(error)
    }
  }

  const userLogin = async (formData: ILoginFormValues)=>{
    try {
      const response = await api.post("/login", formData)
      setUser(response.data.user)
      localStorage.setItem("@TOKEN", response.data.accessToken)
      navigate("/shop")
    } catch (error) {
      console.log(error)
    }
  }

  const userLogout = async ()=>{
    setUser(null)
    localStorage.removeItem("@TOKEN")
    navigate("/")
  }

  return(
    <UserContext.Provider value={{ user, setUser, registerUser, userLogin, userLogout}}>
      {children}
    </UserContext.Provider>
  )
}
