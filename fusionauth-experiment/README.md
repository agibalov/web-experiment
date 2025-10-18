# fusionauth-experiment

Figuring out FusionAuth.

## Prerequisites

In Google Cloud Console, create an OAuth 2.0 Client:

* with type "Web application"
* Authorized JavaScript origins: `http://localhost:9011`
* Authorized redirect URIs: `http://localhost:9011/oauth2/callback`

Put client ID and client secret to `fusionauth_setup.env`.

## How to do things

* `just start` to launch everything.
* `just stop` to stop everything.

## Things to do

* Go to http://localhost:9011/admin for admin console. Log in with admin@example.org/Qwerty111!
* Go to http://localhost:3000 for dummy web app.
