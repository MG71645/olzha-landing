import React from 'react'
import {AppContext, AppProvider} from 'services/app'

import './App.sass'

import Sidebar from 'Layout/Sidebar'
import Language from 'Layout/Language'
import Socials from 'Layout/Socials'

import Home from 'App/Home'
import Company from 'App/Company'
import Structure from 'App/Structure'
import Indicators from 'App/Indicators'
import Crops from 'App/Crops'
import Animals from 'App/Animals'
import Trading from 'App/Trading'
import Contacts from 'App/Contacts'

const slides = {
  home: <Home/>,
  company: <Company/>,
  structure: <Structure/>,
  indicators: <Indicators/>,
  crops: <Crops/>,
  animals: <Animals/>,
  trading: <Trading/>,
  contacts: <Contacts/>
}

const App = () => {
  const app = React.useContext(AppContext)
  const {slide, theme, background} = app.state

  const handleWheel = e => {
    // if (!app.state.animating) {
    //   if (e.deltaY > 0) return app.next()
    //   if (e.deltaY < 0) return app.prev()
    // }
  }

  return <>
    <div className="background">
      <video autoPlay muted loop className="video">
        <source src="/video/background.mp4" type="video/mp4"/>
      </video>
    </div>
    <div className="App" onWheel={handleWheel} style={background ? {background} : null} data-theme={theme}>
      {slides[slide || 'home']}
      <Sidebar/>
      <Language/>
      <Socials/>
    </div>
  </>
}

const Providers = () =>
  <AppProvider>
    <App/>
  </AppProvider>

export default Providers
