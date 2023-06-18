import '@mdi/font/css/materialdesignicons.css'
//NOTE: I don't use vuetify's scss variables right now , so this way to import is better
import 'vuetify/styles'
import './index.scss'

import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import { en } from 'vuetify/locale'

import App from './App.vue'
import enLocale from './data/locales/en.json'
import { store } from './store/store'

createApp(App)
  .use(store)
  .use(
    //NOTE: it is almost inpossible to add types here without own bundler and there isn't ready solution for vuetify,
    //so I just left it as it is because vite now is required to be used (I should open a feature request just later)
    createVuetify({
      locale: {
        locale: 'en',
        messages: {
          en: {
            ...en,
            ...enLocale
          }
        }
      }
    })
  )
  .mount('#app')
