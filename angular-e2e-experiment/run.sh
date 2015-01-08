{ webdriver-manager start &} && \
WEBDRIVER_PID=$! && \
{ node --harmony app.js & } && \
NODE_PID=$! && \
echo $NODE_PID && \
sleep 3 && \
protractor conf.js && \
kill $NODE_PID && \
kill $WEBDRIVER_PID && \
echo "DONE"
