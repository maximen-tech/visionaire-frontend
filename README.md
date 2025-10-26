# Vision'AI're Frontend

Frontend Next.js pour Vision'AI're - Application d'analyse IA de sites web.

## Stack Technique

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Backend API**: FastAPI (visionaire-bff)

## Structure du Projet

```
visionaire-frontend/
├── app/
│   ├── layout.tsx          # Layout racine
│   ├── page.tsx            # Page d'accueil (Hero + Input)
│   └── globals.css         # Styles globaux
├── components/             # Composants réutilisables
├── lib/                    # Utilitaires et helpers
└── public/                 # Assets statiques
```

## Démarrage Rapide

### Installation

```bash
npm install
```

### Développement

```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

### Build Production

```bash
npm run build
npm start
```

## Configuration

### Variables d'environnement

Créer un fichier `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Fonctionnalités

### Sprint 1 (En cours)
- ✅ Hero Section
- ✅ Input URL + Validation
- 🔄 Appel API /api/v1/analysis/start
- 🔄 Redirection vers page d'analyse

### Sprint 2 (À venir)
- [ ] War Room (SSE en temps réel)
- [ ] Progress bar
- [ ] Logs en direct

### Sprint 3 (À venir)
- [ ] Tableau de bord résultats
- [ ] Modale conversion lead
- [ ] Intégration Calendly

## Déploiement

### Vercel (Recommandé)

```bash
vercel deploy
```

## Backend

Le frontend communique avec l'API FastAPI:
- URL locale: `http://localhost:8000`
- Documentation API: `http://localhost:8000/docs`

Voir le repo `visionaire-bff` pour plus de détails.
