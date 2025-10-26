# Design Guidelines: Student Cooking Support Platform

## Design Approach

**Hybrid Approach: Recipe Platform Patterns + Material Design Structure**

Drawing inspiration from successful budget recipe platforms (Budget Bytes, Tasty, Cookpad) combined with Material Design's card-based information architecture. This balances the visual appeal needed for food content with the utility-focused filtering and planning tools.

**Core Principles:**
- Clear visual hierarchy prioritizing recipe imagery and pricing
- Efficient scanning for budget-conscious decisions
- Approachable, student-friendly interface
- Data-dense filtering without overwhelming users

## Color System

**Primary Palette:**
- Primary: #556B2F (Dark Olive) - Headers, primary buttons, navigation
- Secondary: #8FA31E (Olive Green) - Accent elements, hover states, badges
- Tertiary: #C6D870 (Light Green) - Cards backgrounds, secondary buttons, highlights
- Background: #EFF5D2 (Cream) - Page background, light sections
- Additional: White (#FFFFFF) for content cards and form fields
- Text: #2D3319 (Very dark olive-brown) for body text, #556B2F for headings
- Success/Budget indicators: #8FA31E
- Borders: #C6D870 for subtle divisions

## Typography

**Font Stack:**
- Primary: 'Inter' (Google Fonts) - Clean, modern sans-serif for UI elements
- Display: 'Lexend' (Google Fonts) - Friendly, readable for headings and Vietnamese text

**Hierarchy:**
- H1 (Hero/Page Titles): Lexend Bold, 48px desktop / 32px mobile
- H2 (Section Headers): Lexend Semibold, 36px desktop / 28px mobile
- H3 (Card Titles/Recipe Names): Lexend Medium, 24px desktop / 20px mobile
- H4 (Subsections): Inter Semibold, 18px
- Body: Inter Regular, 16px, line-height 1.6
- Small Text (Metadata): Inter Regular, 14px
- Captions: Inter Regular, 12px

## Layout System

**Spacing Units:** Tailwind units of 2, 4, 6, 8, 12, 16, 20, 24
- Common padding: p-4, p-6, p-8
- Section spacing: py-12, py-16, py-20
- Card gaps: gap-6, gap-8
- Component margins: mb-4, mb-6, mb-8

**Container Strategy:**
- Max-width: max-w-7xl for main content
- Grid layouts: 3 columns desktop (grid-cols-3), 2 columns tablet (md:grid-cols-2), 1 column mobile
- Recipe cards: 4 columns on wide screens (xl:grid-cols-4)

**Responsive Breakpoints:**
- Mobile-first approach
- Tablet: md: (768px)
- Desktop: lg: (1024px)
- Wide: xl: (1280px)

## Component Library

### Navigation Header
- Sticky header with #556B2F background
- White logo and menu text
- Horizontal menu on desktop, hamburger on mobile
- Menu items: Equal spacing, hover underline animation in #8FA31E

### Hero Section
- Height: 70vh on desktop, 60vh on mobile
- Background: Large appetizing Vietnamese student meal image (phở, cơm, or bún setup)
- Overlay: Semi-transparent dark gradient (rgba(45, 51, 25, 0.4))
- Centered content with white text
- Primary CTA button: #8FA31E background, white text, 20px padding, blur backdrop-filter on button background
- Supporting text: max-width 600px, centered

### Feature Cards (3-Column Grid)
- White background cards with subtle shadow
- Hover: Lift effect (transform: translateY(-4px))
- Icon at top: 64px circular container with #C6D870 background
- Title: H3 styling in #556B2F
- Description: Body text, 3-4 lines max
- Border-radius: 12px
- Padding: p-8

### Statistics Bar
- Background: White or #EFF5D2 section
- 3-4 stat blocks in horizontal layout
- Large numbers: 48px, Lexend Bold, #556B2F
- Labels: 14px, Inter Regular, #2D3319
- Dividers between stats using #C6D870

### Filter Section
- Sticky or prominent placement above results
- Dropdown/select inputs with #556B2F labels
- Input fields: White background, #C6D870 border, 2px border-radius: 8px
- Primary action button: #556B2F, white text, full-width on mobile
- Chips for active filters: #C6D870 background, removable X icon

### Recipe Card Grid
- 4-column grid on xl, 3 on lg, 2 on md, 1 on mobile
- Card structure:
  - Image: 16:9 aspect ratio, object-cover
  - Overlay badge (top-right): Price in #8FA31E pill badge
  - Content padding: p-4
  - Title: H4, 2-line clamp
  - Meta row: Time, rating (star icons), servings - small text with icons
  - Rating: Yellow stars (#F59E0B)
- Hover: Shadow enhancement, subtle scale (1.02)

### Recipe Detail Page
- Two-column layout on desktop (60/40 split)
- Left: Large hero image, ingredients list with checkboxes
- Right: Nutrition info card (sticky), pricing breakdown
- Step-by-step: Numbered cards with optional step images
- Substitution suggestions: Inline badges with #8FA31E background

### Menu Generator Results
- Summary card at top: Total cost prominent (#556B2F, large text), meal count
- Day-by-day accordion/tab layout
- Meal cards: Smaller version of recipe cards
- Download button: Secondary style (#C6D870 background)

### Forms & Inputs
- Input fields: 44px height for touch-friendliness
- Border: 1px #C6D870, focus: 2px #556B2F
- Placeholder: Light gray (#9CA3AF)
- Select dropdowns: Custom arrow in #556B2F
- Checkboxes/Radio: #8FA31E when checked

### Buttons
- Primary: #556B2F background, white text, py-3 px-6, rounded-lg
- Secondary: #C6D870 background, #556B2F text
- Outline: Border #556B2F, transparent background
- Hover states: Darken background by 10%
- Active states: Scale(0.98)

### Footer
- Background: #556B2F
- White text for all content
- 3-column layout on desktop: Team info, Contact, Policies
- Divider line: #8FA31E, 1px, opacity 30%
- Links: Hover color #C6D870
- Padding: py-12

## Images Strategy

**Image Usage:**
- **Hero Section:** Large, appetizing Vietnamese student meal setup - warm, inviting, shows budget-friendly ingredients arranged beautifully. Natural lighting, overhead or 45-degree angle.
- **Recipe Cards:** Each recipe needs a well-lit, appetizing food photo (16:9 ratio). Mix of finished dishes and cooking process shots.
- **Feature Icons:** Use icon library (Heroicons or Font Awesome) with food-related icons (utensils, shopping cart, calendar, wallet)
- **Step Images:** Optional but encouraged - in-progress cooking photos for complex steps
- **Placeholder Strategy:** Use subtle #EFF5D2 background with icon placeholder for recipes without photos

**Photography Style:**
- Natural, warm lighting
- Overhead shots for plated dishes
- Include common Vietnamese ingredients in frame
- Budget-conscious presentation (simple plates, realistic portions)
- Avoid overly polished "perfect" food photography

## Accessibility & Polish

- WCAG AA contrast ratios maintained
- Focus indicators: 2px #8FA31E outline
- Touch targets: Minimum 44x44px
- Alt text for all recipe images
- Keyboard navigation support for all interactive elements
- Vietnamese language support throughout
- Loading states: Skeleton screens with #C6D870 shimmer