# AbbVie Science Hub Page Audit
## URL: https://www.abbvie.com/science.html
## Date: 2026-04-08

---

## 1. PAGE METADATA

- **Page Title:** "Our R&D Approach | AbbVie"
- **URL:** https://www.abbvie.com/science.html
- **Platform:** Adobe Experience Manager (AEM) Sites — traditional AEM (not Edge Delivery Services)
- **Viewport tested:** 1440x900 (desktop), 780px (mobile/tablet responsive breakpoint observed)

---

## 2. GLOBAL LAYOUT & NAVIGATION

### Header / Banner
- Sticky navigation bar with AbbVie logo (left)
- Primary navigation (horizontal): **Who We Are**, **Science** (current selection), **Patients**, **Join Us**, **Sustainability**
- Utility buttons (right): **MORE** (overflow links), **GLOBAL** (region selector), **Search AbbVie.com**
- "Skip to main content" accessibility link present
- Cookie consent banner (OneTrust-style) overlays on load

### Footer
- AbbVie logo
- Site navigation links: Who We Are, Science, Patients, Join Us, Sustainability
- Social media icons: Facebook, Twitter/X, Instagram, LinkedIn, YouTube, TikTok
- **Popular pages:** Pipeline, Products, Partner with Us, Patient Support
- **External links:** News Center, Investors, Contract Manufacturing, Medical Information
- Legal text (trademark and copyright notices)
- Bottom bar links: Contact Us, Accessibility Statement, Site Map, Terms of Use, Privacy Notice, Consumer Health Data Privacy Notice, Cookie Settings, Your Privacy Choices
- "Scroll to top of page" button

---

## 3. PAGE SECTIONS (Top to Bottom)

### Section 1: Hero / Banner
- **Type:** Full-width hero with background image
- **Image:** "Two smiling female scientists in lab coats and purple gloves working together at a busy laboratory bench."
- **Heading (H1):** "Where science finds its full potential"
- **Body text:** "For research & development at AbbVie, science isn't just a pursuit -- it's a promise. A commitment to take on the toughest challenges for patients, their families and the future."
- **Background:** Image-based (lab scene)

### Section 2: R&D Highlights / At a Glance Stats
- **Heading (H2):** "AbbVie Science"
- **Heading (H3):** "At a glance: R&D highlights"
- **Body text:** "Our research drives scientific progress, accelerating discovery and advancement. Backed by the rigor to refine relentlessly and the resolve to stay focused to the finish."
- **Background image:** "Interior of a laboratory safety cabinet, illuminated by blue light, containing pipettors and vials."

#### Stats Dashboard (Grid of statistic cards):
| Stat Label (H2)        | Value   | Description                                                                 |
|------------------------|---------|-----------------------------------------------------------------------------|
| Programs               | 90+     | compounds, devices or indications in development individually or under collaboration or license agreement |
| Pioneering Progress    | ~50     | new molecular entities in development                                       |
| Cutting-edge facilities| 9       | R&D centers and 14,000+ scientists and staff globally                       |
| PATIENT impact         | 75+     | conditions treated across six therapeutic areas                             |
| Global Reach           | 375+    | clinical trials in 50+ countries                                            |
| Investment             | $10.8b  | R&D investment in 2024                                                      |

- Includes an image: "Outside view of the AbbVie Bay Area building"
- Includes an image: "Close-up of a scientist wearing safety goggles and purple gloves inspecting a clear petri dish"

### Section 3: Core Focus Areas (Therapeutic Areas)
- **Heading (H2):** "priorities"
- **Heading (H4):** "Core focus areas"
- **Body text:** "We focus our expertise where we can make a meaningful difference, advancing bold research that aims to raise the standard of care and transform patient outcomes."
- **Navigation links (2 rows of 3):**
  - Row 1: Immunology, Oncology, Neuroscience
  - Row 2: Eye Care, Aesthetics, Other Specialties
- All links go to `/science/areas-of-focus/{area}.html`

### Section 4: R&D Video Feature
- **Heading (H2):** "R&D at AbbVie"
- **Body text:** "Raising the bar, then redefining it."
- **Video thumbnail:** "AbbVie Scientist (video thumbnail)"
- **CTA button:** "Watch 1:08"
- **Video player:** Brightcove embedded — "R&D Identity_Anthem Video_external_short version v3"

### Section 5: Explore Our Science (Split Layout)
- **Left side:** Image — "Microscope image of cells"
- **Right side:**
  - **Heading (H3):** "Explore our science"
  - **Body text:** "See how our people are shaping what's next in medicine. Dive deeper into our therapeutic areas, technologies and the stories behind our science."
  - **Link list:**
    - Areas of Focus
    - Areas of Innovation
    - Our People
    - Partner with Us
    - Clinical Trials

### Section 6: Behind the Science Video + Quote
- **Heading (H3):** "The tenacity to take on the toughest challenges"
- **Body text:** "Progress is never instant. That's why every breakthrough is a story of persistence, collaboration and passion. Explore what inspires our teams to keep striving for better answers."
- **Video:** "behind the science ambily abraham thumbnail" — Brightcove player "Ambily" — CTA "Watch 1:30"
- **Quote:** "The culture of the lab is so important because science is a collective effort."
  - Attribution: Ambily Abraham, Discovery Research, Worcester, MA

### Section 7: Stories Behind Our Science (Card Grid)
- **Heading (H1):** "The stories behind our science"
- **Separator line**
- **Body text:** "From decoding complex diseases to unlocking the potential of innovative modalities, explore videos that reveal the science, technology and people powering innovation at AbbVie."
- **4 Content Cards (teaser-style):**

| Card Title            | Description                                                                   | CTA Label                              | Link                                                    |
|-----------------------|-------------------------------------------------------------------------------|----------------------------------------|---------------------------------------------------------|
| THE PERSISTENCE LAB   | Human effort behind health care innovation, bold ideas, toughest challenges   | EXPLORE THE PODCAST SERIES             | /who-we-are/our-stories/the-persistence-lab-podcasts.html |
| One Minute Thesis     | AbbVie scientists break down complex concepts                                 | Unlock new ideas in less than 60 seconds| /science/our-people/science-in-60-seconds.html          |
| Lab of the Future     | Reimagining technology and tools to accelerate discovery                       | Step inside the Lab of the Future      | /science/our-people/lab-of-the-future.html              |
| Discovery Files       | Decode complex biology, challenges, how discoveries move from lab to life     | Dive into the Discovery Files          | /science/our-people/discovery-files.html                |

### Section 8: Separator
- Visual divider/separator

### Section 9: FAQ Accordion
- **Heading (H2):** "Frequently asked questions"
- **Expand All** button
- **4 Accordion items (collapsed):**
  1. "What diseases and conditions does AbbVie develop medicines for?"
  2. "What kinds of new technology does AbbVie use in its research?"
  3. "How is AbbVie leveraging artificial intelligence (AI)?"
  4. "How can I learn more about the R&D community at AbbVie?"
- Uses `data-cmp-is="accordion"` component

### Section 10: CTA / Recruitment Banner (Split Layout)
- **Left side:** Image (alt text: "none")
- **Right side:**
  - **Heading (H2):** "Where bold science meets real-world results"
  - **Body text:** "Join a team where your expertise fuels drug discovery, your ideas drive progress and your work can transform lives."
  - **CTA Link:** "Explore R&D OPPORTUNITIES" -> /join-us/opportunities/research-and-development.html
- **Separator** below

---

## 4. AEM COMPONENT TYPES IDENTIFIED

### Core Components (via `data-cmp-is` attribute):
- **accordion** (x4 instances — used in FAQ and mega-navigation)

### Component Classes (from `cmp-` prefix analysis):
| Component Class           | Purpose                                    |
|---------------------------|--------------------------------------------|
| cmp-accordion             | FAQ and tabbed content sections            |
| cmp-button                | CTA buttons                                |
| cmp-container             | Section/content containers                 |
| cmp-dashboardcard         | Statistics/metrics cards                   |
| cmp-experiencefragment    | Header, footer, shared fragments           |
| cmp-grid-custom           | Custom grid layouts                        |
| cmp-grid-meganav-3        | 3-column mega navigation grid              |
| cmp-header                | Section headings with styling              |
| cmp-image                 | Images and image variants                  |
| cmp-list                  | Link lists and navigation lists            |
| cmp-navigation            | Primary site navigation                    |
| cmp-quote                 | Pull quotes with attribution               |
| cmp-separator             | Visual dividers/spacers                    |
| cmp-teaser                | Content teasers/cards with image+text+CTA  |
| cmp-text                  | Rich text content blocks                   |
| cmp-title                 | Styled headings                            |

### Component Size Variants Observed:
- `cmp-accordion-xx-large`
- `cmp-container-full-width`, `cmp-container-medium`, `cmp-container-x-large`, `cmp-container-xx-large`, `cmp-container-xxx-large`
- `cmp-container-fill-right-margin`
- `cmp-quote-x-large`, `cmp-quote-xx-large`
- `cmp-text-xx-large`
- `cmp-title-x-large`, `cmp-title-xx-large`
- `cmp-list-button`, `cmp-list-button-next`, `cmp-list-button-prev`

---

## 5. CONTAINER & LAYOUT SYSTEM

### Container Architecture:
- Uses **AEM Responsive Grid** (`aem-Grid`, `aem-GridColumn`, `aem-Grid--12` 12-column grid)
- Content sections wrapped in `.abbvie-container` with modifier classes

### Container Max-Widths (Desktop @ 1440px viewport):
| Container Variant               | Outer Max-Width | Inner Width | Margin          |
|---------------------------------|-----------------|-------------|-----------------|
| cmp-container-full-width        | 1330px          | 1440px      | 55px / 55px     |
| cmp-container-xx-large          | 1330px          | varies      | 55px / 55px     |
| cmp-container-x-large           | none            | ~500px      | 0px / 0px       |
| cmp-container-medium            | none            | auto        | 70px / 70px     |
| Full-width (mobile, 780px vp)   | none            | 640-780px   | 70px / 70px     |

### Container Modifier Classes:
- **Radius:** `large-radius`, `medium-radius`, `default-radius`
- **Height:** `height-tall`, `height-short`, `height-default`
- **Alignment:** `align-center`
- **Spacing:** `no-bottom-margin`, `no-padding`
- **Layout:** `overlap-predecessor` (overlapping card effect), `semi-transparent-layer`, `footer-overlap`
- **Padding:** Inner containers use `padding: 56px 70px 0px` (desktop)

### Separator Heights Used:
- `separator-height-16`
- `separator-height-48`
- `separator-height-80`
- `separator-height-96`

---

## 6. BACKGROUND COLORS

| Section / Context                        | Background Color                    |
|------------------------------------------|-------------------------------------|
| Header navigation bar                    | `rgb(255, 255, 255)` (white)       |
| Hero dark container (breadcrumb area)    | `rgb(7, 29, 73)` (AbbVie navy)     |
| Content cards / white sections           | `rgb(255, 255, 255)` (white)       |
| Footer area                             | `rgb(250, 250, 250)` (light gray)  |
| Most section containers                 | `rgba(0, 0, 0, 0)` (transparent)   |
| Page background                          | White (default)                     |

### Key Brand Colors Observed:
- **AbbVie Navy:** `rgb(7, 29, 73)` / `#071D49` — used for dark hero backgrounds
- **White:** `rgb(255, 255, 255)` — primary content background
- **Light Gray:** `rgb(250, 250, 250)` — footer background

---

## 7. MEDIA & VIDEO

### Video Players:
- **Brightcove** video player integration (2 instances on the page)
  1. "R&D Identity_Anthem Video_external_short version v3" (1:08 duration)
  2. "Ambily" (1:30 duration)
- Video.js errors noted in console: `Ignoring already initialized player`

### Images:
- Hero image of scientists in lab coats
- Lab safety cabinet (blue-lit)
- AbbVie Bay Area building exterior
- Scientist with goggles and petri dish
- Microscope image of cells
- Ambily Abraham video thumbnail
- 4 story card thumbnails (Persistence Lab, One Minute Thesis, Lab of the Future, Discovery Files)

---

## 8. ACCESSIBILITY OBSERVATIONS

- "Skip to main content" link present (targets `#maincontent`)
- All images have alt text (mostly descriptive)
- Navigation landmarks present: `banner`, `navigation "Primary"`, `navigation "Breadcrumb"`
- Heading hierarchy: H1 used twice (hero and stories section), H2 for major sections, H3/H4 for sub-sections
- Accordion buttons have descriptive labels
- Video players have region labels
- Cookie banner uses `alertdialog` role

### Potential Issues:
- **H1 used twice** on the page ("Where science finds its full potential" and "The stories behind our science") -- should ideally have one H1
- One image has alt text "none" (in the CTA section) -- should be empty string if decorative
- Some headings use ALL CAPS text in content ("THE PERSISTENCE LAB", "PATIENT impact") -- verify CSS handles this vs. hard-coded caps

---

## 9. TECHNICAL NOTES

- **SPA-like behavior:** The site uses aggressive client-side navigation. After initial page load, the mega-navigation and internal clicks trigger SPA-style transitions that change the page URL without a full reload. This caused difficulty capturing stable screenshots and evaluate data.
- **Console errors:** 404 errors on some resources, Brightcove video initialization errors
- **Cookie consent:** OneTrust-style cookie banner with "Cookies Settings" and "Close" buttons
- **Survey popup:** Bowen Craggs survey dialog may appear after browsing
- **Experience Fragments:** Header and footer loaded as AEM Experience Fragments (`cmp-experiencefragment--header`, `cmp-experiencefragment--footer`)

---

## 10. SCREENSHOT

Saved to: `/workspace/audit/science-hub.png`

Note: Due to the site's SPA navigation behavior, the full-page screenshot captured a different page (Patients). The accessibility tree snapshot (captured multiple times successfully) provides the authoritative record of the Science page structure documented above.

---

## 11. SUMMARY

The AbbVie Science Hub page is a content-rich, multi-section page built on traditional AEM (not Edge Delivery Services). It features:
- **10 distinct content sections** plus header and footer
- **Key component types:** Hero banner, statistics dashboard (6 stat cards), link lists, video players (2x Brightcove), content teasers (4-card grid), pull quotes, FAQ accordion (4 items), and a recruitment CTA
- **Layout system:** AEM 12-column responsive grid with custom `abbvie-container` wrappers providing max-width constraints (1330px at desktop), radius, height, and spacing modifiers
- **Color palette:** AbbVie navy (#071D49), white, and light gray
- **Therapeutic areas highlighted:** Immunology, Oncology, Neuroscience, Eye Care, Aesthetics, Other Specialties
