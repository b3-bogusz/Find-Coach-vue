import { createApp } from 'vue';
import App from './App.vue'
import router from './router'
import store from './store'

import BaseCard from './components/ui/BaseCard'
import BaseButton from './components/ui/BaseButton'
import BaseBadge from './components/ui/BaseBadge'

const app = createApp(App)
app.use(store);
app.use(router);

app.component(BaseCard);
app.component(BaseButton);
app.component(BaseBadge);

app.mount('#app');
