# TCG content and SEO review - 15 October 2026

## Latest review

Reviewed the 23 public pages, shared navigation/footer, all eight service practices, four sectors, four project descriptions, Wealth FAQs and enquiry/assistant wording. Changes preserve the approved design, existing images, actual engagement scopes and the homepage promise: “We solve problems.”

- Replaced generic service section headings with specific buyer questions and deliverables. Each page now has a distinct search title and description. Homepage title remains “TCG” at the owner’s request; this is a deliberate tradeoff against a more descriptive title.
- TCG Wealth now leads with “Big plans. Let’s talk funds.” Its short hero introduces business funding; the next sections explain expansion, operating funds and opportunity funding, followed by the enquiry process. Removed duplicate hero paragraphs and caption. Added a working “See how it works” link.
- Retained “working capital finance” only in a plain-English FAQ. “Funds” alone is broad and can mean investment funds, so page titles and descriptions use business funding. No measured search-volume claims are made.
- Updated service and sector descriptions, clarified legal coordination, strengthened the Gully Bowls scope and corrected the visible project breadcrumb to match structured data. Added Contact breadcrumb schema.
- WhatsApp and the independent bot avatar are retained following the owner’s latest instruction on 15 October. Enquiries offer email and WhatsApp drafts, plus a copy-message fallback. No message is sent automatically, NDA signed or calendar slot booked.

## Checks completed locally

All 23 generated pages pass checks for unique titles and descriptions, one H1, canonical consistency, parseable structured data, existing internal links and assets, image alt attributes, crawlable URLs, indexability, absence of long dashes, and responsive hero file-size budgets. The browser loaded all 23 routes at 390px without horizontal overflow or broken loaded images. The Wealth hero was visually checked on desktop and mobile. The Wealth CTA retains its funding context when opening the NDA/meeting form. Both draft URLs preserve names, company, email and service selection with correct encoding. Service routing and section-navigation checks pass.

These are implementation checks, not proof of indexing, rankings, conversion performance or field Core Web Vitals. The final live HTTP checks are saved alongside this task’s output as TCG-Live-SEO-Checks-2026-10-15.json after deployment.

## Search intent by page

| Page | Reader need / primary topic |
| --- | --- |
| / | Business consulting for startups and established businesses |
| /services | Compare consulting services and connected expertise |
| /services/strategy | Business strategy, plans and go-to-market planning |
| /services/marketing | Digital marketing, SEO content and lead generation planning |
| /services/brand | Brand positioning, identity and website design |
| /services/operations | Operations consulting, SOPs and process improvement |
| /services/technology | Custom software, operations platforms and automation |
| /services/finance | Financial modelling and pitch decks |
| /services/compliance | Incorporation, GST and compliance coordination |
| /services/legal | Business contracts and legal coordination |
| /industries | Find consulting expertise relevant to a sector |
| /industries/hospitality | Restaurant and hospitality consulting |
| /industries/logistics | Logistics workflows and custom operations software |
| /industries/real-estate | Property management software, co-living brand and websites |
| /industries/performance | Sports business planning, pricing and launch preparation |
| /work | Evidence of client scope and practical deliverables |
| /work/gully-bowls | Hospitality financial model, pitch deck and operational tools |
| /work/sp-freight | Logistics software, reporting and finance exports |
| /work/the-switch | Co-living identity, website and investor materials |
| /work/cashmyrent | Property management platform and staff workflows |
| /about | Founder, business identity and approach |
| /wealth | Business funding for expansion and daily operations |
| /contact | Introductions, NDA requests and meeting enquiries |

## What remains outside this review

Search Console ownership is not established. Google-selected canonicals, indexing coverage, search queries, clicks, impressions and actual rankings remain unverified. No keyword-volume dataset or field Core Web Vitals data was available. The next SEO step is to verify the existing Search Console property, submit the sitemap if needed and inspect page-level performance before further content expansion. No location pages, testimonials, ratings or funding guarantees were invented.

Writing follows [Google’s SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide): clear, useful content and descriptive page context. Natural search terminology matters more than replacing every occurrence of one word. [Google’s title guidance](https://developers.google.com/search/docs/appearance/title-link) also supports concise, descriptive titles.

---

## Previous technical audit - 13 October 2026

## Main finding

The redesigned site is already served at https://www.tcg.ind.in. The apex and HTTP domain redirect there. However, the HTML canonical links, robots.txt sitemap reference, sitemap URLs, social URLs and Organization data still identified the Vercel alias. This was a verified implementation mismatch, not a measured ranking diagnosis.

## Website changes in this pass

| Priority | Finding | Change |
| --- | --- | --- |
| High | Brand domain points search engines at the hosting alias | Use https://www.tcg.ind.in consistently in all 23 pages, sitemap, robots.txt, social metadata and structured data |
| High | Hosting alias serves a second copy of the site | Permanent, host-specific redirect to the primary domain, retaining the path and query string |
| Medium | Homepage hero image is about 2.6 MB | Responsive WebP versions: about 205 KB desktop and 75 KB small-screen, with matching preload and explicit image dimensions |
| Medium | Service pages lack answers to common buying questions | Add 22 useful answers across eight service pages, covering scope, deliverables and common service distinctions |
| Medium | Structured data only describes the organization | Link Organization, WebSite, WebPage, Service and BreadcrumbList entities using stable IDs and factual content |
| Medium | Local positioning does not explicitly explain national coverage | Clarify Bengaluru base and India-wide service scope in homepage copy and search metadata |

The approved service structure and named client evidence remain. A parallel owner-requested update unifies page heroes and adds a WhatsApp request journey. Browser titles are deliberately compact and brand-first at the owner’s request; descriptions and on-page content carry the full service context. No ratings, testimonials, rankings, performance numbers or funding guarantees were invented. FAQ content is for readers; no FAQ rich-result eligibility is claimed.

## Verification

- Generated HTML and internal destinations checked for all 23 public pages.
- Primary-domain consistency, page metadata and structured-data relationships checked in code.
- Service questions checked in desktop and mobile previews.
- Existing .html and trailing-slash redirects, a real HTTP 404 and archived prototype noindex headers checked during the live audit.
- Compressed hero visually inspected; image bytes are not Core Web Vitals measurements.

## Remaining work requiring business/account information

### 1. Establish Search Console access

Open [Google Search Console](https://search.google.com/search-console). Check the property selector for `tcg.ind.in` or `https://www.tcg.ind.in/` before creating another property. If none exists, a Domain property for `tcg.ind.in` covers protocols and subdomains and requires DNS verification. Do not share account passwords. [Google’s property guide](https://support.google.com/webmasters/answer/34592).

Once verified, submit https://www.tcg.ind.in/sitemap.xml and inspect the homepage plus the strategy, marketing, brand, operations and technology pages. Check both the user-declared and Google-selected canonical. Submission requests discovery; it does not guarantee indexing. [Google’s sitemap guide](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).

### 2. Establish a measurement baseline

Record organic clicks, impressions, CTR and queries by landing page. Separate branded searches (TCG, The Consulting Group, Umesh Pareek) from service searches. Evaluate Bengaluru and broader Indian demand. Review actual enquiries alongside traffic; a WhatsApp or email-draft click is not a confirmed lead. Search Console data and analytics access were not available in this audit, so current rankings, traffic and conversions are unknown.

### 3. Improve evidence, then publish useful resources

Prioritise owner-approved project details: starting problem, work performed, screenshots and verifiable outcomes. Start with the switch. for branding, SP Freight for operations software, and Gully Bowls for financial and operational work. Do not imply new marketing results without evidence.

Candidate articles should answer genuine buying questions and link to the appropriate service page:
- Brand positioning versus visual identity: what should a growing business fix first?
- When spreadsheets stop working: choosing between process changes and custom software.
- What to prepare before commissioning a business plan or pitch deck.

These are editorial hypotheses, not measured keyword-volume claims. Validate priorities against Search Console queries before expanding the site. Avoid duplicate location pages with the same content.

### 4. Confirm the local business profile

Check whether TCG has an owned, eligible Google Business Profile. Use the verified business name, actual contact information, real service coverage and approved photos. No profile, address, hours or reviews were created during this audit.

## Suggested review cadence

After Search Console access is established, inspect indexing and canonical selection first. Record a baseline and compare a subsequent 28-day period, allowing for the recent redesign and small sample sizes. Use page-level enquiries and non-branded visibility to choose the next improvements. This is a suggested workflow, not a scheduled automation.

## References

- [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Organization structured data](https://developers.google.com/search/docs/appearance/structured-data/organization)
- [Breadcrumb structured data](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb)
- [Schema.org Service](https://schema.org/Service)
