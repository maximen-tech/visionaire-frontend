# Open Graph Images Guide for Vision'AI're

## 1. What Are Open Graph (OG) Images and Why They Matter

### Definition
Open Graph (OG) images are preview images that appear when you share a link on social media platforms (Facebook, LinkedIn, Twitter/X, etc.). They're metadata-driven images that enhance link previews.

### Why They're Critical for Vision'AI're
- **First Impression**: Users see the OG image before clicking, influencing engagement
- **Lead Generation**: Compelling OG images increase click-through rates by 30-40%
- **Brand Consistency**: Ensures Vision'AI're branding is visible across all platforms
- **SEO & Shareability**: Better social signals improve visibility and organic reach
- **Mobile Optimization**: Mobile users rely heavily on visual previews since they don't see full page context

---

## 2. Recommended Dimensions

### Standard Specifications

| Platform | Ideal Dimensions | Min Size | File Format |
|----------|-----------------|----------|-------------|
| **Facebook / LinkedIn** | 1200 × 630px | 600 × 315px | PNG or JPG |
| **Twitter/X** | 1200 × 630px | 506 × 506px | PNG or JPG |
| **General (Safe)** | 1200 × 630px | — | PNG or JPG |
| **Twitter Card (Large)** | 1200 × 1200px | — | PNG or JPG |
| **Pinterest** | 1000 × 1500px | — | PNG or JPG |

### Recommendation for Vision'AI're
**Use 1200 × 630px as default** for maximum compatibility across platforms (covers Facebook, LinkedIn, Twitter standard cards).

For Twitter-specific campaigns, create **1200 × 1200px** variants to maximize visual impact on that platform.

---

## 3. Design Guidelines for Vision'AI're

### Brand Elements to Include
- **Logo**: Vision'AI're logo positioned prominently (top-left or center)
- **Color Palette**:
  - Primary: Your Vision'AI're brand color (typically tech blue or modern color)
  - Accent: Supporting colors from your brand guide
  - Background: Clean, uncluttered backgrounds (white, light gradient, or solid color)
- **Typography**:
  - Font: Use your brand font (ensure it's readable at small sizes)
  - Headline: 40-60pt, bold, maximum 8 words
  - Tagline: 24-32pt, supporting text
- **Visual Style**: Modern, professional, tech-forward aesthetic matching your brand

### Readability Requirements
1. **High Contrast**: Ensure text stands out against backgrounds
   - Text should have at least 4.5:1 contrast ratio (WCAG AA standard)
   - Use drop shadows or text outlines if placing text over images
2. **Clear Hierarchy**: Primary message should be immediately readable
3. **Avoid Clutter**: Maximum 2-3 text elements
4. **Icon Usage**: Include relevant icons (e.g., checkmark for success, hourglass for time-saving)

### Design Best Practices
- Keep text in the center 80% of the image (sides may be cropped on some platforms)
- Use 20-40px padding from edges
- Avoid gradients that are too subtle (may not show well in thumbnails)
- Test readability at small thumbnail sizes (300×157px preview)
- Include a clear call-to-action if appropriate (e.g., "Découvrez Maintenant" for French)

### Vision'AI're Specific Guidelines
- **Emphasize "Time Saved"**: Include visual elements representing time/efficiency
- **Professional Look**: Target B2B audience with enterprise-grade design
- **Bilingual Consideration**: If supporting EN/FR, design should work with both or create variants
- **Data-Driven Aesthetic**: Consider charts, analytics icons, or modern tech visuals

---

## 4. Where to Place OG Images

### Directory Structure
Create this folder in your project root:

```
public/
├── og/
│   ├── og-home.png
│   ├── og-faq.png
│   ├── og-about.png
│   ├── og-contact.png
│   ├── og-waiting-room.png
│   ├── og-results.png
│   └── og-default.png
```

### File Naming Convention
- Use `og-` prefix for all Open Graph images
- Use kebab-case for multi-word names
- Include the page or feature name: `og-page-name.png`

### Organization Tips
- Keep all OG images in one dedicated folder for easy maintenance
- Include a version number or date in filename if you iterate: `og-home-v2.png`
- Maintain a manifest or spreadsheet tracking which image is used on which page

---

## 5. How to Reference OG Images in Metadata

### Next.js Implementation (App Router)

#### In `app/layout.tsx` (Global Metadata)
```typescript
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vision\'AI\'re - Analyseur Maturité Digitale',
  description: 'Analyse automatisée de votre maturité digitale en 2 minutes',
  openGraph: {
    title: 'Vision\'AI\'re - Analyseur Maturité Digitale',
    description: 'Sauvez X heures par semaine avec notre IA',
    url: 'https://visionaire.ca',
    siteName: 'Vision\'AI\'re',
    images: [
      {
        url: '/og/og-home.png',
        width: 1200,
        height: 630,
        alt: 'Vision\'AI\'re - Analyseur Maturité Digitale',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vision\'AI\'re - Analyseur Maturité Digitale',
    description: 'Sauvez X heures par semaine avec notre IA',
    images: ['/og/og-home.png'],
  },
};
```

#### For Specific Routes (e.g., `/app/waiting-room/[id]/page.tsx`)
```typescript
import { Metadata } from 'next';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: 'Analyse en Cours - Vision\'AI\'re',
    description: 'Votre analyse de maturité digitale est en cours...',
    openGraph: {
      title: 'Analyse en Cours - Vision\'AI\'re',
      description: 'Découvrez vos opportunités digitales',
      images: [
        {
          url: '/og/og-waiting-room.png',
          width: 1200,
          height: 630,
          alt: 'Analyse en cours',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      images: ['/og/og-waiting-room.png'],
    },
  };
}
```

#### For Dynamic Content (e.g., Results Page with Company Name)
```typescript
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = params;
  const data = await fetchAnalysisResults(id); // Your API call

  return {
    title: `Résultats - ${data.identity_a1.company_name}`,
    description: `Découvrez les opportunités digitales pour ${data.identity_a1.company_name}`,
    openGraph: {
      title: `Résultats - ${data.identity_a1.company_name}`,
      description: `${data.total_hours_per_week}h/sem d'opportunités digitales`,
      images: [
        {
          url: '/og/og-results.png',
          width: 1200,
          height: 630,
          alt: `Résultats pour ${data.identity_a1.company_name}`,
        },
      ],
    },
  };
}
```

### HTML Meta Tags (Fallback / Non-Next.js Sites)
```html
<!-- Open Graph Meta Tags -->
<meta property="og:title" content="Vision'AI're - Analyseur Maturité Digitale" />
<meta property="og:description" content="Sauvez X heures par semaine avec notre IA" />
<meta property="og:image" content="https://visionaire.ca/og/og-home.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:url" content="https://visionaire.ca" />
<meta property="og:type" content="website" />

<!-- Twitter Card Meta Tags -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Vision'AI're - Analyseur Maturité Digitale" />
<meta name="twitter:description" content="Sauvez X heures par semaine avec notre IA" />
<meta name="twitter:image" content="https://visionaire.ca/og/og-home.png" />
```

---

## 6. Tools to Create OG Images

### Recommended Tools by Use Case

#### A. For Static OG Images (Easiest)
**Canva** (Recommended for beginners)
- Web-based design tool with OG image templates
- Search: "Open Graph 1200x630" template
- Pros: Drag-and-drop, free tier, brand kit support
- Cons: Limited customization for advanced designs
- Cost: Free or $13/month pro

**Figma** (Recommended for designers)
- Professional design tool with precise control
- Pros: Industry-standard, responsive, team collaboration
- Cons: Learning curve, requires design experience
- Cost: Free tier or $12-160/month

#### B. For Programmatic/Dynamic OG Images
**Vercel OG Library** (Best for Next.js)
- Generate dynamic OG images at build/request time
- Supports dynamic text, images, and layouts
- Installation: `npm install @vercel/og`
- Example use case: Generate unique images for each results page with company name

```typescript
import { ImageResponse } from '@vercel/og';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const companyName = searchParams.get('company') || 'Vision\'AI\'re';

    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 48,
            background: 'linear-gradient(to bottom, #0066cc, #004499)',
            width: '100%',
            height: '100%',
            display: 'flex',
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
          }}
        >
          {companyName}
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    return new Response(`Failed to generate image`, { status: 500 });
  }
}
```

**Playwright / Puppeteer** (Advanced automation)
- Generate screenshots of web pages as OG images
- Useful for complex, data-driven designs
- Cost: Self-hosted or serverless integration

#### C. For Quick Templates
**Bannerbear**
- API-based OG image generation
- Pre-designed templates
- Cost: $50-300/month

**Satori** (Open Source)
- Convert HTML/CSS to PNG/SVG
- Free and self-hosted
- No commercial support

### Step-by-Step: Creating with Canva

1. Go to **canva.com** and sign up
2. Search for **"Open Graph"** or create custom dimensions (1200 × 630px)
3. Choose a template matching Vision'AI're branding
4. Customize:
   - Replace text with your headline
   - Add your logo
   - Use your brand colors
   - Add icons or illustrations
5. Download as **PNG** (recommended for quality)
6. Save to `public/og/og-page-name.png`

### Step-by-Step: Creating with Figma

1. Create a new file on **figma.com**
2. Set canvas size to **1200 × 630px**
3. Design your image using Figma's tools
4. Add shape backgrounds, text, and images
5. Export as **PNG** (2x scale for better quality)
6. Save to `public/og/og-page-name.png`

---

## 7. OG Images to Create for Vision'AI're

### Priority Order (Create These First)

#### 1. **og-home.png** - Homepage
**Purpose**: Main brand image for homepage shares
**Key Elements**:
- Vision'AI're logo prominently
- Headline: "Vision'AI're" or "Analyseur Maturité Digitale"
- Subheadline: "Sauvez X heures/semaine"
- Visual: Time-saving theme (clock, hourglass, speedometer)
- Color: Brand primary color with white text
**Dimensions**: 1200 × 630px

#### 2. **og-waiting-room.png** - Analysis In Progress
**Purpose**: Share when analysis is running
**Key Elements**:
- Headline: "Analyse en Cours"
- Visual: Loading animation concept, progress bar, or AI concept
- Icon: Spinning gear, AI brain, or analytics chart
- Tagline: "Découvrez vos opportunités digitales"
**Dimensions**: 1200 × 630px

#### 3. **og-results.png** - Results Page
**Purpose**: Share analysis results
**Key Elements**:
- Headline: "Résultats d'Analyse"
- Visual: Charts, graphs, or opportunity highlights
- Call-to-action: "Voir Comment Optimiser"
- Icon: Check mark, upward arrow, or success indicator
**Dimensions**: 1200 × 630px

#### 4. **og-faq.png** - FAQ Page
**Purpose**: Share FAQ section
**Key Elements**:
- Headline: "Questions Fréquentes"
- Visual: Question mark icon, chat bubble, or info symbol
- Subtext: "Trouvez les réponses"
**Dimensions**: 1200 × 630px

#### 5. **og-about.png** - À Propos Page
**Purpose**: Share company information
**Key Elements**:
- Headline: "À Propos de Vision'AI're"
- Visual: Team, innovation, or mission-related imagery
- Tagline: "Notre Mission: Transformer la Maturité Digitale"
**Dimensions**: 1200 × 630px

#### 6. **og-contact.png** - Contact Page
**Purpose**: Share contact information
**Key Elements**:
- Headline: "Contactez-Nous"
- Visual: Communication icon, phone, or message symbol
- Call-to-action: "Parlons de Vos Besoins"
**Dimensions**: 1200 × 630px

#### 7. **og-default.png** - Fallback Image
**Purpose**: Use when page-specific image isn't available
**Key Elements**:
- Full Vision'AI're branding
- Generic message: "Vision'AI're"
- Ensure it works for any page
**Dimensions**: 1200 × 630px

### Optional/Advanced Images

#### 8. **og-waiting-room-large.png** - Twitter-Specific
**Purpose**: Better visual on Twitter/X
**Dimensions**: 1200 × 1200px
**Key Elements**: Same as og-waiting-room.png but optimized for square format

#### 9. **og-results-company.png** - Dynamic Results (with Vercel OG)
**Purpose**: Generate unique images for each company's results
**Implementation**: Use Vercel OG Library to generate images with company name dynamically
**Dimensions**: 1200 × 630px

---

## 8. Testing and Validation Tools

### A. Facebook Sharing Debugger
**URL**: https://developers.facebook.com/tools/debug/sharing/

**How to Use**:
1. Paste your page URL (e.g., `https://visionaire.ca`)
2. Click **"Debug"** or **"Scrape Again"**
3. Check the preview to see how your OG image appears
4. Look for warnings or errors
5. Verify image dimensions and alt text

**What to Check**:
- Image displays correctly
- Text is readable
- No distortion or cropping issues
- Correct title and description

---

### B. Twitter Card Validator
**URL**: https://cards-dev.twitter.com/validator

**How to Use**:
1. Paste your page URL
2. View the preview of how it appears on Twitter
3. Check image dimensions and aspect ratio
4. Validate card type (summary_large_image recommended)

**What to Check**:
- Image shows correctly in card preview
- Text is legible
- Ensure you're using `summary_large_image` card type for full-size images

---

### C. LinkedIn Inspector
**URL**: https://www.linkedin.com/post-inspector/inspect/[YOUR_URL]

**How to Use**:
1. Replace `[YOUR_URL]` with your page URL
2. View the preview
3. Check image, title, and description

**What to Check**:
- Professional appearance on LinkedIn (important for B2B)
- Image aspect ratio looks good
- Title and description match your intent

---

### D. General Meta Tag Analyzer
**URL**: https://metatags.io/

**How to Use**:
1. Enter your page URL
2. View all meta tags and preview
3. See how image appears across all platforms

**What to Check**:
- Consistent appearance across Facebook, Twitter, LinkedIn, Google
- All meta tags are present
- No missing required fields

---

### E. Local Testing (Before Deployment)

#### Using Next.js Built-in Inspector
```bash
# Build and start production server
npm run build
npm run start

# Visit your page and check browser console
# Look for any og:* meta tag warnings
```

#### Using curl to Check Meta Tags
```bash
curl -I https://visionaire.ca
curl https://visionaire.ca | grep -i "og:"
```

---

## 9. Implementation Checklist

### Before Launch

- [ ] Create all 7 priority OG images in Canva or Figma
- [ ] Save images to `public/og/` directory
- [ ] Add metadata to `app/layout.tsx` (global default)
- [ ] Add metadata to homepage route (`app/page.tsx`)
- [ ] Add metadata to waiting-room route (`app/waiting-room/[id]/page.tsx`)
- [ ] Add metadata to results route (`app/results/[id]/page.tsx`)
- [ ] Add metadata to FAQ, About, Contact pages
- [ ] Test with Facebook Debugger
- [ ] Test with Twitter Card Validator
- [ ] Test with LinkedIn Inspector
- [ ] Test on actual Facebook post
- [ ] Test on actual Twitter post
- [ ] Test on actual LinkedIn post
- [ ] Verify images on mobile devices
- [ ] Document OG image URLs in team wiki/Notion

### Ongoing Maintenance

- [ ] Review OG images quarterly
- [ ] Update with new branding if needed
- [ ] Monitor share metrics in analytics
- [ ] A/B test different headlines/visuals
- [ ] Check for broken image links monthly

---

## 10. Best Practices & Tips

### Design Tips
1. **Use High Contrast**: Light text on dark backgrounds, or vice versa
2. **Keep Text Large**: Aim for 40-60pt headlines
3. **Center Important Content**: Don't rely on edges (they may be cropped)
4. **Use Consistent Branding**: Match your website colors and fonts
5. **Test at Small Sizes**: Preview at 300×157px (thumbnail size)
6. **Avoid Busy Backgrounds**: Solid colors or subtle gradients work best
7. **Include Logo**: Make it instantly recognizable as your brand

### Content Tips
1. **Use Action Words**: "Découvrez", "Sauvez", "Optimisez"
2. **Include Numbers**: "X heures/semaine" resonates with B2B audience
3. **Keep It Short**: Maximum 8 words for headlines
4. **Localize**: Use French for Quebec audience
5. **Avoid All Caps**: Mixed case is more readable
6. **Brand Consistency**: Same fonts and colors across all OG images

### Technical Tips
1. **Use HTTPS URLs**: Always use full HTTPS URLs in meta tags
2. **Test After Deployment**: OG scraping happens on live URLs
3. **Cache Busting**: If updating images, consider versioning (og-home-v2.png)
4. **Size Optimization**: Compress images without losing quality (under 300KB is ideal)
5. **Accessibility**: Include alt text for all images in meta tags

### Monitoring & Analytics
1. **Track Shares**: Monitor which pages get shared most
2. **Click-Through Rates**: Compare performance of different OG images
3. **Social Metrics**: Track engagement on social platforms
4. **A/B Testing**: Try different headlines/visuals to see what works
5. **Update Quarterly**: Refresh images based on performance data

---

## 11. Common Pitfalls to Avoid

| Pitfall | Solution |
|---------|----------|
| Image doesn't display on social | Check that image URL is publicly accessible (not localhost) |
| Text is unreadable in preview | Use larger fonts (40-60pt) and higher contrast |
| Image looks distorted | Use exact 1200×630px dimensions, avoid non-standard sizes |
| Different appearance across platforms | Test on Facebook, Twitter, and LinkedIn separately |
| Image cached with old version | Clear cache in debugger tools or version image filename |
| Meta tags not appearing | Verify meta tags in page source (View → Source) |
| Mobile preview looks bad | Test at mobile breakpoints; keep critical content in center 80% |
| Wrong image sharing | Ensure correct og:image URL is in page metadata |

---

## 12. Quick Reference: Meta Tag Template

Copy and adapt this template for your pages:

```typescript
export const metadata: Metadata = {
  title: 'Page Title - Vision\'AI\'re',
  description: 'Page description with action-oriented language',
  openGraph: {
    title: 'Page Title - Vision\'AI\'re',
    description: 'Social media optimized description (160 chars max)',
    url: 'https://visionaire.ca/page-path',
    siteName: 'Vision\'AI\'re',
    images: [
      {
        url: '/og/og-page-name.png',
        width: 1200,
        height: 630,
        alt: 'Descriptive alt text for accessibility',
        type: 'image/png',
      },
    ],
    type: 'website',
    locale: 'fr_CA',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Page Title - Vision\'AI\'re',
    description: 'Social media optimized description',
    images: ['/og/og-page-name.png'],
    creator: '@YourTwitterHandle',
  },
};
```

---

## Conclusion

Open Graph images are a powerful, often-overlooked tool for Vision'AI're's growth strategy. They're the first impression users get before clicking your links. By following this guide, you'll ensure:

- **Consistent branding** across social platforms
- **Higher click-through rates** with compelling visuals
- **Professional appearance** in social feeds
- **Better SEO signals** from increased shares
- **Improved lead generation** through visual appeal

Start with the 7 priority images, test them thoroughly, and iterate based on performance data. Good luck!
