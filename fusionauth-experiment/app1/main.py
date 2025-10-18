import os
from typing import Optional
from fastapi import FastAPI, Request, Response
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.templating import Jinja2Templates
from itsdangerous import URLSafeTimedSerializer
import httpx

app = FastAPI()
templates = Jinja2Templates(directory="templates")

# Configuration
FUSIONAUTH_URL = "http://localhost:9011"
CLIENT_ID = "00000000-0000-0000-0000-000000000001"
CLIENT_SECRET = "sandwichesaregreat123123123"
REDIRECT_URI = "http://localhost:3333/callback"
COOKIE_SECRET_KEY = "didisaysandwichesaregreat123123123"

# Session serializer for secure cookies
serializer = URLSafeTimedSerializer(COOKIE_SECRET_KEY)

# URLs
LOGIN_URL = f"{FUSIONAUTH_URL}/oauth2/authorize?client_id={CLIENT_ID}&response_type=code&redirect_uri={REDIRECT_URI}&scope=openid"
REGISTER_URL = f"{FUSIONAUTH_URL}/oauth2/register?client_id={CLIENT_ID}&response_type=code&redirect_uri={REDIRECT_URI}&scope=openid"
LOGOUT_URL = f"{FUSIONAUTH_URL}/oauth2/logout?client_id={CLIENT_ID}"
TOKEN_URL = f"{FUSIONAUTH_URL}/oauth2/token"
USERINFO_URL = f"{FUSIONAUTH_URL}/oauth2/userinfo"


def get_session_data(request: Request) -> Optional[dict]:
    """Extract session data from cookie"""
    session_cookie = request.cookies.get("session")
    if not session_cookie:
        return None
    try:
        return serializer.loads(session_cookie, max_age=3600 * 24)  # 24 hours
    except:
        return None


def set_session_cookie(response: Response, data: dict):
    """Set session cookie"""
    session_value = serializer.dumps(data)
    response.set_cookie(
        key="session",
        value=session_value,
        httponly=True,
        max_age=3600 * 24,  # 24 hours
        samesite="lax"
    )


@app.get("/", response_class=HTMLResponse)
async def index(request: Request):
    """Index page - shows login/register links or user info"""
    session_data = get_session_data(request)

    return templates.TemplateResponse(
        "index.html",
        {
            "request": request,
            "user": session_data,
            "login_url": LOGIN_URL,
            "register_url": REGISTER_URL,
            "logout_url": "/logout"
        }
    )


@app.get("/callback")
async def callback(request: Request, code: Optional[str] = None, error: Optional[str] = None):
    """OAuth callback endpoint"""
    if error:
        return HTMLResponse(f"<h1>Error: {error}</h1>")

    if not code:
        return HTMLResponse("<h1>Error: No authorization code received</h1>")

    # Exchange code for token
    async with httpx.AsyncClient() as client:
        token_response = await client.post(
            TOKEN_URL,
            data={
                "grant_type": "authorization_code",
                "code": code,
                "redirect_uri": REDIRECT_URI,
                "client_id": CLIENT_ID,
                "client_secret": CLIENT_SECRET,
            },
            headers={"Content-Type": "application/x-www-form-urlencoded"}
        )

        if token_response.status_code != 200:
            return HTMLResponse(f"<h1>Token Error: {token_response.text}</h1>")

        token_data = token_response.json()
        access_token = token_data.get("access_token")

        # Get user info
        userinfo_response = await client.get(
            USERINFO_URL,
            headers={"Authorization": f"Bearer {access_token}"}
        )

        if userinfo_response.status_code != 200:
            return HTMLResponse(f"<h1>UserInfo Error: {userinfo_response.text}</h1>")

        user_info = userinfo_response.json()

        # Store user info in session
        response = RedirectResponse(url="/", status_code=302)
        set_session_cookie(response, {
            "user_id": user_info.get("sub"),
            "email": user_info.get("email"),
            "name": user_info.get("name") or user_info.get("email"),
            "access_token": access_token
        })

        return response


@app.get("/logout")
async def logout(request: Request):
    """Logout endpoint - clears session and redirects to FusionAuth logout"""
    response = RedirectResponse(url=LOGOUT_URL, status_code=302)
    response.delete_cookie("session")
    return response
