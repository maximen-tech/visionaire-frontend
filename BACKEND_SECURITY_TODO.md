# Backend Security TODO - BFF (Railway)

**Date:** October 28, 2025
**Frontend Security Status:** ✅ COMPLETED (Session 6)
**Backend Security Status:** ⚠️ REQUIRES IMPLEMENTATION

---

## 📋 Overview

Ce document liste les mesures de sécurité à implémenter côté **Backend (BFF déployé sur Railway)** pour compléter la stack de sécurité. Le frontend a déjà implémenté:
- ✅ Security headers (CSP, HSTS, X-Frame-Options, etc.)
- ✅ Input sanitization client-side (DOMPurify)
- ✅ Client-side rate limiting
- ✅ URL validation stricte
- ✅ Middleware Next.js pour headers
- ✅ Next.js 15.5.6 (patched critical vulnerabilities)

**Ce qui reste pour le backend:**

---

## 🔴 HAUTE PRIORITÉ (Critique pour Production)

### 1. Rate Limiting sur API Endpoints 🚨

**Status:** ⚠️ À IMPLÉMENTER
**Priorité:** 🔴 CRITIQUE
**Temps estimé:** 2-3 heures

**Pourquoi:**
- Protection contre DDoS et abus
- Empêche les attaques par force brute
- Réduit la charge serveur

**Endpoints à protéger:**
```python
POST /api/analysis/start
  → Max 3 requêtes par IP par minute
  → Max 10 requêtes par IP par heure

GET /api/analysis/{id}/status
  → Max 60 requêtes par IP par minute (polling)

POST /api/leads/convert
  → Max 5 requêtes par IP par heure
  → Max 2 requêtes par email par jour

GET /api/analysis/{id}/results
  → Max 10 requêtes par IP par minute
```

**Implémentation recommandée:**
- **Framework:** FastAPI → `slowapi` (Redis-backed)
- **Alternative:** Flask → `Flask-Limiter` (Redis ou Memcached)

**Exemple avec slowapi (FastAPI):**
```python
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

@app.post("/api/analysis/start")
@limiter.limit("3/minute")
async def start_analysis(request: Request, ...):
    pass

@app.post("/api/leads/convert")
@limiter.limit("5/hour")
async def convert_lead(request: Request, ...):
    pass
```

**Configuration Redis:**
```python
# Railway Redis addon
REDIS_URL = os.getenv("REDIS_URL")
limiter = Limiter(
    key_func=get_remote_address,
    storage_uri=REDIS_URL
)
```

**Tests:**
- Déclencher 4+ requêtes en 1 minute → doit retourner HTTP 429
- Vérifier header `Retry-After` présent
- Tester avec différentes IPs (Cloudflare/Proxy aware)

---

### 2. CORS Configuration Stricte

**Status:** ⚠️ À VÉRIFIER
**Priorité:** 🔴 CRITIQUE
**Temps estimé:** 30 minutes

**Actuellement configuré?**
- ✅ Probablement déjà configuré (à confirmer)
- ⚠️ Vérifier que seul le domaine frontend est autorisé

**Configuration recommandée:**
```python
from fastapi.middleware.cors import CORSMiddleware

origins = [
    "https://visionai.re",           # Production
    "https://www.visionai.re",       # WWW variant
    "https://visionaire-frontend.vercel.app",  # Vercel preview
    "http://localhost:3000",         # Dev local
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST"],  # Seulement les méthodes utilisées
    allow_headers=["Content-Type", "Authorization"],
    max_age=600,  # Cache preflight 10 minutes
)
```

**À ÉVITER:**
```python
# ❌ NE JAMAIS FAIRE EN PRODUCTION
allow_origins=["*"]  # Permet tous les domaines
```

**Tests:**
- Requête depuis `https://visionai.re` → doit fonctionner
- Requête depuis `https://malicious-site.com` → doit être bloquée (pas de headers CORS)
- Vérifier avec `curl -H "Origin: https://evil.com" ...`

---

### 3. Input Validation & Sanitization Server-Side 🛡️

**Status:** ⚠️ À IMPLÉMENTER
**Priorité:** 🔴 CRITIQUE
**Temps estimé:** 3-4 heures

**Pourquoi:**
- Le frontend n'est PAS fiable (peut être contourné)
- Protection contre SQL Injection, NoSQL Injection, XSS
- Validation business logic côté serveur

**Librairies recommandées:**
```python
pip install pydantic  # Validation de schémas
pip install validators  # Validation URL, email, etc.
pip install bleach  # HTML sanitization
pip install python-decouple  # Env vars sécurisés
```

**Validation stricte pour chaque endpoint:**

#### POST /api/analysis/start
```python
from pydantic import BaseModel, HttpUrl, validator
import validators

class AnalysisStartRequest(BaseModel):
    url: HttpUrl

    @validator('url')
    def validate_url(cls, v):
        # Bloquer localhost et IPs privées
        parsed = urlparse(str(v))

        if parsed.hostname in ['localhost', '127.0.0.1', '0.0.0.0']:
            raise ValueError("Local URLs not allowed")

        # Bloquer IPs privées (10.x, 172.16-31.x, 192.168.x)
        if re.match(r'^(10\.|172\.(1[6-9]|2[0-9]|3[01])\.|192\.168\.)', parsed.hostname):
            raise ValueError("Private IPs not allowed")

        # Seulement HTTP/HTTPS
        if parsed.scheme not in ['http', 'https']:
            raise ValueError("Only HTTP/HTTPS allowed")

        return v
```

#### POST /api/leads/convert
```python
import bleach
import validators

class LeadConversionRequest(BaseModel):
    analysis_id: str
    name: str
    email: str
    phone: str
    company: str

    @validator('name', 'company')
    def sanitize_text(cls, v):
        # Supprimer HTML
        clean = bleach.clean(v, tags=[], strip=True)

        # Vérifier longueur
        if len(clean) > 100:
            raise ValueError("Max 100 characters")

        # Vérifier caractères alphanumériques + espaces
        if not re.match(r'^[a-zA-Z0-9\s\-\'.àâçéèêëîïôûùüÿñæœ]+$', clean):
            raise ValueError("Invalid characters")

        return clean

    @validator('email')
    def validate_email(cls, v):
        v = v.strip().lower()

        if not validators.email(v):
            raise ValueError("Invalid email format")

        # Bloquer emails jetables (optionnel)
        disposable_domains = ['mailinator.com', 'guerrillamail.com', 'temp-mail.org']
        domain = v.split('@')[1]
        if domain in disposable_domains:
            raise ValueError("Disposable emails not allowed")

        return v

    @validator('phone')
    def validate_phone(cls, v):
        # Supprimer tous les non-chiffres
        digits = re.sub(r'\D', '', v)

        # Vérifier 10 chiffres (Canada/US)
        if len(digits) != 10:
            raise ValueError("Phone must be 10 digits")

        return digits
```

**Protection contre NoSQL Injection (si MongoDB/DynamoDB):**
```python
# ❌ DANGEREUX
query = {"email": request.email}  # Si email = {"$gt": ""}

# ✅ SÛR
query = {"email": str(request.email)}  # Toujours caster en string
```

---

### 4. Authentication & Authorization (Futur)

**Status:** ⚠️ PAS ENCORE REQUIS
**Priorité:** 🟡 MOYENNE (pour fonctionnalités futures)
**Temps estimé:** 8-12 heures

**Actuellement:**
- Pas d'authentication requise (analyse gratuite publique)
- `analysis_id` est l'unique identifiant (UUID)

**Quand implémenter:**
- Si ajout de dashboard client
- Si ajout de fonctionnalités premium
- Si stockage de données sensibles

**Recommandation future:**
```python
# JWT tokens avec FastAPI
from fastapi_jwt_auth import AuthJWT

@app.post("/api/leads/convert")
@limiter.limit("5/hour")
async def convert_lead(
    request: LeadConversionRequest,
    Authorize: AuthJWT = Depends()
):
    # Vérifier JWT token
    Authorize.jwt_required()
    current_user = Authorize.get_jwt_subject()

    # ...
```

---

## 🟡 MOYENNE PRIORITÉ (Recommandé)

### 5. HTTPS Enforcement

**Status:** ✅ PROBABLEMENT DÉJÀ FAIT (Railway)
**Priorité:** 🟡 VÉRIFIER
**Temps estimé:** 10 minutes

**Railway auto-configure:**
- Certificats SSL automatiques
- Redirection HTTP → HTTPS

**À vérifier:**
```bash
# Tester redirection HTTP → HTTPS
curl -I http://visionaire-bff-production.up.railway.app
# Doit retourner: HTTP/1.1 301 Moved Permanently
# Location: https://...
```

**Si pas configuré:**
```python
from fastapi.middleware.httpsredirect import HTTPSRedirectMiddleware

if os.getenv("ENVIRONMENT") == "production":
    app.add_middleware(HTTPSRedirectMiddleware)
```

---

### 6. Security Headers (Backend)

**Status:** ⚠️ À AJOUTER
**Priorité:** 🟡 RECOMMANDÉ
**Temps estimé:** 30 minutes

**Headers à ajouter sur toutes les réponses API:**

```python
from fastapi.middleware import Middleware
from starlette.middleware.base import BaseHTTPMiddleware

class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request, call_next):
        response = await call_next(request)

        # Security headers
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["X-XSS-Protection"] = "1; mode=block"
        response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
        response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"

        # Cache control pour API responses
        if request.url.path.startswith("/api"):
            response.headers["Cache-Control"] = "no-store, max-age=0"

        return response

app.add_middleware(SecurityHeadersMiddleware)
```

---

### 7. Logging & Monitoring (Sentry Backend)

**Status:** ⚠️ À IMPLÉMENTER
**Priorité:** 🟡 RECOMMANDÉ
**Temps estimé:** 1-2 heures

**Actuellement:**
- Frontend a Sentry configuré ✅
- Backend devrait aussi avoir Sentry

**Installation:**
```bash
pip install sentry-sdk[fastapi]
```

**Configuration:**
```python
import sentry_sdk
from sentry_sdk.integrations.fastapi import FastApiIntegration

sentry_sdk.init(
    dsn=os.getenv("SENTRY_DSN"),
    integrations=[
        FastApiIntegration(),
    ],
    traces_sample_rate=0.1,  # 10% transactions
    environment=os.getenv("ENVIRONMENT", "production"),
    release=os.getenv("RAILWAY_GIT_COMMIT_SHA"),  # Railway auto-set
)
```

**Logger les événements de sécurité:**
```python
import logging

logger = logging.getLogger(__name__)

@app.post("/api/leads/convert")
async def convert_lead(...):
    try:
        # ...
        logger.info(f"Lead converted: {lead_id}")
    except ValidationError as e:
        logger.warning(f"Invalid lead data: {e}")
        sentry_sdk.capture_exception(e)
```

---

### 8. Database Security (Si applicable)

**Status:** ⚠️ À VÉRIFIER
**Priorité:** 🟡 SELON DB UTILISÉE
**Temps estimé:** 1-2 heures

**Si PostgreSQL/MySQL:**
```python
# Utiliser parameterized queries (SQLAlchemy auto-protect)
session.query(Analysis).filter(Analysis.id == analysis_id).first()

# ❌ JAMAIS faire du string formatting
query = f"SELECT * FROM analysis WHERE id = '{analysis_id}'"  # SQL Injection!
```

**Si MongoDB:**
```python
# Sanitizer les queries
from pymongo import MongoClient

# ✅ Toujours caster en string
analysis = db.analyses.find_one({"_id": str(analysis_id)})

# ❌ Ne jamais passer objet directement
analysis = db.analyses.find_one({"_id": request.get("id")})  # NoSQL Injection!
```

**Connection strings sécurisées:**
```python
# ✅ Utiliser env vars
DATABASE_URL = os.getenv("DATABASE_URL")

# ❌ Ne jamais hardcoder
DATABASE_URL = "postgresql://user:password@localhost/db"
```

---

## 🟢 BASSE PRIORITÉ (Nice to Have)

### 9. API Versioning

**Status:** ⚠️ PAS IMPLÉMENTÉ
**Priorité:** 🟢 FUTUR
**Temps estimé:** 2-3 heures

**Bénéfices:**
- Permet de déprécier des endpoints
- Facilite les migrations

**Implémentation:**
```python
# v1/
@app.post("/api/v1/analysis/start")
async def start_analysis_v1(...):
    pass

# v2/ (futur)
@app.post("/api/v2/analysis/start")
async def start_analysis_v2(...):
    pass
```

---

### 10. Request ID Tracing

**Status:** ⚠️ PAS IMPLÉMENTÉ
**Priorité:** 🟢 NICE TO HAVE
**Temps estimé:** 1 heure

**Bénéfices:**
- Facilite debugging entre frontend et backend
- Corrélation logs Sentry

**Implémentation:**
```python
import uuid

class RequestIDMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request, call_next):
        # Récupérer ou créer request_id
        request_id = request.headers.get("X-Request-ID", str(uuid.uuid4()))

        # Ajouter au context logging
        logger = logging.LoggerAdapter(
            logging.getLogger(__name__),
            {"request_id": request_id}
        )

        response = await call_next(request)
        response.headers["X-Request-ID"] = request_id

        return response

app.add_middleware(RequestIDMiddleware)
```

---

## 📊 Security Checklist Récapitulatif

### Critique (À faire avant production publique)
- [ ] Rate limiting sur tous les endpoints (slowapi + Redis)
- [ ] CORS configuré strictement (seulement visionai.re)
- [ ] Input validation server-side (Pydantic + validators)
- [ ] Input sanitization (bleach pour HTML)
- [ ] Bloquer localhost et IPs privées
- [ ] HTTPS enforcement vérifié
- [ ] Security headers ajoutés
- [ ] NoSQL/SQL injection protection

### Recommandé (Semaine 1-2)
- [ ] Sentry backend intégré
- [ ] Logging événements de sécurité
- [ ] Database queries sécurisées
- [ ] Environment variables pour secrets

### Nice to Have (Mois 1-2)
- [ ] API versioning
- [ ] Request ID tracing
- [ ] Authentication/Authorization (si requis)
- [ ] Automated security tests (OWASP ZAP)

---

## 🔧 Testing Security

### Tests à effectuer après implémentation:

**1. Rate Limiting:**
```bash
# Tester rate limit
for i in {1..10}; do
  curl -X POST https://visionaire-bff-production.up.railway.app/api/analysis/start \
    -H "Content-Type: application/json" \
    -d '{"url": "https://example.com"}'
done
# Après 3 requêtes, doit retourner HTTP 429
```

**2. CORS:**
```bash
# Test avec origin autorisé
curl -H "Origin: https://visionai.re" \
     -H "Access-Control-Request-Method: POST" \
     -X OPTIONS \
     https://visionaire-bff-production.up.railway.app/api/analysis/start

# Test avec origin non autorisé
curl -H "Origin: https://evil.com" \
     -H "Access-Control-Request-Method: POST" \
     -X OPTIONS \
     https://visionaire-bff-production.up.railway.app/api/analysis/start
# Pas de headers CORS dans response
```

**3. Input Validation:**
```bash
# Test XSS
curl -X POST .../api/leads/convert \
  -d '{"name": "<script>alert(1)</script>", ...}'
# Doit retourner 422 Validation Error

# Test SQL Injection
curl -X POST .../api/leads/convert \
  -d '{"email": "admin@example.com' OR '1'='1", ...}'
# Doit retourner 422 Validation Error

# Test localhost bypass
curl -X POST .../api/analysis/start \
  -d '{"url": "http://localhost:8000/admin"}'
# Doit retourner 400 Bad Request
```

**4. Security Headers:**
```bash
curl -I https://visionaire-bff-production.up.railway.app/api/health
# Vérifier présence de:
# X-Content-Type-Options: nosniff
# X-Frame-Options: DENY
# Strict-Transport-Security: max-age=31536000
```

---

## 📚 Resources

**Documentation:**
- FastAPI Security: https://fastapi.tiangolo.com/tutorial/security/
- OWASP Top 10: https://owasp.org/www-project-top-ten/
- Railway Security: https://docs.railway.app/reference/security

**Librairies recommandées:**
```bash
pip install slowapi           # Rate limiting
pip install pydantic          # Input validation
pip install validators        # URL/Email validation
pip install bleach            # HTML sanitization
pip install sentry-sdk        # Error tracking
pip install python-decouple   # Env vars
```

**Tools pour tester:**
- Postman (tests API manuels)
- OWASP ZAP (automated security scanner)
- Burp Suite Community (penetration testing)
- SecurityHeaders.com (tester headers HTTP)

---

## 🎯 Priorités par Sprint

### Sprint 1 (Semaine avant production) 🔴 CRITIQUE
1. Rate limiting (slowapi)
2. Input validation server-side
3. CORS verification
4. HTTPS enforcement check

### Sprint 2 (Semaine 1 production) 🟡 IMPORTANT
1. Sentry backend
2. Security headers
3. Logging sécurité
4. Tests sécurité

### Sprint 3 (Mois 1) 🟢 AMÉLIORATION
1. API versioning
2. Request tracing
3. Automated security tests
4. Documentation sécurité

---

**Document créé:** October 28, 2025
**Frontend Security:** ✅ Session 6 complétée
**Backend Ownership:** Backend Team / DevOps
**Questions:** Contacter l'équipe frontend pour clarifications

---

FIN DU BACKEND SECURITY TODO
