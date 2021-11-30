import React from 'react'
import {AppContext} from 'services/app'
import {useViewport} from 'services/viewport'

import text from 'App.json'
import structure from 'App/Structure.json'
import crops from 'App/Crops.json'

const preloads = {
  home: {
    images: [
      require('assets/img/background.jpg').default
    ]
  },
  company: {
    images: [
      require('assets/img/Company/value.svg').default,
      require('assets/img/Company/sunflower.png').default,
      require('assets/img/Company/barley.png').default
    ],
    mp: {
      images: [
        require('assets/img/Company/value.svg').default
      ]
    }
  },
  structure: {
    images: structure.list.map(({image}) => require(`assets/img/Structure/${image}`).default)
  },
  indicators: {
    images: [
      require('assets/img/Indicators/field.jpg').default
    ],
    videos: [
      require('assets/video/field.mp4').default
    ]
  },
  crops: {
    images: [
      require('assets/img/Crops/bags.png').default,
      ...crops.list[0].list.map(({image}) => require(`assets/img/Crops/${image}`).default)
    ],
    mp: {
      images: [
        ...crops.list[0].list.map(({image}) => require(`assets/img/Crops/${image}`).default)
      ]
    }
  },
  animals: {
    images: [
      require('assets/img/Animals/bull.png').default,
      require('assets/img/Animals/cow.png').default,
      require('assets/img/Animals/products.png').default
    ]
  },
  trading: {
    images: [
      require('assets/img/Trading/world.svg').default
    ],
    mp: {
      images: []
    }
  }
}

const Preloader = () => {
  const app = React.useContext(AppContext)
  const {viewport} = useViewport()

  const preloadImage = url => {
    return new Promise((resolve, reject) => {
      let img = new Image()
      img.src = url
      img.onload = resolve
      img.onerror = reject
    })
  }

  const preloadVideo = url => {
    return new Promise((resolve, reject) => {
      let req = new XMLHttpRequest()
      req.open('GET', url, true)
      req.responseType = 'blob'

      req.onload = () => {
        if (this.status === 200) {
          const videoBlob = this.response
          const vid = URL.createObjectURL(videoBlob)
        }
      }
      req.onerror = function() {
        // Error
      }

      req.send()
    })
  }

  const preloadAll = async slide => {
    const images = preloads[slide]?.[viewport[viewport.length - 1]]?.images || preloads[slide]?.images || []
    return Promise.all([
      ...images.map(preloadImage)
    ])
  }

  React.useEffect(() => {
    preloadAll(text.slides[app.state.index].id)
      .then(async () => {
        document.getElementById('preloader').remove()
        app.update({loading: false})

        for (let i = app.state.index + 1; i < text.slides.length; i++) {
          await preloadAll(text.slides[i].id)
        }

        for (let i = 0; i < app.state.index; i++) {
          await preloadAll(text.slides[i].id)
        }

      })
      .catch(console.error)
  }, [])

  return null
}

export default Preloader
