import React from 'react'
import ClassifiedPanel from './components/ClassifiedPanel'
import DashboardPage from './components/DashboardPage'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'

function Home() {
  return (
<>
<Navbar/>
<HeroSection/>
<DashboardPage/>
</>
  )
}

export default Home