# 🎨 VISION'AI'RE - ROADMAP DESIGN "ARCHITECTE DU TEMPS"

**Date:** 2025-10-28  
**Destinataire:** Claude Code (Terminal)  
**Objectif:** Implémenter le design "Blueprint Time-First" sur Vision'AI're  
**Durée estimée:** 12 heures de développement  
**Priorité:** HAUTE - Différenciation visuelle critique  

---

## 📋 CONTEXTE PROJET

### Statut Actuel
- ✅ Frontend live sur Vercel: https://visionaire-frontend.vercel.app
- ✅ Backend opérationnel: Railway (FastAPI + Celery)
- ✅ Fonctionnalités complètes (3 pages, SSE, E2E tests)
- ❌ Design basique et générique (ressemble à 1000 autres sites)

### Changement Stratégique (Phase 2)
```
ANCIEN: Focus revenus ($CAD)
NOUVEAU: Focus temps sauvé (heures/semaine)

Raison: Temps = Vie > Argent (connexion émotionnelle PME)
```

### Vision Design Cible
**Concept:** "L'Architecte du Temps"  
**Métaphore:** Vision'AI're dessine le blueprint de 1000 heures/an de temps libre  
**Différenciation:** Blueprint aesthetic + Palette unique (Slate/Amber/Cyan)  

---

## 🎯 OBJECTIFS DESIGN

### 1. Unique & Mémorable
- Palette couleurs jamais vue en SaaS B2B
- Blueprint grid background (lignes architecturales)
- Iconographie 3D isométrique (hourglass, gears, compass)

### 2. Inspire Confiance (PME Québécoises)
- Métaphore architecture = Solidité + Expertise
- Langage professionnel (pas startup hype SF)
- Focus pragmatique (heures = ROI tangible)

### 3. Cohérence Time-First
- Hero: "Récupérez 1000 heures/an"
- Waiting Room: "Dessin de votre blueprint temps"
- Results: "Votre plan de récupération temps"

---

## 🎨 DESIGN SYSTEM À CRÉER

### Palette de Couleurs (Unique)

```css
/* PRIMARY: Ardoise Profonde (Confiance, Solidité) */
--slate-900: #0f172a
--slate-800: #1e293b
--slate-700: #334155
--slate-600: #475569

/* ACCENT: Ambre Québécois (Chaleur, Expertise, Temps Précieux) */
--amber-500: #f59e0b
--amber-400: #fbbf24
--amber-300: #fcd34d

/* HIGHLIGHT: Cyan Électrique (Innovation IA, Tech) */
--cyan-500: #06b6d4
--cyan-400: #22d3ee

/* SUCCESS: Émeraude (Temps Récupéré, Résultats) */
--emerald-500: #10b981
--emerald-400: #34d399

/* NEUTRAL */
--zinc-50: #fafafa
--zinc-900: #18181b
```

**Rationale:**
- ❌ Pas de bleu/violet générique (saturé en SaaS)
- ✅ Ardoise = Plus mature que bleu startup
- ✅ Ambre = Référence érable/or québécois (subtile)
- ✅ Cyan = Tech/IA (utilisé avec parcimonie)

### Typographie

```typescript
// Headings: Space Grotesk (Géométrique, architectural)
font-family: 'Space Grotesk', sans-serif
font-weight: 700 (Bold)
letter-spacing: -0.02em (Tight, moderne)

// Body: Inter (Lisibilité maximale)
font-family: 'Inter', sans-serif
font-weight: 400-500

// Data/Code: JetBrains Mono (Specs techniques)
font-family: 'JetBrains Mono', monospace
// Pour: Scores, heures, metrics (évoque précision)
```

**Échelle:**
```
text-hero: 56px (3.5rem)    → Hero titles
text-section: 36px (2.25rem) → Section titles
text-xl: 20px               → Card titles
text-base: 16px             → Body
text-sm: 14px               → Small text
```

### Iconographie

**Style:** 3D Isométrique (style blueprint technique)

**Icons clés:**
- ⏰ Hourglass 3D → Temps sauvé
- ⚙️ Gears mechanism → Automatisation
- 🧭 Compass → Guidance/Navigation
- 📐 Ruler/Protractor → Mesure/Précision
- 🏗️ Blueprint grid → Background pattern

**Sources recommandées:**
- Spline.design (créer custom 3D)
- Iconscout 3D Library (premium)
- Lucide React (fallback 2D si besoin)

---

## 🏗️ ARCHITECTURE FICHIERS

### Structure Projet Frontend

```
visionaire-frontend/
├── app/
│   ├── page.tsx                    → Homepage (refonte hero)
│   ├── waiting-room/[id]/page.tsx  → NOUVEAU (ex-analysis)
│   └── results/[id]/page.tsx       → Results refonte
│
├── components/
│   ├── design-system/
│   │   ├── BlueprintGrid.tsx       → NOUVEAU (animated background)
│   │   ├── GlassmorphicCard.tsx    → NOUVEAU (card style)
│   │   └── PulsingButton.tsx       → NOUVEAU (CTA avec glow)
│   │
│   ├── ProgressiveMessage.tsx      → NOUVEAU (Waiting Room message)
│   ├── OpportunityCard.tsx         → NOUVEAU (Results cards)
│   ├── ComplexityBar.tsx           → NOUVEAU (visual 1-10 bar)
│   └── (existing components...)
│
├── lib/
│   ├── design-tokens.ts            → NOUVEAU (couleurs, spacing)
│   └── animations.ts               → NOUVEAU (Framer Motion variants)
│
├── tailwind.config.js              → MODIFIER (custom palette)
└── package.json                    → AJOUTER: framer-motion, @splinetool/react-spline
```

---

## 📐 PHASE 1: DESIGN SYSTEM (3h)

### 1.1 Tailwind Config Custom

**Fichier:** `tailwind.config.js`

**Instructions:**
```javascript
Créer configuration Tailwind custom avec:

1. Extend colors:
   - Ajouter palette complète (slate-*, amber-*, cyan-*, emerald-*)
   - Définir comme primary/accent/highlight/success

2. Extend fontFamily:
   - headings: 'Space Grotesk'
   - body: 'Inter'
   - mono: 'JetBrains Mono'

3. Extend fontSize:
   - hero: ['3.5rem', { lineHeight: '1.1' }]
   - section: ['2.25rem', { lineHeight: '1.2' }]

4. Extend animation:
   - 'blueprint-draw': keyframe pour lignes qui se dessinent
   - 'glow-pulse': keyframe pour button glow
   - 'typewriter': keyframe pour texte progressive
```

**Validation:**
- Tester classes: `bg-slate-800`, `text-amber-500`, `font-heading`

---

### 1.2 Design Tokens

**Fichier:** `lib/design-tokens.ts`

**Instructions:**
```typescript
Créer fichier TypeScript exportant:

1. Spacing scale cohérente:
   - spacing.xs, sm, md, lg, xl (multiples de 8px)

2. Border radius:
   - rounded.sm, md, lg, xl

3. Shadows:
   - shadow.sm, md, lg (subtle, pas aggressive)
   - shadow.glow-cyan, glow-amber (pour effets)

4. Transitions:
   - duration.fast, normal, slow
   - easing.smooth, bounce

5. Z-index scale:
   - z.background, content, overlay, modal
```

---

### 1.3 Components Design System

#### A) BlueprintGrid.tsx

**Fichier:** `components/design-system/BlueprintGrid.tsx`

**Instructions:**
```
Créer composant React:

Fonctionnalités:
- SVG grid pattern (lignes fines cyan-500/10)
- Animation: Lignes se "dessinent" progressivement au load (1.5s)
- Props: density ('low' | 'high'), animated (boolean)

Style:
- Position absolute, full width/height
- Z-index background
- Opacity subtile (ne pas dominer le contenu)

Tech:
- SVG pattern avec <line> elements
- Framer Motion pour animation (stroke-dashoffset)
```

**Usage attendu:**
```tsx
<BlueprintGrid density="low" animated={true} />
```

---

#### B) GlassmorphicCard.tsx

**Fichier:** `components/design-system/GlassmorphicCard.tsx`

**Instructions:**
```
Créer composant card moderne:

Style:
- Background: rgba(255,255,255,0.1) avec backdrop-blur-lg
- Border: 1px solid rgba(255,255,255,0.2)
- Shadow: Subtle, pas trop prononcée
- Border radius: 16px (rounded-xl)

Props:
- children: ReactNode
- variant: 'default' | 'highlighted' (cyan border si highlighted)
- className: string (merge avec classes de base)

Hover state:
- Transform: translateY(-2px)
- Shadow augmente légèrement
- Transition smooth (0.3s)
```

---

#### C) PulsingButton.tsx

**Fichier:** `components/design-system/PulsingButton.tsx`

**Instructions:**
```
Créer CTA button signature:

Style:
- Background: Gradient amber-500 → amber-600
- Text: slate-900 (contraste élevé)
- Padding: px-8 py-4
- Border radius: rounded-full
- Font: Bold, tracking-tight

Animation:
- Idle: Subtle glow pulse (2s loop)
- Hover: Scale 1.05 + shadow increase + glow intensifie
- Click: Scale 0.98 (feedback tactile)

Icon support:
- Props leftIcon, rightIcon (ReactNode)
- Spacing approprié avec texte

States:
- Loading (spinner + texte "Analyse en cours...")
- Disabled (opacity 50%, cursor not-allowed)
```

**Usage attendu:**
```tsx
<PulsingButton 
  onClick={handleSubmit} 
  leftIcon={<CompassIcon />}
>
  Dessiner mon blueprint
</PulsingButton>
```

---

## 📐 PHASE 2: HERO SECTION REFONTE (3h)

### 2.1 Homepage Hero

**Fichier:** `app/page.tsx`

**Instructions:**
```
Refondre section hero (conserver fonctionnalité existante):

Layout:
1. BlueprintGrid en background (animated)
2. Container centré (max-w-4xl)
3. Heading + Subheading + Input + Button
4. Trust badges en bas (3 stats)

Contenu:
- H1: "⏰ Récupérez 1 000 heures par an"
- Subheading: "Votre blueprint temps libre en 10 minutes"
- Input placeholder: "https://votresite.com"
- Button: "Dessiner mon blueprint" (compass icon)

Trust badges (row de 3):
- "✓ 500+ blueprints créés"
- "✓ 480,000 heures récupérées"
- "✓ Résultats en 10 minutes"

Styling:
- H1: text-hero, font-heading, gradient text (slate-900 → slate-700)
- Subheading: text-xl, text-slate-600
- Input: GlassmorphicCard style, focus:border-cyan-500
- Button: PulsingButton component

Animation:
- H1: Fade in + slide up (0.6s delay)
- Input: Fade in (0.8s delay)
- Button: Fade in (1.0s delay)
- Trust badges: Stagger animation (1.2s delay start)

Responsive:
- Desktop: Tout centré
- Mobile: Stack vertical, padding approprié
```

**Validation:**
- Tester soumission formulaire → redirect /waiting-room/[id]
- Vérifier animations smooth
- Tester responsive mobile

---

### 2.2 Input Field "Drafting Table"

**Instructions spécifiques pour input:**
```
Style unique pour input URL:

Base:
- Background: GlassmorphicCard
- Border: 2px solid slate-300
- Padding: py-4 px-6
- Font: text-lg
- Placeholder color: slate-400

Focus state:
- Border: 2px solid cyan-500
- Shadow: 0 0 20px rgba(6, 182, 212, 0.3) (cyan glow)
- Outline: none (utiliser border)

Validation state:
- Error: border-red-500 + shake animation
- Success: border-emerald-500 + checkmark icon

Icon:
- Left icon: Globe/Link (lucide-react)
- Color: slate-500
```

---

## 📐 PHASE 3: WAITING ROOM REFONTE (4h)

### 3.1 Route Structure

**Fichier:** `app/waiting-room/[id]/page.tsx`

**Instructions:**
```
Créer nouvelle route (renommer de /analysis/[id]):

1. Copier logique existante de analysis/[id]:
   - SSE connection (EventSource)
   - Progress tracking (0-100%)
   - Status detection (INITIATED → COMPLETE)
   - Auto-redirect vers /results/[id]

2. MODIFIER layout complètement:
   - Dual-view: Logs (35%) + Message (65%)
   - Desktop: Side-by-side
   - Mobile: Stack vertical (logs en bas)

3. AJOUTER message completion logic:
   - NE PAS redirect automatiquement
   - Attendre fin message Phase 5
   - Afficher button "Voir résultats" après 3 sec pause
   - User click → redirect
```

---

### 3.2 Dual-View Layout

**Instructions layout:**
```
Structure HTML:

<div className="grid grid-cols-1 lg:grid-cols-[35%_65%] gap-6">
  
  {/* LEFT: Logs Terminal */}
  <div className="bg-slate-900 rounded-xl p-6 font-mono">
    <h3>🔧 Logs Technique</h3>
    <div className="space-y-2">
      {logs.map(log => (
        <LogEntry 
          timestamp={log.timestamp}
          message={log.message}
          type={log.type}  // 'info' | 'success' | 'warning'
        />
      ))}
    </div>
  </div>

  {/* RIGHT: Progressive Message */}
  <div className="bg-white rounded-xl p-8">
    <ProgressiveMessage 
      phase={currentPhase}
      progress={progress}
      identityData={identityData}
      opportunitiesData={opportunitiesData}
      onComplete={handleMessageComplete}
    />
  </div>

</div>

{/* BOTTOM: Progress Bar */}
<div className="mt-6">
  <ProgressBar progress={progress} />
</div>

{/* BUTTON: Only after message complete */}
{showButton && (
  <PulsingButton onClick={() => router.push(`/results/${id}`)}>
    Voir mon blueprint
  </PulsingButton>
)}
```

**Styling:**
- Logs: Terminal style (bg-slate-900, text-emerald-400, font-mono)
- Message: Prose large, text-slate-700, line-height 1.7
- Progress bar: Style blueprint (line animation, pas barre plate)

---

### 3.3 LogEntry Component

**Fichier:** `components/LogEntry.tsx`

**Instructions:**
```
Créer composant pour log technique:

Props:
- timestamp: string (format "HH:MM:SS")
- message: string
- type: 'info' | 'success' | 'warning' | 'error'

Style:
- Layout: [timestamp] [icon] [message]
- Font: JetBrains Mono
- Colors selon type:
  - info: text-cyan-400
  - success: text-emerald-400 (avec ✓)
  - warning: text-amber-400 (avec ⚠)
  - error: text-red-400 (avec ✗)

Animation:
- Apparition: Fade in from bottom (0.3s)
- Auto-scroll container vers bottom
```

---

### 3.4 ProgressiveMessage Component

**Fichier:** `components/ProgressiveMessage.tsx`

**Instructions:**
```
COMPOSANT CRITIQUE (cœur de l'expérience):

Fonctionnalités:
1. Détection phase automatique (basé sur progress %)
2. Affichage contenu phase correspondante
3. Effet typewriter (20ms par caractère)
4. Injection données dynamiques (company_name, heures, etc.)
5. Callback onComplete quand Phase 5 terminée

Props:
interface ProgressiveMessageProps {
  phase: number;               // 1-5
  progress: number;            // 0-100
  identityData: IdentityA1 | null;
  opportunitiesData: OpportunitiesData | null;
  onComplete: () => void;
}

Mapping phases:
- Phase 1: 0-20% progress
- Phase 2: 20-45% progress
- Phase 3: 45-75% progress
- Phase 4: 75-95% progress
- Phase 5: 95-100% progress

Typewriter effect:
- Utiliser state + setTimeout
- Vitesse: 20ms/caractère
- Respecter ponctuation (pause 200ms sur . ! ?)
- Pause 500ms entre paragraphes

Contenu phases:
(Voir détails complets dans document PHASE 2 changements)

Phase 1: Bienvenue
- "👋 Bonjour [owner_first_name || ""]!"
- Explication puissance IA
- Mention Gemini 2.5 Pro

Phase 2: Découverte
- "🔍 DÉCOUVERTE EN COURS..."
- Affichage données identity_a1 au fur et à mesure
- Company name, secteur, taille, tier

Phase 3: Analyse
- "📊 ANALYSE APPROFONDIE..."
- Liste des dimensions analysées
- Tease opportunités

Phase 4: Révélation
- "🎯 CALCUL DES OPPORTUNITÉS..."
- Affichage heures_per_week pour chaque dimension
- Suspense avant total

Phase 5: Invitation
- "💎 VOTRE BLUEPRINT EST PRÊT!"
- Total heures/semaine et heures/an
- CTA "Découvrir maintenant"

Fallback owner_first_name:
Si null → "Bonjour!" (pas de prénom)

Gestion completion:
- Détecter fin Phase 5 affichage
- Appeler onComplete()
- Parent → Affiche button après 3 sec
```

---

### 3.5 Progress Bar Blueprint Style

**Instructions:**
```
Modifier ProgressBar component existant:

Style:
- Background: slate-200
- Fill: Gradient cyan-500 → emerald-500
- Height: 8px
- Border radius: full

Animation:
- Transition smooth (0.5s ease-out)
- Ajouter "blueprint lines" qui se dessinent
  (lignes verticales fines sur la barre)

Labels:
- Au-dessus: "Phase A1 - Identification..." (dynamique)
- Pourcentage: "[75%]" (JetBrains Mono)
```

---

## 📐 PHASE 4: RESULTS PAGE REFONTE (4h)

### 4.1 Page Structure

**Fichier:** `app/results/[id]/page.tsx`

**Instructions:**
```
Refondre page résultats (conserver fetch logic):

Layout sections (ordre):
1. Header (titre + back button)
2. Valorisation Input (NOUVEAU)
3. Identity Section (simplifiée)
4. Opportunities Cards (NOUVELLES, 3 cards)
5. Reality Check Section (NOUVELLE)
6. Lead Conversion Form (existant)

Fetch data:
- Utiliser endpoint existant: /api/v1/analysis/{id}/results-summary
- Format nouveau (heures, pas revenues)
- Typage TypeScript strict

State management:
- hourlyRate: number | null (user input valorisation)
- showMonetaryValue: boolean (true si hourlyRate entré)
```

---

### 4.2 Valorisation Input Section

**Instructions:**
```
Créer section en haut de page:

Layout:
<GlassmorphicCard variant="highlighted">
  <h3>💰 Valorisation (Optionnel)</h3>
  <p>Combien vaut 1 heure de votre temps?</p>
  
  <input 
    type="number" 
    placeholder="Ex: 75" 
    onChange={handleRateChange}
  />
  <span>$ CAD / heure</span>
  
  {hourlyRate && (
    <div className="text-emerald-600">
      ✓ Vos opportunités seront valorisées en $
    </div>
  )}
</GlassmorphicCard>

Style:
- Input: Same style que homepage (glassmorphic)
- Validation: Min 10, Max 500
- Format: Arrondir à 2 décimales

Logic:
- onChange → setState(hourlyRate)
- Si hourlyRate > 0 → showMonetaryValue = true
- Cards opportunity affichent $ value dynamiquement
```

---

### 4.3 OpportunityCard Component

**Fichier:** `components/OpportunityCard.tsx`

**Instructions:**
```
Créer card pour chaque opportunité (3 total):

Props:
interface OpportunityCardProps {
  number: 1 | 2 | 3;
  icon: ReactNode;           // 3D icon (hourglass, gears, etc.)
  title: string;             // Ex: "PRÉSENCE NUMÉRIQUE"
  hoursPerWeek: number;
  hoursPerYear: number;
  problemTeaser: string;
  complexityLevel: number;   // 1-10
  toolsHint: string;
  hourlyRate: number | null;
  showMonetaryValue: boolean;
}

Layout:
┌─────────────────────────────────────────┐
│ [number]. [icon] [TITLE]                │
├─────────────────────────────────────────┤
│                                         │
│ ⏰ Temps récupérable:                   │
│    [hoursPerWeek]h/semaine             │
│    [hoursPerYear]h/an                  │
│                                         │
│ {SI showMonetaryValue:}                │
│ 💰 Valeur estimée:                     │
│    [calcul] $ CAD/an                   │
│                                         │
│ 💡 Problème identifié:                 │
│ [problemTeaser]                        │
│                                         │
│ ⚠️ COMPLEXITÉ: [ComplexityBar]         │
│ [Texte selon niveau]                   │
│                                         │
│ 🔧 Outils suggérés:                    │
│ • [MASQUÉ - Révélé après consultation] │
│ • Configuration personnalisée requise   │
│                                         │
│ ⏰ Solo: [calc]h | ⚡ Expert: [calc]h   │
└─────────────────────────────────────────┘

Calculs:
- Monetary value: hoursPerYear * hourlyRate
- Format: formatCAD(value) → "33,150 $ CAD"
- Solo hours: (complexityLevel * 10) - 20
- Expert hours: (complexityLevel * 1) - 2

Style:
- Border: 2px solid slate-200
- Hover: border-cyan-500 + lift effect
- Icon: Size 48px, positioned top-left
- Number badge: Circle bg-amber-500, text-white

ComplexityBar:
- Filled squares: complexityLevel
- Empty squares: 10 - complexityLevel
- Colors: 1-3=emerald, 4-6=amber, 7-10=red

Text selon complexityLevel:
- 1-3: "✓ Implémentation simple"
- 4-6: "⚠️ Complexité modérée"
- 7-10: "❗ Expert IA fortement recommandé"

Tools masking:
- Afficher toolsHint en gris
- "• [MASQUÉ - Révélé après consultation]"
- Créer mystery/curiosité
```

---

### 4.4 ComplexityBar Component

**Fichier:** `components/ComplexityBar.tsx`

**Instructions:**
```
Créer barre visuelle de complexité:

Props:
- level: number (1-10)

Layout:
[████████░░] 8/10

Implementation:
- 10 carrés (squares) total
- 'level' carrés remplis
- (10 - level) carrés vides

Colors:
- 1-3: bg-emerald-500
- 4-6: bg-amber-500
- 7-10: bg-red-500

Style:
- Square size: 16px × 16px
- Gap: 4px entre carrés
- Border radius: 2px (légèrement arrondi)
- Filled: Solid color
- Empty: border-2 border-slate-300

Label:
- Afficher "[level]/10" à droite
- Font: JetBrains Mono, font-semibold
```

---

### 4.5 Reality Check Section

**Instructions:**
```
Créer section avant lead form:

Style: Callout warning (border-left 4px amber-500)

Contenu:
⚠️ RÉALITÉ DE L'IMPLÉMENTATION IA

🤔 Vous venez de voir VOS opportunités

Mais voici la vérité:

❌ 73% des PME qui essaient d'implémenter 
   l'IA seules ABANDONNENT après 2-3 semaines

❌ Raisons:
   • Choix d'outils inadaptés
   • Configuration complexe
   • Manque d'intégration
   • Temps sous-estimé (100+ heures)

✅ Avec un expert IA:
   • 10x plus rapide (12h vs 120h)
   • Solutions adaptées à VOTRE contexte
   • ROI garanti sous 90 jours
   • Support continu

💡 L'IA est comme un outil chirurgical:
   Puissant entre bonnes mains,
   dangereux si mal utilisé.

Layout:
- Background: amber-50
- Border-left: 4px solid amber-500
- Padding: 32px
- Font size: text-lg
- Line height: 1.7

Icons:
- Emoji spacing approprié
- List bullets: Custom (pas default)
```

---

### 4.6 Format Monétaire Helper

**Fichier:** `lib/formatters.ts`

**Instructions:**
```
Créer helper functions:

export const formatCAD = (amount: number): string => {
  return `${amount.toLocaleString('fr-CA')} $ CAD`;
};

export const formatHours = (hours: number): string => {
  return `${hours.toFixed(1)}h`;
};

export const formatHoursPerWeek = (hours: number): string => {
  return `${hours.toFixed(1)}h/semaine`;
};

Exemples output:
- formatCAD(72150) → "72,150 $ CAD"
- formatHours(8.5) → "8.5h"
- formatHoursPerWeek(8.5) → "8.5h/semaine"

Notes:
- Toujours espace avant $
- Virgule pour milliers (style québécois)
- Maximum 1 décimale pour heures
```

---

## 📐 PHASE 5: POLISH & ANIMATIONS (2h)

### 5.1 Framer Motion Setup

**Installation:**
```bash
npm install framer-motion
```

**Fichier:** `lib/animations.ts`

**Instructions:**
```typescript
Créer variants Framer Motion réutilisables:

// Fade in + Slide up
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

// Stagger children
export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Scale on hover
export const scaleOnHover = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.98 }
};

// Glow pulse
export const glowPulse = {
  animate: {
    boxShadow: [
      '0 0 20px rgba(6, 182, 212, 0.3)',
      '0 0 40px rgba(6, 182, 212, 0.5)',
      '0 0 20px rgba(6, 182, 212, 0.3)'
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};
```

**Usage:**
```tsx
import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';

<motion.div {...fadeInUp}>
  Content
</motion.div>
```

---

### 5.2 Blueprint Grid Animation

**Instructions pour BlueprintGrid:**
```
Animation SVG lines drawing:

1. Initialiser SVG lines avec:
   - stroke-dasharray: "10 10" (lignes discontinues)
   - stroke-dashoffset: totalLength

2. Animer avec Framer Motion:
   - Animate stroke-dashoffset: 0
   - Duration: 1.5s
   - Easing: ease-in-out

3. Opacity:
   - Start: 0
   - End: 0.15 (subtile)

Résultat:
- Au page load, lignes se "dessinent" progressivement
- Effet architectural/technique
- Ne distrait pas du contenu
```

---

### 5.3 Typewriter Effect

**Fichier:** `hooks/useTypewriter.ts`

**Instructions:**
```typescript
Créer custom hook pour effet typewriter:

interface UseTypewriterProps {
  text: string;
  speed?: number;  // ms per character (default: 20)
  onComplete?: () => void;
}

export const useTypewriter = ({ 
  text, 
  speed = 20, 
  onComplete 
}: UseTypewriterProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(prev => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(timer);
        setIsComplete(true);
        onComplete?.();
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed, onComplete]);

  return { displayedText, isComplete };
};

Usage dans ProgressiveMessage:
const { displayedText, isComplete } = useTypewriter({
  text: phaseContent,
  speed: 20,
  onComplete: handlePhaseComplete
});
```

**Améliorations:**
```
Pause sur ponctuation:
- Si caractère === '.' || '!' || '?' → pause 200ms
- Entre paragraphes (\n\n) → pause 500ms

Implémenter avec state machine:
- State: 'typing' | 'pausing' | 'complete'
```

---

### 5.4 Responsive Design

**Breakpoints Tailwind:**
```
sm: 640px   → Mobile landscape
md: 768px   → Tablet
lg: 1024px  → Desktop
xl: 1280px  → Large desktop
```

**Instructions responsive:**
```
Homepage Hero:
- Mobile: Stack vertical, text-center
- Desktop: text-left, max-w-4xl

Waiting Room Dual-View:
- Mobile: Stack vertical (message top, logs bottom)
- Desktop: Side-by-side (35/65)

Results Opportunities:
- Mobile: 1 column
- Tablet: 2 columns (first alone, 2-3 together)
- Desktop: 3 columns

Classes Tailwind:
- Use: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Padding: px-4 md:px-8 lg:px-16
- Text size: text-3xl md:text-4xl lg:text-hero
```

---

## 🧪 TESTING & VALIDATION

### Tests Manuels

**Checklist avant commit:**
```
Homepage:
[ ] Blueprint grid animates on load
[ ] Hero text fade in smooth
[ ] Input focus state (cyan glow)
[ ] Button pulse animation
[ ] Form submission → redirect /waiting-room/[id]
[ ] Responsive mobile/tablet

Waiting Room:
[ ] SSE connection établie
[ ] Logs s'affichent en temps réel
[ ] Progressive message typewriter smooth
[ ] Phase change automatique (progress %)
[ ] Message completion avant redirect
[ ] Button "Voir résultats" apparaît après 3 sec
[ ] Responsive dual-view → stack mobile

Results:
[ ] Fetch data successful
[ ] Valorisation input fonctionne
[ ] Calcul $ CAD correct
[ ] 3 opportunity cards affichent bien
[ ] Complexity bars visuelles
[ ] Reality check visible
[ ] Lead form fonctionnel
[ ] Responsive 3 → 2 → 1 column
```

---

### Tests E2E (Playwright)

**Instructions:**
```
NE PAS supprimer tests existants (67/69 passing)

AJOUTER nouveaux tests pour:

1. Homepage hero:
   - test('Hero blueprint grid visible', ...)
   - test('Form submission redirects to waiting-room', ...)

2. Waiting room:
   - test('Progressive message phases display', ...)
   - test('Typewriter effect completes', ...)
   - test('Results button appears after message', ...)

3. Results:
   - test('Valorisation input calculates monetary value', ...)
   - test('Opportunity cards display hours correctly', ...)
   - test('Complexity bars render', ...)

Run:
npm run test:e2e
```

---

## 🚀 DÉPLOIEMENT

### Pre-Deploy Checklist

```
[ ] Tous tests E2E passent (target: 70+/72 tests)
[ ] Build Next.js successful: npm run build
[ ] Pas d'erreurs TypeScript: npm run type-check
[ ] Lighthouse score:
    - Performance: > 90
    - Accessibility: 100
    - SEO: 100
[ ] Test mobile devices (Chrome DevTools)
[ ] Test Safari (si possible)
```

---

### Deploy Steps

**Vercel (Production):**
```bash
# 1. Commit changes
git add .
git commit -m "feat: Blueprint Time-First design implementation"

# 2. Push to main
git push origin main

# 3. Vercel auto-deploy (via GitHub integration)
# Vérifier: https://vercel.com/dashboard

# 4. Test production URL
# https://visionaire-frontend.vercel.app
```

**Variables d'environnement:**
```
Vérifier dans Vercel Dashboard:
- NEXT_PUBLIC_API_URL=https://visionaire-bff-production.up.railway.app
```

---

## 📊 MÉTRIQUES DE SUCCÈS

### Objectifs Quantitatifs

```
Design Differentiation:
- 0% de similarité visuelle avec Linear/Vercel/Stripe
- Palette couleurs unique (Slate/Amber/Cyan)
- Blueprint aesthetic reconnaissable

Performance:
- Lighthouse Performance: > 90
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s

User Experience:
- Typewriter smooth (pas de lag)
- Animations 60fps
- Mobile responsive parfait
```

---

## 📞 SUPPORT & QUESTIONS

### Si Blocage Technique

**Questions à poser:**
1. "Quel fichier exact je dois modifier?"
2. "Quelle est la structure TypeScript attendue?"
3. "Comment tester cette fonctionnalité?"

**Ressources:**
- Frontend repo: https://github.com/maximen-tech/visionaire-frontend
- Backend API docs: https://visionaire-bff-production.up.railway.app/docs
- Tailwind docs: https://tailwindcss.com
- Framer Motion docs: https://www.framer.com/motion/

---

## 🎯 PRIORITÉS SI TEMPS LIMITÉ

### Must-Have (Critical)

```
1. Tailwind config custom (palette Slate/Amber/Cyan)
2. Homepage hero refonte (Blueprint grid + nouveau copy)
3. Waiting Room dual-view layout
4. Results page opportunity cards (heures focus)
```

### Nice-to-Have (Polish)

```
1. Typewriter effect smooth
2. Blueprint grid animation
3. All Framer Motion animations
4. 3D icons (peut fallback Lucide 2D)
```

### Can-Skip (Optionnel)

```
1. Dark mode
2. Advanced micro-interactions
3. Custom cursor
```

---

## ✅ CHECKLIST FINALE

**Avant de dire "C'est fini":**

```
Design System:
[ ] tailwind.config.js custom palette
[ ] design-tokens.ts created
[ ] BlueprintGrid component
[ ] GlassmorphicCard component
[ ] PulsingButton component

Pages:
[ ] Homepage hero refonte
[ ] /waiting-room/[id] dual-view
[ ] Results page opportunity cards

Components:
[ ] ProgressiveMessage.tsx (5 phases)
[ ] OpportunityCard.tsx
[ ] ComplexityBar.tsx
[ ] LogEntry.tsx

Functionality:
[ ] Valorisation input calcul
[ ] Format CAD helper
[ ] Typewriter effect
[ ] Message completion logic

Testing:
[ ] E2E tests pass
[ ] Manual testing checklist complete
[ ] Mobile responsive verified

Deploy:
[ ] Build successful
[ ] Production deployed
[ ] URL tested: https://visionaire-frontend.vercel.app
```

---

**STATUS:** Ready for implementation  
**ESTIMATED:** 12 hours development  
**PRIORITY:** HIGH - Competitive differentiation  

---

*Ce document est optimisé pour Claude Code Terminal. Copier/coller sections selon besoin.*
