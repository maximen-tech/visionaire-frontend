# Sentry Setup Guide for Vision'AI're

## 📊 Error & Performance Monitoring Configuration

This document explains how to complete the Sentry setup for Vision'AI're error tracking and performance monitoring.

---

## ✅ Already Configured (Session 4)

### 1. Sentry SDK Installed
**Package:** `@sentry/nextjs`
**Version:** Latest (installed via npm)

### 2. Configuration Files Created

**Client-side:** `sentry.client.config.ts`
- Performance monitoring (100% traces in dev)
- Session replay (100% errors, 10% normal sessions)
- Error filtering (browser extensions, expected network errors)
- Custom context enrichment

**Server-side:** `sentry.server.config.ts`
- Server-side error tracking
- Performance traces
- Custom server context

**Edge:** `sentry.edge.config.ts`
- Edge runtime support
- Middleware error tracking

### 3. Next.js Integration
**File:** `next.config.ts`
- Wrapped with `withSentryConfig`
- Source maps configuration
- Automatic instrumentation
- Vercel Cron Monitors enabled

### 4. Error Boundary Component
**File:** `components/ErrorBoundary.tsx`
- Catches React component errors
- Logs to Sentry with componentStack
- User-friendly fallback UI
- Reset functionality

### 5. API Error Tracking
**File:** `lib/api.ts`
- All API calls wrapped with try/catch
- Sentry tracking on:
  - `startAnalysis()`
  - `getAnalysisStatus()`
  - `getAnalysisResults()`
  - `convertLead()`
  - `enableEmailNotification()`
- Custom tags: api_endpoint, status_code
- Extra context: analysis_id, request data

### 6. SSE Error Monitoring
**File:** `app/waiting-room/[id]/page.tsx`
- SSE parsing errors tracked
- Connection errors tracked
- Reconnection attempts logged
- Max retry failures escalated

### 7. Environment Variables
**File:** `.env.example`
- `NEXT_PUBLIC_SENTRY_DSN` documented
- `SENTRY_ORG` for source maps
- `SENTRY_PROJECT` for source maps
- `SENTRY_AUTH_TOKEN` for builds

---

## 🚀 Required: Sentry Account Setup

### Step 1: Create Sentry Account

1. Go to https://sentry.io/signup/
2. Sign up with email or GitHub
3. Choose plan:
   - **Developer (Free)**: 5,000 errors/month, 10,000 transactions/month
   - **Team ($26/month)**: 50,000 errors, 100,000 transactions
   - **Business**: Custom pricing

**Recommendation:** Start with Free plan, upgrade when needed.

---

### Step 2: Create Project

1. After signup, click "Create Project"
2. Platform: Select **Next.js**
3. Project name: `visionaire-frontend`
4. Team: Default team or create new
5. Alert frequency: Choose your preference
6. Click "Create Project"

---

### Step 3: Get DSN (Data Source Name)

**What is DSN?**
A unique URL that tells Sentry where to send errors.

**How to get it:**
1. In your Sentry project dashboard
2. Go to **Settings** → **Projects** → **visionaire-frontend**
3. Go to **Client Keys (DSN)**
4. Copy the DSN URL

**Format:**
```
https://[32-char-key]@o[org-id].ingest.sentry.io/[project-id]
```

**Example:**
```
https://abc123def456...@o123456.ingest.sentry.io/7890123
```

---

### Step 4: Configure Environment Variables

Create `.env.local` file (if not exists):

```bash
# Sentry DSN (from Step 3)
NEXT_PUBLIC_SENTRY_DSN=https://your-actual-dsn-here

# Sentry Organization Slug
# Get from: Settings → General Settings → Organization Slug
SENTRY_ORG=your-org-slug

# Sentry Project Name
SENTRY_PROJECT=visionaire-frontend

# Sentry Auth Token (for source maps upload)
# Create at: Settings → Account → API → Auth Tokens
# Scopes: project:releases, project:write
SENTRY_AUTH_TOKEN=your-auth-token-here
```

**IMPORTANT:**
- `.env.local` is git-ignored (safe for secrets)
- Never commit `SENTRY_AUTH_TOKEN` to git
- Use different DSNs for dev/staging/production

---

### Step 5: Create Auth Token (for Source Maps)

Source maps help Sentry show readable stack traces instead of minified code.

**Steps:**
1. Go to https://sentry.io/settings/account/api/auth-tokens/
2. Click "Create New Token"
3. Name: `visionaire-frontend-deploy`
4. Scopes: Select:
   - ✅ `project:releases`
   - ✅ `project:write`
5. Click "Create Token"
6. **Copy token immediately** (only shown once)
7. Add to `.env.local` as `SENTRY_AUTH_TOKEN`

---

### Step 6: Deploy to Vercel

**Add Environment Variables to Vercel:**

1. Go to Vercel Dashboard → Your Project
2. Settings → Environment Variables
3. Add these variables:

| Name | Value | Environment |
|------|-------|-------------|
| `NEXT_PUBLIC_SENTRY_DSN` | Your DSN from Step 3 | Production, Preview, Development |
| `SENTRY_ORG` | Your org slug | Production |
| `SENTRY_PROJECT` | `visionaire-frontend` | Production |
| `SENTRY_AUTH_TOKEN` | Your auth token from Step 5 | Production |

**Security:**
- `NEXT_PUBLIC_*` vars are exposed to browser (public)
- `SENTRY_AUTH_TOKEN` stays server-side only (secret)

4. Redeploy project to apply env vars

---

## 🧪 Testing Sentry Integration

### Test 1: Trigger Client Error

Add a test button to any page:

```tsx
// Temporary test button
<button onClick={() => {
  throw new Error("Test Sentry Error!");
}}>
  Test Error
</button>
```

**Expected Result:**
1. Error boundary catches error
2. Fallback UI shows
3. Error appears in Sentry dashboard within 1-2 minutes
4. Stack trace is readable (if source maps working)

---

### Test 2: Trigger API Error

Try accessing invalid analysis ID:

```
https://visionai.re/results/invalid-id-12345
```

**Expected Result:**
1. API call fails
2. Error tracked in Sentry
3. Tags show: `api_endpoint: analysis/results`
4. Extra context includes analysis_id

---

### Test 3: Trigger SSE Error

1. Start an analysis
2. In waiting room, kill network briefly
3. Reconnection logic triggers

**Expected Result:**
- SSE connection error logged to Sentry
- Reconnect attempts tracked
- If max retries reached, final error logged

---

### Test 4: Performance Monitoring

Navigate through app:
1. Home → Start analysis
2. Waiting room → Results
3. Fill lead form → Submit

**Check Sentry:**
- Go to **Performance** tab
- See transactions for each page load
- Check slow queries (if any)
- Review Web Vitals (LCP, FID, CLS)

---

## 📊 Sentry Dashboard Features

### Issues Tab
- **Real-time errors** as they happen
- **Grouped by error type** (same error = one issue)
- **Frequency chart** (errors over time)
- **Affected users** count
- **Stack trace** with source maps
- **Breadcrumbs** (user actions before error)

### Performance Tab
- **Transaction list** (page loads, API calls)
- **Slowest endpoints** ranking
- **Web Vitals** (LCP, FID, CLS)
- **User misery score**
- **Apdex score**

### Releases Tab
- **Deployment tracking** (automatic with Vercel)
- **Errors per release** comparison
- **Regression detection** (new errors in release)

### Alerts Tab
- **Configure alerts** (email, Slack, Discord)
- **Alert rules:**
  - New issue appears
  - Issue frequency spike
  - Performance degradation

---

## 🔔 Recommended Alert Rules

### Alert 1: Critical Errors
**When:** New issue with level ERROR or FATAL
**Notify:** Email + Slack
**Frequency:** Immediately

### Alert 2: High Error Rate
**When:** More than 50 errors in 1 hour
**Notify:** Slack
**Frequency:** Once per hour

### Alert 3: Performance Degradation
**When:** P95 response time > 3 seconds
**Notify:** Email
**Frequency:** Once per day

### Alert 4: SSE Connection Failures
**When:** Error with tag `error_type: sse_max_retries`
**Notify:** Slack
**Frequency:** Immediately

---

## 🎯 Best Practices

### 1. Environment Separation
```typescript
// Use different DSNs for each environment
const SENTRY_DSN = process.env.NODE_ENV === 'production'
  ? process.env.NEXT_PUBLIC_SENTRY_DSN_PROD
  : process.env.NEXT_PUBLIC_SENTRY_DSN_DEV;
```

### 2. Sample Rates (Production)
Adjust in `sentry.client.config.ts`:
```typescript
tracesSampleRate: 0.1, // 10% of transactions (reduce cost)
replaysOnErrorSampleRate: 1.0, // 100% of errors (keep high)
replaysSessionSampleRate: 0.05, // 5% of normal sessions (reduce noise)
```

### 3. User Context
Add user info when available:
```typescript
Sentry.setUser({
  id: analysisId,
  email: userData.email, // if available
});
```

### 4. Custom Tags
Tag errors for easier filtering:
```typescript
Sentry.setTag('feature', 'lead-conversion');
Sentry.setTag('user_tier', 'premium');
```

### 5. Release Tracking
Sentry automatically tracks releases with Vercel. Manual:
```bash
SENTRY_RELEASE=$(git rev-parse HEAD)
```

---

## 🔍 Debugging Common Issues

### Issue: "DSN not configured"
**Solution:** Check `.env.local` has `NEXT_PUBLIC_SENTRY_DSN`

### Issue: Source maps not working
**Solutions:**
1. Verify `SENTRY_AUTH_TOKEN` in Vercel env vars
2. Check `SENTRY_ORG` and `SENTRY_PROJECT` match exactly
3. Ensure token has `project:releases` scope
4. Check build logs for upload errors

### Issue: Too many events (quota exceeded)
**Solutions:**
1. Lower `tracesSampleRate` (e.g., 0.1 = 10%)
2. Lower `replaysSessionSampleRate` (e.g., 0.01 = 1%)
3. Add more `ignoreErrors` patterns
4. Filter out bot traffic

### Issue: Errors not appearing in dashboard
**Checks:**
1. DSN is correct
2. Network not blocking sentry.io
3. Error level is not DEBUG (Sentry ignores DEBUG)
4. Check browser console for Sentry errors

---

## 📈 Monitoring Strategy

### Week 1: Observe
- Don't configure alerts yet
- Watch what errors appear
- Identify false positives
- Note patterns

### Week 2: Tune
- Add `ignoreErrors` for known issues
- Adjust sample rates
- Configure 1-2 critical alerts

### Week 3: Optimize
- Fine-tune alert thresholds
- Create custom dashboards
- Set up integrations (Slack, etc.)

### Ongoing
- Review weekly error trends
- Fix top 5 issues each week
- Monitor performance regressions

---

## 🔗 Integrations

### Slack Integration
1. Sentry → Settings → Integrations → Slack
2. Connect workspace
3. Choose default channel (#alerts)
4. Configure per-alert routing

### GitHub Integration
1. Sentry → Settings → Integrations → GitHub
2. Install Sentry app on GitHub
3. Link issues to Sentry errors
4. Auto-resolve on PR merge

### Vercel Integration
Already automatic:
- Deploys tracked as releases
- Source maps uploaded automatically
- Commit SHAs linked

---

## 📊 Cost Optimization

### Free Tier Limits
- 5,000 errors/month
- 10,000 performance transactions/month
- 50 replays/month

### Strategies to Stay Free
1. **Sample transactions:** Set `tracesSampleRate: 0.1` (10%)
2. **Sample replays:** Set `replaysSessionSampleRate: 0.01` (1%)
3. **Filter environments:** Only send production errors
4. **Ignore noise:** Add common false positives to `ignoreErrors`

### When to Upgrade
- Hitting quota limits regularly
- Need longer data retention (90 days → 1 year)
- Want advanced features (custom metrics, etc.)

---

## ✅ Current Status

**Implemented (Session 4):**
- ✅ Sentry SDK installed
- ✅ Client/server/edge configs
- ✅ Error boundary component
- ✅ API error tracking (all endpoints)
- ✅ SSE error monitoring
- ✅ Performance monitoring setup
- ✅ Next.js integration
- ✅ Source maps configuration
- ✅ Environment vars documented

**Pending (Human Tasks):**
- ⏳ Create Sentry account
- ⏳ Create project
- ⏳ Get DSN
- ⏳ Create auth token
- ⏳ Configure Vercel env vars
- ⏳ Test error tracking
- ⏳ Configure alerts

**Ready for:**
- Errors will be tracked immediately after DSN configured
- Source maps will upload on next build
- Performance monitoring starts with DSN
- Zero code changes needed

---

## 🎯 Quick Start Checklist

For human to complete:

- [ ] 1. Sign up at https://sentry.io/signup/
- [ ] 2. Create project "visionaire-frontend"
- [ ] 3. Copy DSN from project settings
- [ ] 4. Add DSN to local `.env.local`
- [ ] 5. Create auth token with project:releases scope
- [ ] 6. Add token to `.env.local`
- [ ] 7. Test locally with error button
- [ ] 8. Add all 4 env vars to Vercel
- [ ] 9. Redeploy Vercel project
- [ ] 10. Trigger test error in production
- [ ] 11. Verify error appears in Sentry
- [ ] 12. Configure 2-3 basic alerts
- [ ] 13. Connect Slack (optional but recommended)

**Time estimate:** 20-30 minutes

---

## 📚 Resources

**Official Docs:**
- Sentry Next.js: https://docs.sentry.io/platforms/javascript/guides/nextjs/
- Sentry Configuration: https://docs.sentry.io/platforms/javascript/configuration/
- Source Maps: https://docs.sentry.io/platforms/javascript/sourcemaps/

**Sentry Dashboard:**
- Login: https://sentry.io/auth/login/
- Docs: https://docs.sentry.io/

**Support:**
- Community Discord: https://discord.gg/sentry
- Forum: https://forum.sentry.io/
- Status: https://status.sentry.io/

---

**Created:** Session 4 (October 28, 2025)
**Status:** Code ready, awaiting Sentry account setup
**Next:** Human completes quick start checklist above

---

FIN DU GUIDE SENTRY
