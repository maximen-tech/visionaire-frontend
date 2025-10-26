# Vision'AI're - Frontend

Frontend Next.js pour la plateforme d'analyse IA Vision'AI're.

## 🚀 Stack Technique

- **Framework**: Next.js 15.0.2 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 3.4.14
- **Real-time**: Server-Sent Events (EventSource API)
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

Voir [`TESTING.md`](./TESTING.md) pour le guide complet.

**Tests E2E Manuels** :
```bash
# 1. Démarrer services
# Terminal 1: Backend (voir visionaire-bff/README.md)
# Terminal 2: Celery Worker
# Terminal 3: Frontend
npm run dev

# 2. Tester dans le browser
open http://localhost:3000
```

**Tests Automatisés (Future)** :
```bash
npm install -D @playwright/test
npx playwright install
npm run test:e2e
```

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

## 📚 Documentation

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript](https://www.typescriptlang.org/docs)
- [Backend API](../visionaire-bff/README.md)

## 🤝 Contributing

1. Fork le repo
2. Créer une branche (`git checkout -b feature/amazing`)
3. Commit (`git commit -m 'feat: Add amazing feature'`)
4. Push (`git push origin feature/amazing`)
5. Ouvrir une PR

## 📝 License

Propriétaire - Vision'AI're © 2025
