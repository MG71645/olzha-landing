import React from 'react'
import {AppContext} from 'services/app'

import text from './Trading.json'
import styles from './Trading.module.sass'

import map from 'assets/img/world.svg'

const Trading = () => {
  const {language} = React.useContext(AppContext).state

  const [tab, setTab] = React.useState('world')

  const loc = obj => obj[language] || obj.ru

  return (
    <div className={`slide ${styles.container}`}>
      <div className="header">
        <div className="h2">{loc(text.title)}</div>
        <div className={styles.tabs}>
          <div className={styles.tab} onClick={() => setTab('world')} disabled={tab === 'world'}>
            {loc(text.world.tab)}
          </div>
          <div className={styles.tab} onClick={() => setTab('kazakhstan')} disabled={tab === 'kazakhstan'}>
            {loc(text.kazakhstan.tab)}
          </div>
        </div>
      </div>
      {tab === 'world' &&
        <div className={styles.world}>
          <div className={styles.map}>
            <img src={map} alt="" width="100%"/>
            {text.world.countries.map(({title, value, unit = 'mil', percent, top, left, popup, label}, i) =>
              <div className={styles.marker} key={title.ru} style={top ? {top, left} : null}>
                {i + 1}
                <div className={styles.label} data-position={label}>{loc(title)}</div>
                <div className={styles.popup} data-position={popup}>
                  <div>
                    <div className={styles.big}>{value}</div>
                    <div>{loc(text.units[unit])}<br/>{loc(text.world.popup.tons)}</div>
                  </div>
                  <div color="gold">
                    <div className={styles.big}>{percent}%</div>
                    <div>{loc(text.world.popup.percent)}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      }
      {tab === 'kazakhstan' && <>
        <div className={styles.body} dangerouslySetInnerHTML={{__html: loc(text.kazakhstan.body)}}/>
        <br/>
        <div className={styles.title}>{loc(text.kazakhstan.countries.title)}</div>
        <br/>
        <div className={styles.countries}>
          {text.kazakhstan.countries.list.map(({title, amount, height}) =>
            <div className={styles.country} key={title.ru}>
              <div className={styles.amount}>{loc(amount)}</div>
              <div className={styles.seeds}>
                <div className={`${styles.seed} ${styles.top}`}/>
                <div className={styles.pairs}>
                  {Array.from({length: height}).map((item, i) =>
                    <div className={styles.pair} key={i}>
                      <div className={styles.seed} style={{animationDelay: `${i * .1}s`}}/>
                      <div className={styles.seed} style={{animationDelay: `${i * .1}s`}}/>
                    </div>
                  )}
                </div>
              </div>
              <div className={styles.name}>{loc(title)}</div>
            </div>
          )}
        </div>
      </>}
    </div>
  )
}

export default Trading
