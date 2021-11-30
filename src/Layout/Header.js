import React from 'react'
import {AppContext} from 'services/app'

import text from 'App.json'
import styles from './Header.module.sass'

import Logo from 'Components/Logo'
import Socials from 'Layout/Socials'
import Language from 'Layout/Language'

const Header = () => {
  const app = React.useContext(AppContext)
  const {language} = app.state

  const loc = obj => (obj[language] || obj.ru)

  const handleLink = link => {
    app.setSlide(link)
    setTimeout(() => app.update({menu: false}), 200)
  }

  return <>
    {app.state.menu &&
      <div className={styles.background}/>
    }
    <div className={styles.container} data-menu={app.state.menu}>
      <div className={styles.logo} onClick={() => handleLink('')} data-animation="fromTop">
        <Logo/>
      </div>
      <div className={styles.toggler} onClick={app.toggleMenu} data-animation="fromTop">
        {app.state.menu ? '✕' : '•••'}
      </div>
      {app.state.menu &&
        <div className={styles.menu}>
          {text.slides.map(({disabled, link, navName}, i) => !disabled &&
            <div className={styles.link} key={navName.ru} data-animation="fromBottom" data-delay={i}
               disabled={link === app.state.slide} onClick={() => handleLink(link)}>
              {loc(navName)}
            </div>
          )}
          <Socials/>
          <Language/>
          <div className={styles.copyright}>© {(new Date()).getFullYear()} {loc(text.copyright)}</div>
        </div>
      }
    </div>
  </>
}

export default Header
