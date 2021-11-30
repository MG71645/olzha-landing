import React from 'react'
import {hyphenated} from 'hyphenated'
import ru from 'hyphenated-ru'
import Wheel from 'react-scroll-wheel-handler'
import {AppContext} from 'services/app'
import {useViewport} from 'services/viewport'

import {Mousewheel} from 'swiper'
import {Swiper, SwiperSlide} from 'swiper/react/swiper-react'

import text from './Structure.json'
import styles from './Structure.module.sass'

const Structure = () => {
  const app = React.useContext(AppContext)
  const {language} = app.state
  const {viewport} = useViewport()
  const swiper = React.useRef()

  const loc = obj => obj[language] || obj.ru

  const hyphen = obj => language === 'ru' ? hyphenated(obj[language], {language: ru}) : hyphenated(obj[language])

  const [state, setState] = React.useState({
    slide: 0
  })
  const updateState = u => setState(s => ({...u, ...s}))

  const slide = React.useRef(0)
  const overscroll = React.useRef(true)

  const handleSlide = ({activeIndex}) => {
    overscroll.current = false
    slide.current = activeIndex
    updateState({slide: activeIndex})

    if (activeIndex === 0) setTimeout(() => {
      if (slide.current === 0) overscroll.current = true
    }, 100)
  }

  const handleReachEnd = ({isEnd}) => {
    setTimeout(() => {
      if (isEnd) overscroll.current = true
    }, 100)
  }

  const handleWheel = e => {
    if (viewport.includes('ml')) {
      e.stopPropagation()
      if (overscroll.current) {
        if (e.deltaY < 0 && slide.current === 0) app.prev()
        else if (e.deltaY > 0 && slide.current === text.list.length - 1) app.next()
      }
    }
  }

  const handleUp = () => {
    if (overscroll.current && slide.current === 0) app.prev()
  }

  const handleDown = () => {
    if (overscroll.current && slide.current === text.list.length - 1) app.next()
  }

  const initSwiper = ref => {
    swiper.current = ref
    setTimeout(ref.mousewheel.enable, 1000)
  }

  return (<Wheel upHandler={handleUp} downHandler={handleDown}>
    <div className={`slide ${styles.container}`} onWheel={null} onTouchMove={null}>
      <div className="header -sticky" data-sticky={slide.current > 0}>
        <div className="h2" data-animation="fromLeft">{loc(text.title)}</div>
      </div>
      <Swiper className={styles.swiper} modules={[Mousewheel]}
        slidesPerView={1.1} spaceBetween={32}
        breakpoints={{
          568: {
            direction: 'vertical',
            spaceBetween: 0,
            slidesPerView: 'auto',
            autoHeight: true
          }
        }}
        mousewheel={{forceToAxis: true, enabled: false}}
        onSwiper={initSwiper} onSlideChange={handleSlide} onReachEnd={handleReachEnd}
      >
        {text.list.map(({title, body, image}, i) =>
          <SwiperSlide className={styles.item} key={title.ru} data-animation="fromBottom" data-delay={i + 1}>
            <div className={styles.image}
                 style={{backgroundImage: `url(${require(`assets/img/Structure/${image}`).default})`}}/>
            <div>
              <div className="h3" clip="top">{loc(title)}</div>
              <div className={styles.body}>{hyphen(body)}</div>
            </div>
          </SwiperSlide>
        )}
      </Swiper>
      <div className={styles.pagination}>
        {text.list.map((a, i) =>
          <div className={styles.bullet} key={i} onClick={() => swiper.current.slideTo(i)}
               disabled={i === slide.current} data-animation="popup"/>
        )}
      </div>
    </div>
  </Wheel>)
}

export default Structure
