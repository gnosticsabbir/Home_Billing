import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './firebaseConfig.jsx'
import Home from './Pages/Home/home.jsx'
import SetData from './Pages/SetData/SetData.jsx'
import Show from './Pages/SetData/show.jsx'
import Monthly from './Pages/Monthly/Monthly.jsx'
import Pdf from './Pages/Pdf/Pdf.jsx'

import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import Test from './Pages/Test/Test.jsx'
import Statement from './Pages/Statement/Statement.jsx'
import { PDFDownloadLink } from '@react-pdf/renderer'

  const router = createBrowserRouter([
    {
        path: "/",
        element: <Home></Home>
      },
    {
      path: "/setdata",
      element: <SetData></SetData>
    },
    {
        path: "/show",
        element: <Show></Show>
      },
      {
        path: "/month",
        element: <Monthly></Monthly>
      },
      {
        path: "/pdf",
        element: <Pdf></Pdf>
      },
      {
        path: "/test",
        element: <Test></Test>
      },
      {
        path: "/statement",
        element: <Statement></Statement>
      }
])

ReactDOM.createRoot(document.getElementById('root')).render(

    <RouterProvider router={router}>
      
    </RouterProvider>
  
)
