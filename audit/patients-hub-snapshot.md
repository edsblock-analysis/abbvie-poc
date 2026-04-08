# Patients Hub Page - Accessibility Snapshot
## URL: https://www.abbvie.com/patients.html
## Title: Patients | AbbVie

### Page Structure (Accessibility Tree)

```yaml
- generic [active]:
  - generic:
    - generic:
      - link "Skip to main content"
      - banner:
        - generic:
          - link "Logo AbbVie"
            - img "Logo AbbVie"
          - navigation "Primary":
            - list:
              - listitem: button "Who We Are"
              - listitem: button "Science"
              - listitem: button "Current selection: Patients"
              - listitem: button "Join Us"
              - listitem: button "Sustainability"
        - list:
          - listitem: button "More - Overflow Links" (MORE)
          - listitem: button "GLOBAL"
          - listitem: button "Search AbbVie.com"

    # MAIN CONTENT AREA
    - generic: # Main content wrapper

      ## SECTION 1: Hero
      - generic:
        - img "rhonda patient hero"
      - generic:
        - heading "Putting People First" [level=1]
        - paragraph: "As we strive to develop medicines and solutions that can make lives better, we do so with patients at the heart. See how the journeys of people like Rhonda, Mike, and Tenia fuel our ambition to make possibilities real."

      ## SECTION 2: Patient Stories (Video Grid)
      - generic:
        - generic:
          - generic:
            - img "mike video poster"
            - generic:
              - heading "Meet Mike" [level=2]
              - button "Watch 0:48"
          - generic:
            - heading "Behind every breakthrough - a story." [level=2]
            - paragraph: "Explore the real life stories that inspire us to create medicines that make a difference."
        - heading "More Patient Stories" [level=3]
        - generic:
          - generic:
            - img "rhonda video poster"
            - paragraph: "Meet Rhonda"
            - button "Watch 0:52"
          - generic:
            - img "tania video poster"
            - paragraph: "Meet Tenia"
            - button "Watch 0:44"
          - generic:
            - img "devan poster image video"
            - paragraph: "Meet Devan"
            - button "Watch 0:43"

      ## SECTION 3: CTA Band
      - generic:
        - generic:
          - heading "Get to know the people making our breakthroughs possible." [level=4]
          - paragraph: "Our teams pursue answers to some of the toughest health challenges."
        - link "WHO WE ARE"

      ## SECTION 4: Research & Development
      - generic:
        - heading "RESEARCH & DEVELOPMENT" [level=2]
        - heading "Innovating to meet patient needs" [level=3]
        - paragraph: "We partner with patients, patient organizations, caregivers and clinicians to ensure that individual experiences, perspectives, needs and priorities are part of our clinical development process."

      ## SECTION 5: Story Cards (Dashboard Cards)
      - generic:
        - link: "Neuroscience - How the Parkinson's Disease Community and AbbVie are Shaping the Future of Care"
          - heading "Neuroscience" [level=2]
          - heading [level=4]: "How the Parkinson's Disease Community and AbbVie are Shaping the Future of Care"
          - paragraph: "Exploring new frontiers in Parkinson's disease research."
          - "Read article"
        - link: "Science - Elevating health care for all"
          - heading "Science" [level=2]
          - heading [level=4]: "Elevating health care for all"
          - paragraph: "See how AbbVie goes beyond the numbers to increase representation in clinical trials."
          - "Read Article"
        - link: "science - Clinical Trials"
          - heading "science" [level=2]
          - heading "Clinical Trials" [level=4]
          - paragraph: "Explore how we turn our research into reality."
          - "Learn More"
        - generic (Statistics/Counter):
          - img "two women in lab"
          - heading "PARTNERSHIPS" [level=2]
          - "250+"
          - "research partnerships, including leading biotechs, universities, government organizations and nonprofits"

      ## SECTION 6: Separator
      - generic: separator

      ## SECTION 7: Patient Health & Engagement Grid
      - generic:
        - generic:
          - heading "PATIENT HEALTH & ENGAGEMENT" [level=2]
          - heading "We work to improve health outcomes for patients globally" [level=5]
        - generic (2x2 Grid):
          - generic:
            - generic:
              - img "man with glasses"
              - heading "Patient support programs" [level=2]
              - paragraph: "Our patient support programs help prescribed patients reach their full treatment potential through disease education and access resources."
              - link "Learn More" -> /patients/patient-support/patient-assistance.html
              - separator
            - generic:
              - img "daughter dad cooking"
              - heading "Educational programs" [level=2]
              - paragraph: "We support educational programs that equip patients, their families and caregivers with the knowledge and resources to understand and manage their diseases."
              - separator
          - generic:
            - generic:
              - img "two men standing hall feature"
              - heading "Partnerships" [level=2]
              - paragraph: "With partners, we work to amplify the impact of our scientific progress, because we know many patient challenges cannot be solved alone."
            - generic:
              - img "woman with headphones"
              - heading "Grants" [level=2]
              - paragraph: "AbbVie supports independent education for experienced healthcare providers and scientists studying current, new and emerging science."
              - link "Learn More" -> /science/independent-educational-grants.html

      ## SECTION 8: Separators
      - generic: separator
      - generic: separator

    # FOOTER
    - generic:
      - button "Scroll to top of page"
      - generic:
        - img "AbbVie logo"
        - generic:
          - list (Footer Nav): Who We Are, Science, Patients, Join Us, Sustainability
          - list (Social): Facebook, Twitter, Instagram, LinkedIn, YouTube, TikTok
        - generic:
          - heading "Popular pages" [level=2]
          - list: Pipeline, Products, Partner with Us, Patient Support
        - generic:
          - heading "External links" [level=2]
          - list: News Center, Investors, Contract Manufacturing, Medical Information
          - separator
          - generic:
            - paragraph: trademark notice
            - paragraph: "Copyright 2026 AbbVie Inc. North Chicago, Illinois, U.S.A."
      - separator
      - separator
      - list (Legal Footer): Contact Us, Accessibility Statement, Site Map, Terms of Use, Privacy Notice, Consumer Health Data Privacy Notice, Cookie Settings, Your Privacy Choices

  # Cookie Banner
  - region "Cookie banner":
    - alertdialog "Privacy":
      - paragraph: cookie disclosure text
      - button "Cookies Settings"
      - button "Close"
```
