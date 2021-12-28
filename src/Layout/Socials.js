import React from 'react'

import styles from './Socials.module.sass'

import Youtube from './Socials/Youtube'
import Telegram from './Socials/Telegram'
import Instagram from './Socials/Instagram'

const Socials = () => {
  return (
    <div className={styles.container} data-animation="fromRight">
      <a className={styles.social} href="https://youtube.com/channel/UCCH7rkJajUZmcDTLdWA2CqA" target="_blank" rel="noreferrer">
        <Youtube/>
      </a>
      <a className={styles.social} href="https://instagram.com/olzhaagro" target="_blank" rel="noreferrer">
        <Instagram/>
      </a>
      <a className={styles.social} href="https://t.me/akhojanazarov" target="_blank" rel="noreferrer">
        <Telegram/>
      </a>
    </div>
  )
}

export default Socials
