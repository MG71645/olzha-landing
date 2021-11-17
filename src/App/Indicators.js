import React from 'react'
import {AppContext} from 'services/app'

import text from './Indicators.json'
import styles from './Indicators.module.sass'

const Indicators = () => {
  const {language} = React.useContext(AppContext)

  const loc = obj => obj[language] || obj.ru

  return (
    <div className={`slide ${styles.container}`}>
      <div className="header">
        <div className="h2">{loc(text.title)}</div>
      </div>
      <div className={styles.indicators}>
        <div className={styles.area}>
          <div className={styles.layout}>
            <div className={styles.block}>
              <div className={styles.h1}>960 000<br/>{loc(text.area.ha)}</div>
              <div>{loc(text.area.total)}</div>
            </div>
            <div className={styles.block}>
              <div className={styles.h2}>660 000 {loc(text.area.ha)}</div>
              <div>{loc(text.area.corn)}</div>
              <br/>
              <br/>
              <div className={styles.h2}>300 000 {loc(text.area.ha)}</div>
              <div>{loc(text.area.animals)}</div>
            </div>
          </div>
        </div>
        <div className={styles.grid}>
          {text.list.map(({title, body}) =>
            <div className={styles.item} key={title.ru}>
              <div className={styles.h2}>{loc(title)}</div>
              <div>{loc(body)}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Indicators
