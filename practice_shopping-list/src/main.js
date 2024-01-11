import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faSquare } from '@fortawesome/free-regular-svg-icons'
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons'
import { faSquareXmark } from '@fortawesome/free-solid-svg-icons'

library.add(faSquare)
library.add(faSquareCheck)
library.add(faSquareXmark)

const app = createApp(App)

app.use(createPinia())

app.mount('#app')

app.component('font-awesome-icon', FontAwesomeIcon)