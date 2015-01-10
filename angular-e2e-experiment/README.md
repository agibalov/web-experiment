### New

No global protractor installation is required:
```
npm install
bower install
grunt webdriver-update
grunt
```
Ideally, this will install all the necessary dependencies and run the tests.

### Old

Before running the tests (`run.sh`), install protractor:
```
npm install -g protractor
webdriver-manager update
```
After it, run `run.sh`. It will:
1. Start the webdriver (`webdriver-manager start`)
2. Start the NodeJS app (app.js), which just serves `index.html`
3. Run tests found at spec.js (`protractor conf.js`)
4. Kill NodeJS app
5. Kill webdriver (here, I'm not quite sure if it gets killed completely)
