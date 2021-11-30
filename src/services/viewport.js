import React from 'react'

const ViewportContext = React.createContext()

const ViewportProvider = ({children}) => {
  const getViewport = () => {
    let viewport = ['mp']
    if (window.innerWidth >= 568) {
      viewport.push('ml')
      if (window.innerWidth >= 768) {
        viewport.push('tp')
        if (window.innerWidth >= 1024) {
          viewport.push('tl')
          if (window.innerWidth >= 1367) {
            viewport.push('ds')
            if (window.innerWidth >= 1600) {
              viewport.push('dm')
              if (window.innerWidth >= 1920) {
                viewport.push('dl')
              }
            }
          }
        }
      }
    }
    return viewport
  }

  const [state, setState] = React.useState({
    viewport: getViewport(),
    width: window.innerWidth,
    height: window.screen.availHeight
  })

  const updateViewport = () => {
    setState(state => ({
      ...state,
      viewport: getViewport(),
      width: window.innerWidth,
      height: window.screen.availHeight
    }))
  }

  const handleResize = () => {
    let resizeTimeout
    const resizeThrottler = () => {
      if (!resizeTimeout) {
        resizeTimeout = setTimeout(() => {
          resizeTimeout = null
          actualResizeHandler()
        }, 66)
      }
    }

    window.addEventListener("resize", resizeThrottler, false)

    const actualResizeHandler = () => {
      updateViewport()
    }
  }

  React.useEffect(() => {
    handleResize()
    setTimeout(updateViewport, 100)
  }, [])

  return (
    <ViewportContext.Provider value={state}>
      {children}
    </ViewportContext.Provider>
  )
}

const useViewport = () => React.useContext(ViewportContext)

export {ViewportProvider, useViewport}
