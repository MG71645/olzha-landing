import React from 'react'
import {AppContext} from 'services/app'
import text from 'App.json'

import styles from './Sidebar.module.sass'

import Logo from 'Components/Logo'

const Sidebar = () => {
  const app = React.useContext(AppContext)
  const {language, color, activeColor, border} = app.state

  return (
    <div className={styles.container} style={border ? {borderColor: border} : null}>
      <div className="header">
        <div className={styles.logo} onClick={() => app.setSlide('')}>
          <Logo/>
        </div>
      </div>
      <div className={styles.menu} style={color ? {color, ['--color']: color} : null}>
        {text.slides.map(({id, link, disabled, navName}) => !disabled &&
          <div className={styles.link} disabled={link === app.state.slide}
               style={link === app.state.slide ? {['--activeColor']: activeColor} : null}
               onClick={() => app.setSlide(link)} key={id}>
            {navName[language]}
          </div>
        )}
      </div>
      <div className={styles.footer} style={color ? {color} : null}>
        © {(new Date).getFullYear()} ТОО «Олжа Агро»
      </div>
    </div>
  )
}

export default Sidebar
