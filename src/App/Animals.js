import React from 'react'
import {Swiper, SwiperSlide} from 'swiper/react/swiper-react'
import {AppContext} from 'services/app'

import text from './Animals.json'
import styles from './Crops.module.sass'

import products from 'assets/img/Animals/products.png'

const Animals = () => {
  const {language} = React.useContext(AppContext).state

  const loc = obj => obj[language] || obj.ru

  return (
    <div className={`slide ${styles.container}`}>
      <div className="header">
        <div className="h2" data-animation="fromLeft">{loc(text.title)}</div>
      </div>
      <div color="gray" clip="top" data-animation="fromBottom" data-delay="1">{loc(text.body)}</div>
      <Swiper className={styles.layout} slidesPerView={1.08}
              breakpoints={{
                568: {
                  slidesPerView: 2
                }
              }}>
        {text.blocks.map(({title, subtitle, body, list, grid, ul}, i) =>
          <SwiperSlide className={styles.block} key={i}>
            <div className={styles.title} data-animation="fromBottom" data-delay={i * 5 + 2}>{loc(title)}</div>
            <div className={styles.subtitle} data-animation="fromBottom" data-delay={i * 5 + 3}>{loc(subtitle)}</div>
            <br/>
            <div className={styles.body} color="gray" data-animation="fromBottom" data-delay={i * 5 + 4}>{loc(body)}</div>
            {ul && <>
              <div className={styles.products} data-animation="fromBottom" data-delay={i * 5 + 5}>
                <img className={styles.img} src={products} alt=""/>
                <ul className={styles.ul} color="gray">
                  {ul.map(({title}) =>
                    <li className={styles.li} key={title.ru}>{loc(title)}</li>
                  )}
                </ul>
              </div>
            </>}
            {(grid || list) &&
              <div className={grid ? styles.grid : styles.list}>
                {(grid || list).map(({title, body, image}, j) =>
                  <div className={styles.item} key={title.ru} data-animation="fromBottom" data-delay={i * 5 + 5 + j}>
                    <img src={require(`assets/img/Animals/${image}`).default} alt="" className={styles.image}/>
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
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  )
}

export default Animals
