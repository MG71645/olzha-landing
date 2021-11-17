import React from 'react'
import {AppContext} from 'services/app'

import styles from './Language.module.sass'

const Language = () => {
  const app = React.useContext(AppContext)
  const {language} = app.state

  const links = {
    ru: {
      text: 'Eng',
      to: 'en'
    },
    en: {
      text: 'Рус',
      to: 'ru'
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.box} onClick={() => app.setLanguage(links[language].to)}>
        {links[language].text} <span className={styles.chevron}>⌵</span>
      </div>
    </div>
  )
}

export default Language
