import React from 'react'
import {AppContext} from 'services/app'
import {useViewport} from 'services/viewport'
import {Swiper, SwiperSlide} from 'swiper/react/swiper-react'
import Swipe from 'react-easy-swipe'

import text from './Trading.json'
import styles from './Trading.module.sass'

import map from 'assets/img/Trading/world.svg'

const World = () => {
  const {language} = React.useContext(AppContext).state

  const loc = obj => obj[language] || obj.ru

  return (
    <div className={styles.world}>
      <div className={styles.map}>
        <img src={map} alt="" width="100%"/>
        {text.world.countries.map(({title, value, unit = 'mil', percent, top, left, popup, label}, i) =>
          <div className={styles.marker} key={title.ru} style={top ? {top, left} : null}
               data-animation="zoomOut">
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
  )
}

const Table = () => {
  const {language} = React.useContext(AppContext).state

  const loc = obj => obj[language] || obj.ru

  return (
    <table className={styles.table} data-animation="fromBottom" data-delay="2">
      <thead className={styles.thead}>
      <tr>
        <th className={styles.th}>{loc(text.table.place)}</th>
        <th className={styles.th}>{loc(text.table.country)}</th>
        <th className={styles.th}>{loc(text.units.mil)} {loc(text.units.tons)}</th>
        <th className={styles.th}>{loc(text.table.export)}</th>
      </tr>
      </thead>
      <tbody className={styles.tbody}>
      {text.world.countries.map(({title, value, percent}, i) =>
        <tr className={styles.tr} key={i}>
          <td className={styles.td}>{i + 1}</td>
          <td className={styles.td}>{loc(title)}</td>
          <td className={styles.td}>{value}</td>
          <td className={styles.td}>{percent}%</td>
        </tr>
      )}
      </tbody>
    </table>
  )
}

const Country = ({c, title, amount, height}) => {
  const {language} = React.useContext(AppContext).state

  const loc = obj => obj[language] || obj.ru

  return (
    <div className={styles.country} data-animation="appear" style={{animationDelay: c * .25 + 's'}}>
      <div className={styles.amount} style={{animationDelay: c * .25 + 's'}}>{loc(amount)}</div>
      <div className={styles.seeds}>
        <div className={`${styles.seed} ${styles.top}`} style={{animationDelay: c * .25 + 's'}}/>
        <div className={styles.trunk} style={{animationDelay: c * .25 + 's'}}/>
        <div className={styles.pairs} style={{animationDelay: c * .25 + 's'}}>
          {Array.from({length: height}).map((item, p) =>
            <div className={styles.pair} key={p}>
              <div className={styles.seed} style={{animationDelay: c * .25 + p * .1 + 's'}}/>
              <div className={styles.seed} style={{animationDelay: c * .25 + p * .1 + 's'}}/>
            </div>
          )}
        </div>
      </div>
      <div className={styles.name} style={{animationDelay: c * .25 + .5 + 's'}}>{loc(title)}</div>
    </div>
  )
}

const Kazakhstan = () => {
  const {language} = React.useContext(AppContext).state
  const {viewport} = useViewport()

  const loc = obj => obj[language] || obj.ru

  return (
    <>
      <div className={styles.body}>
        {text.kazakhstan.body[language].map((p, i) =>
          <div className="p" key={i} data-animation="fromBottom" data-delay={i}>{p}</div>
        )}
      </div>
      <div className={styles.title} data-animation="fromBottom" data-delay="2">
        {loc(text.kazakhstan.countries.title)}
      </div>
      <br/>
      {viewport.includes('ml') ?
        <div className={styles.countries}>
          {text.kazakhstan.countries.list.map((country, c) =>
            <Country {...country} c={c} key={c}/>
          )}
        </div>
      :
        <Swiper className={styles.slider} slidesPerView={2.5}>
          {text.kazakhstan.countries.list.map((country, c) =>
            <SwiperSlide className={styles.slide} key={c}>
              <Country {...country} c={c}/>
            </SwiperSlide>
          )}
        </Swiper>
      }
    </>
  )
}


const Trading = () => {
  const app = React.useContext(AppContext)
  const {language} = app.state
  const {viewport} = useViewport()

  const [tab, setTab] = React.useState('world')

  const loc = obj => obj[language] || obj.ru

  const [state, setState] = React.useState({
    wheel: false
  })

  React.useEffect(() => {
    setTimeout(() => setState(s => ({...s, wheel: true})), 2000)
  }, [])

  const mute = () => {
    setState(s => ({...s, wheel: false}))
    setTimeout(() => setState(s => ({...s, wheel: true})), 2000)
  }

  const handleWheel = e => {
    if (!viewport.includes('ml')) {
      e.stopPropagation()

      if (state.wheel) {
        if (e.deltaY > 0) {
          if (tab === 'world') {
            mute()
            setTab('kazakhstan')
          } else {
            app.next()
          }
        } else {
          if (tab === 'kazakhstan') {
            mute()
            setTab('world')
          } else {
            app.prev()
          }
        }
      }
    }
  }

  const handleSwipe = e => e.stopPropagation()

  const handleSwipeUp = () => tab === 'world' ? setTab('kazakhstan') : app.next()

  const handleSwipeDown = () => tab === 'kazakhstan' ? setTab('world') : app.prev()

  return (
    <Swipe className={`slide ${styles.container}`} onWheel={handleWheel}
           onSwipeUp={handleSwipeUp} onSwipeDown={handleSwipeDown} onSwipeEnd={handleSwipe} tolerance={100}>
      <div className={`header ${styles.header}`} data-animation="appear">
        <div className="h2" data-animation="fromLeft">{loc(text.title)}</div>
        <div className={styles.tabs} clip="bottom">
          <div className={styles.tab} onClick={() => setTab('world')} disabled={tab === 'world'}
               data-animation="appear" data-delay="3">
            {loc(text.world.tab)}
          </div>
          <div className={styles.tab} onClick={() => setTab('kazakhstan')} disabled={tab === 'kazakhstan'}
               data-animation="appear" data-delay="4">
            {loc(text.kazakhstan.tab)}
          </div>
        </div>
      </div>
      <div className={styles.mobileHeader} data-animation="fromBottom" key={tab}>
        {loc(text[tab].tab)}
      </div>
      {tab === 'world' ? viewport.includes('ml') ?
        <World/>
      :
        <Table/>
      :
        <Kazakhstan/>
      }
    </Swipe>
  )
}

export default Trading
