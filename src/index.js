import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'

import './index.css'
import App from './App'

// process.env.REACT_APP_RDA_base_path
const basePath = process.env.REACT_APP_BASE_PATH
const content = (
  <BrowserRouter basename={basePath}>
    <App />
  </BrowserRouter>
)

const container = document.getElementById('root')
const root = createRoot(container)

root.render(content)
