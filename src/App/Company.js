import React from 'react'
import {AppContext} from 'services/app'

import text from './Company.json'
import styles from './Company.module.sass'

const Company = () => {
  const {language} = React.useContext(AppContext).state

  const loc = obj => obj[language] || obj.ru

  return (
    <div className={`slide ${styles.container}`}>
      <img src="/img/Company/barley.png" alt="" className={styles.barley}/>
      <img src="/img/Company/sunflower.png" alt="" className={styles.sunflower}/>
      <div className="header">
        <div className="h2">{loc(text.title)}</div>
      </div>
      <div className={styles.body}>
        <div dangerouslySetInnerHTML={{__html: loc(text.body)}}/>
        <br/>
        <hr className="hr"/>
        <br/>
        <div className="h3">{loc(text.values.title)}</div>
        <br/>
        <div className={styles.values}>
          {text.values.list.map(({title}) =>
            <div className={styles.value} key={title.ru}>
              <div className={styles.icon}/>
              <div>{loc(title)}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Company
