import React from "react"
import Delivery from "./Delivery.jsx"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import LoginPage from "./LoginPage"
import NoPage from "./NoPage"
import EmployeesPage from "./EmployeesPage"
import MainPage from "./MainPage"
import ExpensesPage from "./Expenses.jsx"


export default function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  const [value, setValue] = React.useState(window.location.pathname.substring(1));
  const [user, setUser] = React.useState(localStorage.getItem("user") || "")

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Navigate to="/login"/>}/>
          <Route path="/login" element={<LoginPage setUser={setUser} />} />
          {user && <Route path="/orders" element={<Delivery user={user} value={value} setValue={setValue}/>} />}
          {user && <Route path="/employees" element={<EmployeesPage user={user} value={value} setValue={setValue}/>} />}
          {user && <Route path="/dashboard" element={<MainPage value={value} setValue={setValue}/>} />}
          {user && <Route path="/expenses" element={<ExpensesPage user={user} value={value} setValue={setValue}/>} />}
          <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  )
}

