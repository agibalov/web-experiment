import Vue from 'vue';
import Vuex from 'vuex';
import { AppState } from '@/store/state';
import { mutations } from '@/store/mutations';
import { actions } from '@/store/actions';

Vue.use(Vuex);

export default new Vuex.Store<AppState>({
    strict: true,
    state: {
        wip: false,
        tasks: [],
        newTaskText: '',
    },
    mutations,
    actions,
});
