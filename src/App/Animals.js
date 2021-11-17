import React from 'react'
import {AppContext} from 'services/app'

import text from './Animals.json'
import styles from './Crops.module.sass'

const Animals = () => {
  const {language} = React.useContext(AppContext).state

  const loc = obj => obj[language] || obj.ru

  return (
    <div className={`slide ${styles.container}`}>
      <div className="header">
        <div className="h2">{loc(text.title)}</div>
      </div>
      <div color="gray" clip="top">{loc(text.body)}</div>
      <div className={styles.layout}>
        {text.blocks.map(({title, subtitle, body, list, grid, ul}, i) =>
          <div className={styles.block} key={i}>
            <div className={styles.title}>{loc(title)}</div>
            <div className={styles.subtitle}>{loc(subtitle)}</div>
            <br/>
            <div className={styles.body} color="gray">{loc(body)}</div>
            {ul && <>
              <div className={styles.products}>
                <img className={styles.img} src="/img/Animals/products.png" alt=""/>
                <ul className={styles.ul} color="gray">
                  {ul.map(({title}) =>
                    <li className={styles.li} key={title.ru}>{loc(title)}</li>
                  )}
                </ul>
              </div>
            </>}
            {(grid || list) &&
              <div className={grid ? styles.grid : styles.list}>
                {(grid || list).map(({title, body, image}) =>
                  <div className={styles.item} key={title.ru}>
                    <img src={`/img/Animals/${image}`} alt="" className={styles.image}/>
                    <div>
                      <div className={styles.h2}>{loc(title)}</div>
                      {body &&
                        <div>{loc(body)}</div>
                      }
                    </div>
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

export default Animals
