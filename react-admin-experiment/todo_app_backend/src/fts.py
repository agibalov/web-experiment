import re
from typing import Optional

TOKEN_RE  = re.compile(r'[^"\s]+', re.UNICODE)
PHRASE_RE = re.compile(r'"([^"]+)"', re.UNICODE)

OP_TOKENS = {"and", "or", "not", "near"}
EDGE_STRIP = ':+-()|~"*\''

def _clean_token(tok: str, *, allow_ops: bool) -> str:
    t = tok.strip().lower().strip(EDGE_STRIP)
    if not t:
        return ""
    if not allow_ops and t in OP_TOKENS:
        return ""
    t = t.replace('"', "")
    return t[:64]

def _tokens_from(text: str, *, allow_ops: bool) -> list[str]:
    out = []
    for raw in TOKEN_RE.findall(text):
        t = _clean_token(raw, allow_ops=allow_ops)
        if t:
            out.append(t)
            if len(out) >= 20:
                break
    return out

def build_match(user_text: str) -> Optional[str]:
    s = (user_text or "").strip()
    if not s:
        return None

    phrases = []
    for m in PHRASE_RE.finditer(s):
        ptoks = _tokens_from(m.group(1), allow_ops=True)   # <- keep 'and'
        if ptoks:
            phrases.append('"' + " ".join(ptoks) + '"')

    remaining = PHRASE_RE.sub(" ", s)
    words = _tokens_from(remaining, allow_ops=False)
    prefixes = [f"{w}*" for w in words]

    terms = phrases + prefixes
    return " AND ".join(terms) if terms else None
