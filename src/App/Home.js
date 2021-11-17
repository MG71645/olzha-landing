import React from 'react'
import {AppContext} from 'services/app'

import text from './Home.json'
import styles from './Home.module.sass'

const Home = () => {
  const {language} = React.useContext(AppContext).state

  const loc = obj => (obj[language] || obj.ru)

  return <>
    <div className={`slide ${styles.container}`}>
      <div className="header"/>
      <div className="h1">{loc(text.title)}</div>
      <div className={styles.body}>{loc(text.body)}</div>
    </div>
  </>
}

export default Home
