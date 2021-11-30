import React from 'react'
import {hyphenated} from 'hyphenated'
import ru from 'hyphenated-ru'
import {AppContext} from 'services/app'

import text from './Indicators.json'
import styles from './Indicators.module.sass'

import video from 'assets/video/field.mp4'

const Indicators = () => {
  const {language} = React.useContext(AppContext).state

  const loc = obj => obj[language] || obj.ru

  const hyphen = obj => language === 'ru' ? hyphenated(obj[language], {language: ru}) : hyphenated(obj[language])

  return (
    <div className={`slide ${styles.container}`}>
      <div className="header">
        <div className="h2" data-animation="fromLeft">{loc(text.title)}</div>
      </div>
      <div className={styles.indicators}>
        <div className={styles.area} data-animation="fromBottom" data-delay="1">
          <video autoPlay muted loop className={styles.video}>
            <source src={video} type="video/mp4"/>
          </video>
          <div className={styles.layout}>
            <div className={styles.block}>
              <div className={styles.h1}>{`960 000\n`}{loc(text.area.ha)}</div>
              <div>{loc(text.area.total)}</div>
            </div>
            <div className={styles.block}>
              <div className={styles.half}>
                <div className={styles.h2}>660 000 {loc(text.area.ha)}</div>
                <div>{loc(text.area.corn)}</div>
              </div>
              <div className={styles.half}>
                <div className={styles.h2}>300 000 {loc(text.area.ha)}</div>
                <div>{loc(text.area.animals)}</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.grid}>
          {text.list.map(({title, body}, i) =>
            <div className={styles.item} key={title.ru} data-animation="fromBottom" data-delay={i + 2}>
              <div className={styles.h2} dangerouslySetInnerHTML={{__html: loc(title)}}/>
              <div dangerouslySetInnerHTML={{__html: loc(body)}}/>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Indicators
