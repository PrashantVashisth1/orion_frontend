// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.tsx'
// import { ToastProvider } from "@/components/ui/toast";

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <ToastProvider>
//       <App />
//     </ToastProvider>
//   </StrictMode>,
// )


// 1. Updated main.tsx - Remove ToastProvider import
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)