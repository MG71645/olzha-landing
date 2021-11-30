import React from 'react'
import {Swiper, SwiperSlide} from 'swiper/react/swiper-react'
import {AppContext} from 'services/app'
import {useViewport} from 'services/viewport'

import text from './Crops.json'
import styles from './Crops.module.sass'

import bags from 'assets/img/Crops/bags.png'

const Crops = () => {
  const {language} = React.useContext(AppContext).state
  const {viewport} = useViewport()

  const loc = obj => obj[language] || obj.ru

  return (
    <div className={`slide ${styles.container}`}>
      <div className="header">
        <div className="h2" data-animation="fromLeft">{loc(text.title)}</div>
      </div>
      <div clip="top" data-animation="fromBottom" data-delay="1">{loc(text.body)}</div>
      <Swiper className={styles.layout} slidesPerView={1.08}
              breakpoints={{
                568: {
                  slidesPerView: 2
                }
              }}>
        {text.list.map(({title, subtitle, body, list, image}, i) =>
          <SwiperSlide className={styles.block} key={i}>
            <div className={styles.title} data-animation="fromBottom" data-delay={i * 4 + 2}>{loc(title)}</div>
            <div className={styles.subtitle} data-animation="fromBottom" data-delay={i * 4 + 3}>{loc(subtitle)}</div>
            {body && <>
              <br/>
              <div className={styles.body} data-animation="fromBottom" data-delay={i * 4 + 4}>{loc(body)}</div>
            </>}
            {list &&
              <div className={styles.grid}>
                {list.map(({title, image}, j) =>
                  <div className={styles.item} key={title.ru} data-animation="fromBottom" data-delay={i * 4 + 4 + j}>
                    <img src={require(`assets/img/Crops/${image}`).default} alt="" className={styles.image}/>
                    <div>{loc(title)}</div>
                  </div>
                )}
              </div>
            }
            {viewport.includes('ml') && image &&
              <img className={styles.bags} src={bags} alt="" data-animation="fromBottom" data-delay={i * 4 + 5}/>
            }
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  )
}

export default Crops
