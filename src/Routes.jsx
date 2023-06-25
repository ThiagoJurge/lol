import React from 'react'
import { Route, Routes } from 'react-router-dom'
import BusSelect from './components/BusSelect/BusSelect'
import NotFound from './components/NotFound/NotFound'
import BusInfo from './components/BusInfo/BusInfo'
import BusLocation from './components/BusLocation/BusLocation'

const AppRoutes = () => {
  return (
    
    <Routes>
        <Route path='/' element={<BusSelect/>}/>
        <Route path='/viewbus/:id/:name/:variant' element={<BusInfo/>}/>
        <Route path='/locationbus/:id/:variant' element={<BusLocation/>}/>
        <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes