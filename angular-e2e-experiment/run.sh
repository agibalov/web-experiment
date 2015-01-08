npm install -g protractor && \
webdriver-manager update && \
{ webdriver-manager start & } && \
sleep 5 && \
protractor conf.js
