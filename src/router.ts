import Vue from 'vue';
import Router from 'vue-router';
import PlaquesStreamingComponent from './views/plaques-streaming/PlaquesStreaming.component';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/stream/:project',
            name: 'streaming',
            component: PlaquesStreamingComponent
        }
    ],
});
