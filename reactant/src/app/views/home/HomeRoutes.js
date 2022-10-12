import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'

const Home = Loadable(lazy(() => import('./Home')))

const employeeRoutes = [
    {
        path: '/home',
        element: < Home/>,
    },
  
]

export default employeeRoutes
