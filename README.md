# Vision'AI're - Frontend

Frontend Next.js pour la plateforme d'analyse IA Vision'AI're.

## 🚀 Stack Technique

- **Framework**: Next.js 15.0.2 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 3.4.14
- **Real-time**: Server-Sent Events (EventSource API)
- **Testing**: Playwright 1.56.1 (E2E)
- **Deployment**: Vercel (recommandé)

## 📦 Installation

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Production build
npm run build
npm start

# Lint
npm run lint

# E2E Tests
npm run test:e2e
```

## 🌍 Variables d'Environnement

Créer un fichier `.env.local` :

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_API_VERSION=v1
```

**Production** :
```env
NEXT_PUBLIC_API_URL=https://api.visionaire.com
NEXT_PUBLIC_API_VERSION=v1
```

## 📁 Structure du Projet

```
visionaire-frontend/
├── app/                      # Next.js App Router
│   ├── page.tsx              # Home (Hero + Input URL)
│   ├── analysis/[id]/        # War Room (SSE streaming)
│   │   └── page.tsx
│   └── results/[id]/         # Résultats (A1 + A2 + Gaps)
│       └── page.tsx
├── components/               # Composants réutilisables
│   ├── ProgressBar.tsx       # Barre progression 0-100%
│   ├── LogStream.tsx         # Terminal logs SSE
│   ├── StatusCard.tsx        # Status + métadonnées
│   ├── LeadForm.tsx          # Formulaire conversion
│   └── EmailNotificationButton.tsx
├── lib/                      # Services et types
│   ├── api.ts                # API client (fetch)
│   └── types.ts              # TypeScript interfaces
├── tests/e2e/                # E2E tests (Playwright)
│   ├── analysis-flow.spec.ts
│   ├── error-handling.spec.ts
│   ├── lead-conversion.spec.ts
│   ├── email-notification.spec.ts
│   ├── performance-accessibility.spec.ts
│   ├── visual-regression.spec.ts
│   └── fixtures.ts
├── public/                   # Assets statiques
├── .env.local                # Variables locales (gitignored)
└── tailwind.config.ts        # Configuration Tailwind
```

## 🎯 Fonctionnalités

### Sprint 1 FE ✅
- Hero Section avec branding
- Input URL avec validation
- Feature cards (A1, A2, Gaps)
- Design responsive

### Sprint 2 FE ✅
- War Room avec SSE streaming temps réel
- ProgressBar animée (0-100%)
- LogStream avec auto-scroll
- Page Résultats complète
- API integration (startAnalysis, getResults)

### Sprint 3 FE ✅
- Formulaire Conversion Lead (CRM)
- Notification Email (fallback SSE)
- Améliorations UX (spinner, animations)
- Messages d'erreur détaillés

## 🔌 API Endpoints Consommés

**Backend** : `http://localhost:8000/api/v1`

| Endpoint | Méthode | Description |
|----------|---------|-------------|
| `/analysis/start` | POST | Démarre une analyse |
| `/analysis/{id}/status` | GET | Récupère statut (polling) |
| `/analysis/{id}/stream` | GET | SSE stream temps réel |
| `/analysis/{id}/results-summary` | GET | Résultats complets |
| `/analysis/{id}/notify` | POST | Active notification email |
| `/leads/convert` | POST | Convertit lead CRM |

## 📊 Flux Utilisateur

```
1. Home (/)
   ↓ Saisie URL + Clic "Analyser"
2. POST /api/v1/analysis/start
   ↓ Response: { analysis_id: "abc-123" }
3. Redirect → /analysis/abc-123 (War Room)
   ↓ EventSource connexion SSE
4. Stream événements temps réel
   - INITIATED (0%)
   - RUNNING_A1 (10-40%)
   - RUNNING_A2 (50-90%)
   - COMPLETE (100%)
   ↓ Auto-redirect après 2s
5. Résultats → /results/abc-123
   ↓ GET /api/v1/analysis/abc-123/results-summary
6. Affichage A1 + A2 + Top 3 Gaps
   ↓ Formulaire Lead Conversion
```

## 🧪 Tests

### E2E Testing with Playwright ✅

**Comprehensive test suite: 69 automated tests**

**Coverage:**
- ✅ Complete user flows (Home → War Room → Results)
- ✅ Error handling & edge cases  
- ✅ Lead conversion & CRM integration
- ✅ Email notifications
- ✅ Performance & Accessibility (WCAG 2.1)
- ✅ Visual regression testing

**Quick Commands:**
```bash
# Run all tests (headless)
npm run test:e2e

# Interactive UI mode (recommended for debugging)
npm run test:e2e:ui

# Run with visible browser
npm run test:e2e:headed

# Debug mode (step-by-step)
npm run test:e2e:debug

# View HTML report
npm run test:e2e:report

# Generate test code
npm run test:e2e:codegen
```

**Test Suites:**
```
tests/e2e/
├── analysis-flow.spec.ts          (5 tests)  - Complete user journey
├── error-handling.spec.ts         (19 tests) - Edge cases & errors
├── lead-conversion.spec.ts        (8 tests)  - CRM integration
├── email-notification.spec.ts     (11 tests) - Email fallback
├── performance-accessibility.spec.ts (18 tests) - Perf & A11y
├── visual-regression.spec.ts      (13 tests) - Visual diffs
└── fixtures.ts                    - Test helpers & mocks
```

**📚 Documentation:**
- [E2E Testing Guide](./E2E_TESTING.md) - Complete testing guide
- [Test Suite Summary](./TEST_SUMMARY.md) - Detailed coverage
- [Implementation Summary](./E2E_IMPLEMENTATION_SUMMARY.md) - Setup details
- [Known Issues](./KNOWN_ISSUES.md) - Current test status

**CI/CD Integration:**
- ✅ Automated on every push/PR
- ✅ Parallel execution (3 shards)
- ✅ Test artifacts & traces on failure
- 📍 Workflow: `.github/workflows/playwright.yml`

**⚠️ Note:** Some tests require selector updates to match implementation. See [KNOWN_ISSUES.md](./KNOWN_ISSUES.md).

## 🚢 Déploiement

### Vercel (Recommandé)

1. **Installer Vercel CLI** :
```bash
npm install -g vercel
```

2. **Première fois** :
```bash
vercel
# Follow prompts
```

3. **Déploiements suivants** :
```bash
vercel --prod
```

4. **Configurer variables** :
```bash
vercel env add NEXT_PUBLIC_API_URL production
# Enter: https://api.visionaire.com
```

### Autres Plateformes

**Netlify** :
```bash
npm run build
# Drag & drop .next/static to Netlify
```

**Docker** :
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
CMD ["npm", "start"]
EXPOSE 3000
```

## 🔧 Configuration

### TypeScript

`tsconfig.json` :
```json
{
  "compilerOptions": {
    "strict": true,
    "target": "ES2017",
    "lib": ["dom", "esnext"],
    "paths": { "@/*": ["./*"] }
  }
}
```

### Tailwind CSS

`tailwind.config.ts` :
```ts
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: { extend: {} },
  plugins: [],
}
```

## 🐛 Troubleshooting

**Erreur: Cannot connect to backend**
```bash
# Vérifier backend est démarré
curl http://localhost:8000/docs

# Vérifier NEXT_PUBLIC_API_URL
cat .env.local
```

**Erreur: SSE connection failed**
```bash
# Vérifier Celery worker tourne
celery -A celery_config.celery_app inspect active

# Vérifier Redis
redis-cli ping
```

**Erreur: Build failed**
```bash
# Clean cache
rm -rf .next
npm run build
```

**Erreur: E2E tests failing**
```bash
# Check if dev server is running
curl http://localhost:3000

# View detailed test report
npm run test:e2e:report

# Debug specific test
npx playwright test --debug analysis-flow.spec.ts
```

## 📚 Documentation

- [E2E Testing Guide](./E2E_TESTING.md)
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript](https://www.typescriptlang.org/docs)
- [Playwright](https://playwright.dev)
- [Backend API](../visionaire-bff/README.md)

## 🤝 Contributing

1. Fork le repo
2. Créer une branche (`git checkout -b feature/amazing`)
3. Commit (`git commit -m 'feat: Add amazing feature'`)
4. **Run E2E tests** (`npm run test:e2e`)
5. Push (`git push origin feature/amazing`)
6. Ouvrir une PR

## 📝 License

Propriétaire - Vision'AI're © 2025
