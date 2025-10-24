// src/App.jsx
import React from 'react'
import { Outlet } from 'react-router-dom'

function App() {
  // This is your layout wrapper — it will render the child route (Login, Signup, etc.)
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Outlet />
    </div>
  )
}

export default App
