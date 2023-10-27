import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { createRoot } from 'react-dom/client'

import './index.css'
import App from './App'

const content = (
  <Router>
    <App />
  </Router>
)

const container = document.getElementById('root')
const root = createRoot(container)

root.render(content)
