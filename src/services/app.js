import React from 'react'
import {BrowserRouter, Routes, Route, useNavigate, useParams} from 'react-router-dom'
import text from 'App.json'

const AppContext = React.createContext()

const Provider = ({language, children}) => {
  const navigate = useNavigate()
  const {slide = ''} = useParams()

  const [state, set] = React.useState({
    loading: true,
    language,
    slide,
    index: text.slides.findIndex(({link}) => link === slide),
    animation: null,
    menu: false
  })

  const overscroll = React.useRef(true)

  const update = u => set(s => ({...s, ...u}))

  const setLanguage = lg => {
    if (!state.animation) navigate(`${lg === 'en' ? '/en' : ''}/${slide}`)
  }

  const goto = path => {
    if (overscroll.current) {
      update({animation: 'in'})
      overscroll.current = false
      navigate((language === 'ru' ? '' : `/${language}`) + path)
      setTimeout(() => overscroll.current = true, 100)
      setTimeout(() => update({animation: null}), 1500)
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

  const toggleMenu = () => set(s => ({...s, menu: !s.menu}))

  React.useEffect(() => {
    update({language})
  }, [language])

  React.useEffect(() => {
    const index = text.slides.findIndex(({link}) => link === slide)
    const {theme, border} = text.slides[index]
    update({slide, index, theme, border})
  }, [slide])

  return (
    <AppContext.Provider value={{state, update, setLanguage, setSlide, next, prev, toggleMenu}}>
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
