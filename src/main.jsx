import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom'
import WorldPrept from './app.jsx'
import DestinationPage from './DestinationPage.jsx'
import PrivacyPolicy from './PrivacyPolicy.jsx'
import TSARules from './TSARules.jsx'

// Renders the right destination page based on the URL, e.g. /pack/tokyo
function PackPage() {
  const { slug } = useParams()
  return <DestinationPage slug={slug} />
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WorldPrept />} />
        <Route path="/pack/:slug" element={<PackPage />} />
        <Route path="/tsa-rules" element={<TSARules />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
