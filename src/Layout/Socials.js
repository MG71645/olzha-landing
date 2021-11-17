import React from 'react'

import styles from './Socials.module.sass'

import Youtube from './Socials/Youtube'
import Telegram from './Socials/Telegram'
import Instagram from './Socials/Instagram'

const Socials = () => {
  return (
    <div className={styles.container}>
      <a className={styles.social} href="https://youtube.com/channel/UCCH7rkJajUZmcDTLdWA2CqA" target="_blank" rel="noreferrer">
        <Youtube/>
      </a>
      <a className={styles.social} href="https://t.me/akhojanazarov" target="_blank" rel="noreferrer">
        <Telegram/>
      </a>
      <a className={styles.social} href="https://instagram.com/olzhaagro?utm_medium=copy_link" target="_blank" rel="noreferrer">
        <Instagram/>
      </a>
    </div>
  )
}

export default Socials
