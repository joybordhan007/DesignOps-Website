import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { enableAdminMode, getContent, loadContent } from './content/store'
import { installTracking } from './lib/tracking'
import './index.css'

// /admin opens the dashboard (its own chunk); every other URL is the website.
const AdminApp = lazy(() => import('./admin/AdminApp'))
const isAdmin = /^\/admin(\/|$)/.test(window.location.pathname)
if (isAdmin) enableAdminMode()

loadContent().then(() => {
  if (!isAdmin) installTracking(getContent().settings.tracking)
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      {isAdmin ? (
        <Suspense fallback={null}>
          <AdminApp />
        </Suspense>
      ) : (
        <App />
      )}
    </React.StrictMode>,
  )
})
