import React from 'react'
import {AppContext} from 'services/app'

import text from './Crops.json'
import styles from './Crops.module.sass'

const Crops = () => {
  const {language} = React.useContext(AppContext).state

  const loc = obj => obj[language] || obj.ru

  return (
    <div className={`slide ${styles.container}`}>
      <div className="header">
        <div className="h2">{loc(text.title)}</div>
      </div>
      <img className={styles.leaves} src="/img/Crops/leaves.png" alt=""/>
      <div clip="top">{loc(text.body)}</div>
      <div className={styles.layout}>
        {text.list.map(({title, subtitle, body, list}, i) =>
          <div className={styles.block} key={i}>
            <div className={styles.title}>{loc(title)}</div>
            <div className={styles.subtitle}>{loc(subtitle)}</div>
            {body && <>
              <br/>
              <div className={styles.body}>{loc(body)}</div>
            </>}
            {list &&
              <div className={styles.grid}>
                {list.map(({title, image}) =>
                  <div className={styles.item} key={title.ru}>
                    <img src={`/img/Crops/${image}`} alt="" className={styles.image}/>
                    <div>{loc(title)}</div>
                  </div>
                )}
              </div>
            }
          </div>
        )}
      </div>
    </div>
  )
}

export default Crops
