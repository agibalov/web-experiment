# angular-express-experiment

#### Local development
* `npm start` to start backend and frontend.
* `npm run restart` to restart backend and frontend.
* `npm stop` to stop.
* `npm run logs` to show logs.
* `npm run app:build-and-start` to build and start "as if" we were on a real server.

#### Deployment

* Create a 1GB / 1vCPU DigitalOcean droplet ($5/month as of 2/4/2018) with Ubuntu 17.10 x64 installed. The deployment procedure relies on SSH, so make sure to have your key installed locally and at DigitalOcean.
* Go to `ecosystem.prod.yaml` and change the `host` to whichever IP the droplet has.
* Commit/push the changes. PM2's deployment mechanism relies on `git clone`, so if the changes are not in the repo, it won't see them.
* Run once to configure the host: `pm2 deploy ecosystem.prod.yaml production setup`
* Each time you want to deploy the new version:
  * `git commit ...`
  * `git push ...`
  * `pm2 deploy ecosystem.prod.yaml production update`
