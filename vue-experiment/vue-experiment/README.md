# vue-experiment

A vue/vuex/vue-router hello world.

* `npm i` to install dependencies
* `npm run serve` to run in development mode (http://localhost:8080)
* `npm run lint` to run TSLint
* `npm run build` to build the production dist package
* `npm run test:unit` to run unit tests
* `npm run test:e2e` to run e2e tests. **TODO**: it actually just launches the Cypress UI and I should click a button to make it do something. Once the test finishes, it doesn't close automatically. Figure out how to make everything by itself.

## Thoughts

1. Vuex forces the ugly redux-style spaghetti code: components calling actions, actions calling mutations, etc. What's even worse - even though I use TypeScript, the mutation/action signatures (names and parameters) are implicit. This means that I should have actions, typed action wrappers, mutations, typed mutation wrappers.
2. [The recommended way to handle forms with Vuex is ridiculous](https://vuex.vuejs.org/guide/forms.html).
3. When Vuex store is injected in Vue components, it's not explicitly declared, so `this.$store.` doesn't give you any hints at all.
