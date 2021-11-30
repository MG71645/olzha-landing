import React from 'react'
import {AppContext} from 'services/app'

import text from 'App.json'
import styles from './Sidebar.module.sass'

import Logo from 'Components/Logo'

const Sidebar = () => {
  const app = React.useContext(AppContext)
  const {language, color, border} = app.state

  const loc = obj => obj[language] || obj.ru

  return (
    <div className={styles.container} style={border ? {borderColor: border} : null}>
      <div className="header">
        <div className={styles.logo} onClick={() => app.setSlide('')} data-animation="fromLeft">
          <Logo/>
        </div>
      </div>
      <div className={styles.menu}>
        {text.slides.map(({id, link, disabled, navName}, i) => !disabled &&
          <div className={styles.link} disabled={link === app.state.slide} onClick={() => app.setSlide(link)} key={id}
               data-animation="fromLeft" data-delay={i}>
            {navName[language]}
          </div>
        )}
      </div>
      <div className={styles.footer} data-animation="fromLeft">
        © {(new Date).getFullYear()} {loc(text.copyright)}
      </div>
    </div>
  )
}

export default Sidebar
