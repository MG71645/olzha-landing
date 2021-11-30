import React from 'react'
import {AppContext} from 'services/app'

import text from './Contacts.json'
import styles from './Contacts.module.sass'

const Contacts = () => {
  const {language} = React.useContext(AppContext).state

  const loc = obj => obj[language] || obj.ru

  return (
    <div className={`slide`}>
      <div className="header">
        <div className="h2" data-animation="fromLeft">{loc(text.title)}</div>
      </div>
      <div className={styles.grid}>
        {text.contacts.map(({title, body, phone, email}, i) =>
          <div className={styles.contact} key={title.ru} data-animation="fromBottom" data-delay={i + 1}>
            <div className={styles.title}>{loc(title)}</div>
            <div dangerouslySetInnerHTML={{__html: loc(body)}}/>
            {loc(text.phone)} <a href={`tel:${phone}`} color="gold">{phone}</a><br/>
            <a href={`mailto:${email}`} color="gold">{email}</a>
          </div>
        )}
      </div>
    </div>
  )
}

export default Contacts
