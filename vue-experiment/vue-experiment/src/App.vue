<template>
    <div>
        <nav class="navbar is-light">
            <div class="container">
                <div class="navbar-brand">
                    <router-link to="/" class="navbar-item">
                        <img src="./assets/logo.png">
                    </router-link>
                </div>
                <div class="navbar-menu">
                    <div class="navbar-start">
                        <router-link to="/"
                                     class="navbar-item"
                                     active-class="is-active"
                                     exact>Home
                        </router-link>
                        <router-link to="/about"
                                     class="navbar-item"
                                     active-class="is-active"
                                     exact>About
                        </router-link>
                    </div>
                </div>
            </div>
        </nav>
        <div class="container">
            {{this.$store.state.wip ? 'wip' : 'idle'}}
            <router-view/>
        </div>
    </div>
</template>

<style lang="scss">
    @import "~bulma";
</style>

<script lang="ts">
    import Vue from 'vue';

    export default class App extends Vue {
        public created() {
            // tslint:disable-next-line:no-console
            console.log('I am App.vue');
        }
    }
</script>
