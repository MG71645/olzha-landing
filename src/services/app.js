import React from 'react'
import {BrowserRouter, Routes, Route, useNavigate, useParams} from 'react-router-dom'
import text from 'App.json'

const AppContext = React.createContext()

const Provider = ({language, children}) => {
  const navigate = useNavigate()
  const {slide = ''} = useParams()

  const [state, set] = React.useState({
    language: 'ru',
    slide: '',
    animating: false
  })

  const update = u => set(s => ({...s, ...u}))

  const setLanguage = lg => {
    if (!state.animating) navigate(`${lg === 'en' ? '/en' : ''}/${slide}`)
  }

  const goto = path => {
    if (!state.animating) {
      update({animating: true})
      navigate((language === 'ru' ? '' : `/${language}`) + path)
      setTimeout(() => update({animating: false}), 200)
    }
  }

  const setSlide = slide => {
    goto(`/${slide}`)
  }

  const next = () => {
    const index = text.slides.findIndex(({link}) => link === state.slide)
    if (index < text.slides.length - 1) goto(`/${text.slides[index + 1].link}`)
  }

  const prev = () => {
    const index = text.slides.findIndex(({link}) => link === state.slide)
    if (index > 0) goto(`/${text.slides[index - 1].link}`)
  }

  React.useEffect(() => {
    update({language})
  }, [language])

  React.useEffect(() => {
    const index = text.slides.findIndex(({link}) => link === slide)
    const {theme, background, color, activeColor, border} = text.slides[index]
    update({slide, index, theme, background, color, activeColor, border})
  }, [slide])

  return (
    <AppContext.Provider value={{state, setLanguage, setSlide, next, prev}}>
      {children}
    </AppContext.Provider>
  )
}

const AppProvider = props =>
  <BrowserRouter>
    <Routes>
      <Route path="/en" element={<Provider language="en" {...props}/>}/>
      <Route path="/en/:slide" element={<Provider language="en" {...props}/>}/>
      <Route path="/" element={<Provider language="ru" {...props}/>}/>
      <Route path="/:slide" element={<Provider language="ru" {...props}/>}/>
    </Routes>
  </BrowserRouter>

export {AppProvider, AppContext}
