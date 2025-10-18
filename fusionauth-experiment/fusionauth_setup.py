#!/usr/bin/env -S uv run
# /// script
# requires-python = ">=3.11"
# dependencies = ["requests", "python-dotenv"]
# ///
"""
Wait for FusionAuth to be ready, then:
  1) Ensure admin user exists and is registered to the FusionAuth admin app with role 'admin'
  2) Create/overwrite the application at a fixed ID with desired OAuth/registration config
No retries during actions; only an initial readiness wait.
"""

import json, sys, time, traceback, requests, os
from pathlib import Path
from dotenv import load_dotenv

load_dotenv("fusionauth_setup.env")

# --- Config (match your Kickstart) -------------------------------------------------
BASE = "http://localhost:9011"
API_KEY = "dev_api_key_Mp2b9Sx7Vq4nE3tZ6yG5cU1rH8fJ0aLd"

ADMIN_EMAIL = "admin@example.org"
ADMIN_PASSWORD = "Qwerty111!"
APP_ID = "00000000-0000-0000-0000-000000000001"

REDIRECT = "http://localhost:3000/callback"
LOGOUT_URL = "http://localhost:3000/"
CLIENT_SECRET = "sandwichesaregreat123123123"  # will be (re)set on app create
FUSIONAUTH_APP_ID = "3c219e58-ed0e-4b18-ad48-f4f92793ae32"

GOOGLE_IDP_ID = "00000000-0000-0000-0000-000000000002"
GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID", "")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET", "")

READINESS_TIMEOUT_SEC = 120
# -----------------------------------------------------------------------------------

S = requests.Session()
S.headers.update({"Authorization": API_KEY, "Content-Type": "application/json"})

def wait_until_ready():
    """Wait for FusionAuth to be ready AND for the API key to be valid."""
    print(f"⏳ Waiting for FusionAuth at {BASE} to be ready…")
    deadline = time.time() + READINESS_TIMEOUT_SEC
    last_err = None

    # Phase 1: instance ready
    while time.time() < deadline:
        try:
            r = requests.get(f"{BASE}/api/status", timeout=3)
            if r.ok and r.json().get("status") == "Ok":
                print("✅ FusionAuth is ready (status Ok).")
                break
            last_err = f"HTTP {r.status_code}: {r.text[:200]}"
        except Exception as e:
            last_err = str(e)
        time.sleep(1.0)
    else:
        print(f"❌ FusionAuth not ready within {READINESS_TIMEOUT_SEC}s. Last error: {last_err}", file=sys.stderr)
        sys.exit(1)

    # Phase 2: API key valid (auth-required endpoint)
    print("⏳ Verifying API key…")
    while time.time() < deadline:
        try:
            r = S.get(f"{BASE}/api/tenant", timeout=5)  # requires a valid API key
            if r.status_code == 200:
                print("✅ API key is valid.")
                return
            # 401/403 means FA is up but key not present/active yet
            last_err = f"HTTP {r.status_code}: {r.text[:200]}"
        except Exception as e:
            last_err = str(e)
        time.sleep(1.0)

    print(f"❌ API key not accepted within {READINESS_TIMEOUT_SEC}s. Last error: {last_err}", file=sys.stderr)
    sys.exit(1)

def ensure_admin_user():
    """Create admin user if missing; ensure emailVerified; register to admin app with role=admin."""
    # get by email
    r = S.get(f"{BASE}/api/user", params={"email": ADMIN_EMAIL})
    if r.status_code == 200 and r.json().get("user"):
        user = r.json()["user"]
        # ensure verified
        S.patch(f"{BASE}/api/user/{user['id']}", data=json.dumps({"user": {"emailVerified": True}}))
    else:
        # create
        body = {"user": {"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD, "emailVerified": True}}
        r = S.post(f"{BASE}/api/user", data=json.dumps(body))
        r.raise_for_status()
        user = r.json()["user"]

    # register to FusionAuth admin app with admin role
    # check if registration exists first
    r = S.get(f"{BASE}/api/user/registration/{user['id']}/{FUSIONAUTH_APP_ID}")
    reg_body = {"registration": {"applicationId": FUSIONAUTH_APP_ID, "roles": ["admin"]}}

    if r.status_code == 200:
        # registration exists, update it with PUT
        r = S.put(f"{BASE}/api/user/registration/{user['id']}/{FUSIONAUTH_APP_ID}", data=json.dumps(reg_body))
        r.raise_for_status()
    else:
        # registration doesn't exist, create it with POST
        r = S.post(f"{BASE}/api/user/registration/{user['id']}", data=json.dumps(reg_body))
        r.raise_for_status()

    return user

def ensure_application():
    """Create/update app at fixed APP_ID with OAuth + registration config."""
    # check if application exists first
    r = S.get(f"{BASE}/api/application/{APP_ID}")

    body = {
        "application": {
            "name": "My App",
            "jwtConfiguration": {"enabled": True},
            "registrationConfiguration": {"enabled": True, "selfServiceEnabled": True},
            "oauthConfiguration": {
                "enabledGrants": ["authorization_code", "refresh_token"],
                "requireRegistration": True,
                "authorizedRedirectURLs": [REDIRECT],
                "logoutBehavior": "RedirectOnly",
                "logoutURL": LOGOUT_URL,
                "clientSecret": CLIENT_SECRET
            }
        }
    }

    if r.status_code == 200:
        # application exists, update it with PATCH
        r = S.patch(f"{BASE}/api/application/{APP_ID}", data=json.dumps(body))
        r.raise_for_status()
    else:
        # application doesn't exist, create it with POST at specific ID
        r = S.post(f"{BASE}/api/application/{APP_ID}", data=json.dumps(body))
        r.raise_for_status()

    return r.json()["application"]

def ensure_google_identity_provider():
    """Create/update Google identity provider and enable it for the app."""
    # check if identity provider exists first
    r = S.get(f"{BASE}/api/identity-provider/{GOOGLE_IDP_ID}")

    body = {
        "identityProvider": {
            "name": "Google",
            "type": "Google",
            "enabled": True,
            "buttonText": "Sign in with Google",
            "client_id": GOOGLE_CLIENT_ID,
            "client_secret": GOOGLE_CLIENT_SECRET,
            "scope": "openid email profile",
            "applicationConfiguration": {
                APP_ID: {
                    "enabled": True,
                    "createRegistration": True
                }
            }
        }
    }

    if r.status_code == 200:
        # identity provider exists, update it with PATCH
        r = S.patch(f"{BASE}/api/identity-provider/{GOOGLE_IDP_ID}", data=json.dumps(body))
        r.raise_for_status()
    else:
        # identity provider doesn't exist, create it with POST at specific ID
        r = S.post(f"{BASE}/api/identity-provider/{GOOGLE_IDP_ID}", data=json.dumps(body))
        r.raise_for_status()

    return r.json()["identityProvider"]

def main():
    wait_until_ready()

    admin_user = ensure_admin_user()
    app = ensure_application()
    google_idp = ensure_google_identity_provider()

    # Build handy URLs
    wk = requests.get(f"{BASE}/.well-known/openid-configuration").json()
    authz = wk["authorization_endpoint"]
    login_url = f"{authz}?client_id={APP_ID}&response_type=code&redirect_uri={REDIRECT}&scope=openid%20offline_access"
    register_url = authz.replace("/oauth2/authorize", "/oauth2/register") + f"?client_id={APP_ID}&redirect_uri={REDIRECT}"
    logout_url = f"{BASE}/oauth2/logout?client_id={APP_ID}&post_logout_redirect_uri={LOGOUT_URL}"

    print(json.dumps({
        "adminUser": admin_user["email"],
        "appId": app["id"],
        "loginUrl": login_url,
        "registerUrl": register_url,
        "logoutUrl": logout_url,
        "redirects": app["oauthConfiguration"].get("authorizedRedirectURLs", []),
        "googleIdp": {
            "id": google_idp["id"],
            "name": google_idp["name"],
            "enabled": google_idp["enabled"]
        }
    }, indent=2))

if __name__ == "__main__":
    try:
        main()
    except requests.HTTPError as e:
        print("HTTP error:", e.response.status_code, e.response.text, file=sys.stderr)
        traceback.print_exc()
        sys.exit(1)
    except Exception as e:
        print("Fatal error:", e, file=sys.stderr)
        traceback.print_exc()
        sys.exit(1)
