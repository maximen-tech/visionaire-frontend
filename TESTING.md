# Testing Guide - Vision'AI're Frontend

Guide de test pour l'application Vision'AI're.

## Tests E2E (End-to-End) Manuels

### Prérequis

Services démarrés :
```bash
# Terminal 1 - Backend
cd visionaire-bff
uvicorn main:app --reload

# Terminal 2 - Celery Worker
celery -A celery_config.celery_app worker --loglevel=info -Q analysis --pool=solo

# Terminal 3 - Frontend
cd visionaire-frontend
npm run dev
```

### Test 1: Flow Complet Utilisateur

**Objectif**: Tester le parcours complet d'une analyse.

1. **Home Page** (http://localhost:3000)
   - [ ] La page s'affiche correctement
   - [ ] Le Hero "Vision'AI're" est visible
   - [ ] Les 3 feature cards sont présentes (🎯 A1, 📊 A2, 💡 Gaps)
   - [ ] L'input URL accepte les URLs valides
   - [ ] Le bouton "Analyser" est actif

2. **Démarrer une Analyse**
   - [ ] Saisir une URL : `https://www.example.com`
   - [ ] Cliquer sur "Analyser"
   - [ ] Vérifier le spinner de loading s'affiche
   - [ ] Redirection automatique vers `/analysis/[id]`

3. **War Room** (/analysis/[id])
   - [ ] StatusCard affiche l'URL et l'analysis_id
   - [ ] ProgressBar commence à 0%
   - [ ] LogStream affiche le premier log de connexion
   - [ ] Événements SSE arrivent en temps réel
   - [ ] La progression augmente (0% → 10% → 40% → 50% → 90% → 100%)
   - [ ] Les logs s'affichent avec timestamps colorés
   - [ ] Auto-scroll fonctionne dans LogStream
   - [ ] Bouton "Notification Email" est visible

4. **Email Notification** (Optionnel)
   - [ ] Cliquer sur "Activer" notification email
   - [ ] Saisir un email valide
   - [ ] Cliquer "Activer"
   - [ ] Message de confirmation s'affiche
   - [ ] Badge vert avec ✅ apparaît

5. **Résultats** (/results/[id])
   - [ ] Redirection automatique après COMPLETE
   - [ ] Identité A1 s'affiche (secteur, taille, tier)
   - [ ] Score A2 s'affiche (score, benchmark, interprétation)
   - [ ] Top 3 Gaps s'affichent avec impact financier
   - [ ] Formulaire Lead Conversion est visible
   - [ ] Bouton "Nouvelle analyse" fonctionne

6. **Conversion Lead**
   - [ ] Remplir le formulaire (nom, email, téléphone, entreprise)
   - [ ] Cliquer "Prendre rendez-vous"
   - [ ] Spinner de loading s'affiche
   - [ ] Message de succès ✅ apparaît
   - [ ] Formulaire est réinitialisé

### Test 2: Gestion des Erreurs

**Objectif**: Tester la robustesse de l'application.

1. **Erreur API au démarrage**
   - [ ] Arrêter le backend (Ctrl+C sur Terminal 1)
   - [ ] Essayer de démarrer une analyse
   - [ ] Message d'erreur ⚠️ s'affiche sur Home
   - [ ] L'application reste utilisable

2. **Erreur SSE Connection**
   - [ ] Démarrer une analyse
   - [ ] Redirection vers War Room
   - [ ] Arrêter le backend
   - [ ] Message "Connexion au serveur perdue" s'affiche
   - [ ] L'application ne crash pas

3. **URL Invalide**
   - [ ] Saisir une URL invalide : `not-a-url`
   - [ ] Validation HTML5 empêche la soumission
   - [ ] Message du navigateur s'affiche

### Test 3: Responsive Design

**Objectif**: Vérifier l'adaptabilité mobile.

1. **Mobile (375px)**
   - [ ] Hero lisible
   - [ ] Input et bouton empilés verticalement
   - [ ] Feature cards empilées
   - [ ] War Room : colonnes empilées
   - [ ] LogStream scrollable

2. **Tablet (768px)**
   - [ ] Layout 2 colonnes sur War Room
   - [ ] Feature cards sur 3 colonnes

3. **Desktop (1024px+)**
   - [ ] Tout s'affiche correctement
   - [ ] Pas de débordement horizontal

### Test 4: Performance

**Objectif**: Vérifier les performances.

1. **Temps de chargement**
   - [ ] Home page < 1s
   - [ ] War Room < 1s
   - [ ] Résultats < 1s

2. **SSE Streaming**
   - [ ] Événements arrivent en < 500ms
   - [ ] Pas de freeze UI
   - [ ] Auto-scroll fluide

3. **Animations**
   - [ ] Transitions smooth (60fps)
   - [ ] Hover effects réactifs

### Test 5: Accessibilité

**Objectif**: Vérifier l'accessibilité basique.

1. **Navigation Clavier**
   - [ ] Tab focus visible sur tous les inputs
   - [ ] Enter soumet le formulaire
   - [ ] Escape ferme les modals

2. **Contraste**
   - [ ] Texte lisible sur tous les fonds
   - [ ] Labels visibles

3. **Formulaires**
   - [ ] Labels associés aux inputs
   - [ ] Required fields indiqués avec *
   - [ ] Messages d'erreur descriptifs

## Tests Automatisés (Future)

### Installation Playwright (Recommandé)

```bash
npm install -D @playwright/test
npx playwright install
```

### Exemple de Test E2E

```typescript
// tests/e2e/analysis-flow.spec.ts
import { test, expect } from '@playwright/test';

test('complete analysis flow', async ({ page }) => {
  // Home page
  await page.goto('http://localhost:3000');
  await expect(page.locator('h1')).toContainText("Vision'AI're");

  // Start analysis
  await page.fill('input[type="url"]', 'https://www.example.com');
  await page.click('button:has-text("Analyser")');

  // War Room
  await expect(page).toHaveURL(/\/analysis\/.+/);
  await expect(page.locator('h1')).toContainText('War Room');

  // Wait for completion (mock or real)
  await page.waitForURL(/\/results\/.+/, { timeout: 600000 });

  // Results
  await expect(page.locator('h1')).toContainText('Résultats');
  await expect(page.locator('text=Identité')).toBeVisible();
});
```

### Run Tests

```bash
npm run test:e2e
```

## CI/CD Integration

### GitHub Actions

```yaml
# .github/workflows/test.yml
name: E2E Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run build
      - run: npx playwright install --with-deps
      - run: npm run test:e2e
```

## Checklist de Release

Avant chaque déploiement :

- [ ] Tous les tests E2E manuels passent
- [ ] Pas de console errors
- [ ] Build production réussit (`npm run build`)
- [ ] Performance acceptable (Lighthouse > 80)
- [ ] Responsive testé sur 3 devices
- [ ] Backend API fonctionnel
- [ ] Variables d'environnement configurées
