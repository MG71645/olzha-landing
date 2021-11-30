import React from 'react'
import {AppContext} from 'services/app'

import text from './Home.json'
import styles from './Home.module.sass'
import video from 'assets/video/background.mp4'

const Home = () => {
  const {language} = React.useContext(AppContext).state

  const loc = obj => (obj[language] || obj.ru)

  return <>
    <div className="background">
      <video autoPlay muted loop className="video">
        <source src={video} type="video/mp4"/>
      </video>
    </div>
    <div className={`slide ${styles.container}`}>
      <div className="header"/>
      <div className="h1" data-animation="fromBottom">{loc(text.title)}</div>
      <div className={styles.body}>
        {text.body[language].map((p, i) =>
          <div className="p" key={i} data-animation="fromBottom" data-delay={i + 1}>{p}</div>
        )}
      </div>
      <div className={styles.tip} data-animation="appear" data-delay="10">
        <div className={styles.circle}>
          <div className={styles.icon}>⌵</div>
        </div>
        {loc(text.tip)}
      </div>
    </div>
  </>
}

export default Home
