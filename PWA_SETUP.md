# PWA Setup Guide for Vision'AI're

## 📱 Progressive Web App Configuration

This document explains how to complete the PWA setup for Vision'AI're.

---

## ✅ Already Configured

### 1. Manifest File
**Location:** `public/manifest.json`

**Features:**
- App name and description
- Display mode: standalone
- Theme color: #4F46E5 (Indigo)
- Icons: 72x72 to 512x512 (8 sizes)
- Shortcuts: Quick action for new analysis
- Share target: Share URLs to app
- Screenshots: Home and results pages

### 2. Meta Tags
**Location:** `app/layout.tsx`

**Includes:**
- Manifest link
- Theme color
- Mobile web app capable
- Apple mobile web app settings
- Apple touch icons
- Favicons

### 3. Loading Skeletons
**Location:** `components/ui/Skeleton.tsx`

**Components:**
- `<Skeleton />`: Basic skeleton block
- `<SkeletonText />`: Text line placeholders
- `<SkeletonResults />`: Full results page skeleton
- `<SkeletonWaitingRoom />`: Full waiting room skeleton
- `<SkeletonCard />`: Card component skeleton

---

## 🎨 Required: Generate PWA Icons

### Icon Sizes Needed

Create the following icons in `public/icons/`:

| File | Size | Purpose |
|------|------|---------|
| `icon-72x72.png` | 72x72 | Android small, Favicon |
| `icon-96x96.png` | 96x96 | Android standard |
| `icon-128x128.png` | 128x128 | Android standard |
| `icon-144x144.png` | 144x144 | Windows tile |
| `icon-152x152.png` | 152x152 | iOS |
| `icon-192x192.png` | 192x192 | Android standard, iOS |
| `icon-384x384.png` | 384x384 | Android high-res |
| `icon-512x512.png` | 512x512 | Android splash, maskable |

### Design Guidelines

**Logo Requirements:**
- Use Vision'AI're logo/branding
- Center logo with padding (safe area)
- Background: White or brand color (#4F46E5)
- Logo should be visible at small sizes

**Maskable Icons:**
- Use 80% safe zone (center area)
- Outer 10% on each side may be cropped
- Test with: https://maskable.app/

### Quick Generation Methods

#### Method 1: Use Online Tool (Easiest)
1. Go to https://realfavicongenerator.net/
2. Upload a 512x512 source image
3. Configure PWA settings
4. Download and extract to `public/icons/`

#### Method 2: Use PWA Asset Generator
```bash
npm install -g pwa-asset-generator

# Generate from source image
pwa-asset-generator source-logo.png public/icons \
  --icon-only \
  --padding "10%" \
  --background "#ffffff"
```

#### Method 3: Manual with Figma/Photoshop
1. Create 512x512 canvas
2. Add logo with 10% padding
3. Export at each size:
   - 72, 96, 128, 144, 152, 192, 384, 512
4. Save as PNG with transparency

---

## 📸 Optional: Add Screenshots

### Screenshot Sizes

Create in `public/screenshots/`:

| File | Size | Purpose |
|------|------|---------|
| `home.png` | 1280x720 | Desktop/wide form factor |
| `results.png` | 750x1334 | Mobile/narrow form factor |

### Capture Guidelines

**Home Screenshot:**
- Show hero section with URL input
- Display "Connaissez vos 3 priorités digitales"
- Include trust indicators (500+ PME)
- Capture at 1280x720 desktop view

**Results Screenshot:**
- Show results page with opportunity cards
- Display time savings visualization
- Include lead form CTA
- Capture at 750x1334 mobile view

---

## 🔧 Service Worker Setup (Optional)

### Option 1: Next.js Built-in (Recommended for Later)

Wait for Next.js 15+ stable PWA support, or use next-pwa:

```bash
npm install next-pwa
```

**next.config.js:**
```javascript
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development'
});

module.exports = withPWA({
  // existing config
});
```

### Option 2: Custom Service Worker

**Create:** `public/sw.js`

```javascript
const CACHE_NAME = 'visionai-v1';
const urlsToCache = [
  '/',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
```

**Register in layout:**
```typescript
// app/layout.tsx
useEffect(() => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
  }
}, []);
```

### Why Service Worker is Optional for Now

**Reasons:**
1. **SSE Dependency:** App relies on real-time SSE streams
2. **Dynamic Content:** Analysis results change frequently
3. **Backend Required:** Offline mode has limited value
4. **Complexity:** Service worker caching strategies need careful planning

**When to Add:**
- After stable traffic and user patterns established
- When offline mode provides clear user value
- When caching strategies are well-defined

---

## 🧪 Testing PWA

### Test Install Prompt

**Desktop (Chrome/Edge):**
1. Open devtools (F12)
2. Go to Application tab
3. Click "Manifest" - verify all fields
4. Check console for errors
5. Click "+ Install" button in address bar

**Mobile (Android):**
1. Open site in Chrome
2. Look for "Add to Home Screen" prompt
3. Or: Menu → "Install app"
4. Test installed app behavior

**Mobile (iOS):**
1. Open site in Safari
2. Tap share button
3. Select "Add to Home Screen"
4. Note: iOS has limited PWA support

### Lighthouse PWA Audit

```bash
# Install Lighthouse CLI
npm install -g lighthouse

# Run PWA audit
lighthouse https://visionai.re \
  --only-categories=pwa \
  --output=html \
  --output-path=./pwa-audit.html
```

**Target Scores:**
- Installable: ✅ Pass
- PWA Optimized: 90+
- Fast and reliable: 90+

### Common Issues

**Issue: Install prompt doesn't show**
- Verify manifest.json is accessible
- Check for HTTPS (required)
- Ensure icons are valid
- Check browser console for errors

**Issue: Icons don't display**
- Verify icon files exist in `public/icons/`
- Check file sizes match manifest
- Ensure PNG format with transparency
- Test with different sizes

**Issue: Offline mode doesn't work**
- Service worker not implemented yet
- This is expected until SW is added

---

## 📊 PWA Benefits

### User Experience
- ✅ Install to home screen
- ✅ Full-screen app experience
- ✅ Splash screen on launch
- ✅ Theme color integration
- ✅ Better perceived performance (skeletons)

### Engagement
- 📈 Return visits: +50-100%
- 📈 Session duration: +20-40%
- 📈 Conversion rate: +15-30%
- 📈 Push notification potential (future)

### Technical
- ⚡ Faster load times (once cached)
- 📱 Native app-like feel
- 🔍 Better SEO signals
- 🎯 App store alternative

---

## 🚀 Deployment Checklist

### Before Launch
- [ ] Generate all icon sizes (8 sizes)
- [ ] Test manifest.json is accessible
- [ ] Verify icons load correctly
- [ ] Test install prompt on mobile
- [ ] Run Lighthouse PWA audit
- [ ] Capture screenshots (optional)

### After Launch
- [ ] Monitor PWA install rate
- [ ] Track engagement from installed app
- [ ] Gather user feedback
- [ ] Consider service worker if needed
- [ ] Optimize based on usage patterns

---

## 📚 Resources

**PWA Documentation:**
- https://web.dev/progressive-web-apps/
- https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps

**Tools:**
- Icon Generator: https://realfavicongenerator.net/
- Maskable Icon Editor: https://maskable.app/
- PWA Builder: https://www.pwabuilder.com/
- Lighthouse: https://developers.google.com/web/tools/lighthouse

**Next.js PWA:**
- https://github.com/shadowwalker/next-pwa
- https://nextjs.org/docs/app/building-your-application/configuring/progressive-web-apps

---

## ✅ Current Status

**Implemented:**
- ✅ Manifest.json with full configuration
- ✅ PWA meta tags in layout
- ✅ Apple touch icons
- ✅ Loading skeletons (better UX)
- ✅ Theme color integration

**Pending:**
- ⏳ Generate PWA icons (8 sizes)
- ⏳ Capture screenshots (2 images)
- ⏳ Service worker (optional for now)
- ⏳ Test install prompt
- ⏳ Lighthouse PWA audit

**Ready for:**
- Icons can be generated anytime
- PWA is functional once icons exist
- Install prompt will work immediately
- Service worker can be added later

---

## 🎯 Next Steps

1. **Immediate:** Generate icons using online tool
2. **This Week:** Test install on mobile devices
3. **This Month:** Monitor install metrics
4. **Future:** Add service worker if usage justifies

---

FIN DU GUIDE PWA
