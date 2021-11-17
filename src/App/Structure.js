import React from 'react'
import {AppContext} from 'services/app'

import text from './Structure.json'
import styles from './Structure.module.sass'

const Structure = () => {
  const {language} = React.useContext(AppContext).state

  const loc = obj => obj[language] || obj.ru

  return (
    <div className={`slide ${styles.container}`}>
      <div className="header">
        <div className="h2">{loc(text.title)}</div>
      </div>
      <div className={styles.list}>
        {text.list.map(({title, body, image}) =>
          <div className={styles.item} key={title.ru}>
            <div className={styles.image} style={{backgroundImage: `url(/img/Structure/${image})`}}/>
            <div>
              <div className="h3">{loc(title)}</div>
              <div className={styles.body} dangerouslySetInnerHTML={{__html: loc(body)}}/>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Structure
