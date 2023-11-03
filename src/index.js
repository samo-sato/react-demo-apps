import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'

import './index.css'
import App from './App'

// const baseName = '/react-demo-apps'
const baseName = ''
const content = (
  <BrowserRouter basename={baseName}>
    <App />
  </BrowserRouter>
)

const container = document.getElementById('root')
const root = createRoot(container)

root.render(content)
