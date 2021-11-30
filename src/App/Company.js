import React from 'react'
import {AppContext} from 'services/app'
import {useViewport} from 'services/viewport'

import text from './Company.json'
import styles from './Company.module.sass'

import barley from 'assets/img/Company/barley.png'
import sunflower from 'assets/img/Company/sunflower.png'

const Company = () => {
  const {language} = React.useContext(AppContext).state
  const {viewport} = useViewport()

  const loc = obj => obj[language] || obj.ru

  return (
    <div className={`slide ${styles.container}`}>
      {viewport.includes('ml') && <>
        <img src={barley} alt="" className={styles.barley}/>
        <img src={sunflower} alt="" className={styles.sunflower}/>
      </>}
      <div className="header">
        <div className="h2" data-animation="fromLeft">{loc(text.title)}</div>
      </div>
      <div className={styles.body}>
        <div className="h3" data-animation="fromBottom" data-delay="1">{loc(text.mission.title)}</div>
        <div data-animation="fromBottom" data-delay="1">{loc(text.mission.body)}</div>
        <br/>
        <div className="h3" data-animation="fromBottom" data-delay="2">{loc(text.vision.title)}</div>
        <div data-animation="fromBottom" data-delay="2">{loc(text.vision.body)}</div>
        <br/>
        <hr className="hr" data-animation="appear" data-delay="3"/>
        <br/>
        <div className="h3" data-animation="fromBottom" data-delay="3">{loc(text.values.title)}</div>
        <br/>
        <div className={styles.values} data-animation="">
          {text.values.list.map(({title}, i) =>
            <div className={styles.value} key={i} data-animation="fromBottom" data-delay={i + 4}>
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
