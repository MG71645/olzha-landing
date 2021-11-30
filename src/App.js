import React from 'react'
import Swipe from 'react-easy-swipe'
import Wheel from 'react-scroll-wheel-handler'
import {ViewportProvider, useViewport} from 'services/viewport'
import {AppContext, AppProvider} from 'services/app'

import './App.sass'

import Header from 'Layout/Header'
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
import Preloader from 'Layout/Preloader'

// const Lethargy = require("exports-loader?this.Lethargy!lethargy/lethargy")

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
  const {loading, slide, theme, animation, menu} = app.state
  const {viewport, width, height} = useViewport()

  const handleWheel = e => {
    if (!loading && !animation) {
      if (e.deltaY > 0) return app.next()
      if (e.deltaY < 0) return app.prev()
    }
  }

  const handleSwipeUp = () => {
    if (!loading && !animation) app.next()
  }

  const handleSwipeDown = () => {
    if (!loading && !animation) app.prev()
  }

  return <>
    {!app.state.loading &&
      <div className="App" data-theme={theme} data-animation={animation} data-loading={loading} data-menu={menu}
           style={{'--width': width, '--height': height}}>
        <Wheel upHandler={app.prev} downHandler={app.next} disableSwipe={true}>
          <Swipe onSwipeUp={app.next} onSwipeDown={app.prev} tolerance={100}>
            {slides[slide || 'home']}
          </Swipe>
          <Header/>
          {viewport.includes('ml') && <>
            <Sidebar/>
            <Language/>
            <Socials/>
          </>}
        </Wheel>
      </div>
    }
    <Preloader/>
  </>
}

const Providers = () =>
  <ViewportProvider>
    <AppProvider>
      <App/>
    </AppProvider>
  </ViewportProvider>

export default Providers
