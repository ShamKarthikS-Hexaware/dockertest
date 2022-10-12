import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'

const HumanList = Loadable(lazy(() => import('./HumanList')))
const EditHuman = Loadable(lazy(() => import('./EditHuman')))
const AddHuman = Loadable(lazy(() => import('./AddHuman')))

const humanRoutes = [
    {
        path: '/human',
        element: <HumanList />,
    },
    {
        path: '/human/edit/:id',
        element: <EditHuman />,
    },
    {
        path: '/human/add',
        element: <AddHuman />,
    },
]

export default humanRoutes
