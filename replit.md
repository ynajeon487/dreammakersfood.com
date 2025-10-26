# Overview

This is a Vietnamese student cooking support platform called "Dream Makers" (Nấu Ăn Sinh Viên). The application helps students plan budget-friendly meals by providing recipe suggestions, meal planning tools, shopping lists, and AI-powered cooking assistance. The platform focuses on Vietnamese cuisine with cost-effective recipes suitable for student budgets (typically under 30,000 VND per meal).

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

**Framework**: React 18 with TypeScript using Vite as the build tool

**Routing**: Wouter for client-side routing with the following pages:
- Home page with hero section and featured recipes
- Recipes listing and detail pages
- Menu planning (three modes: by-day, by-meal, and by-ingredients with servings support)
  - `/menu` - Main selection page with 3 aligned option cards
  - `/menu/by-day` - Daily menu generator (budget, servings, meals/day, diet, skill level)
  - `/menu/by-meal` - Single meal recipe generator (budget, servings, diet, optional dish name)
  - `/menu/by-ingredients` - Multiple recipe suggestions from available ingredients (ingredients, servings, optional budget, diet, skill level)
- Shopping list management
- Knowledge base with cooking tips

**UI Component Library**: Shadcn/ui (New York style variant) built on top of Radix UI primitives with Tailwind CSS for styling

**State Management**: TanStack Query (React Query v5) for server state management with custom query client configuration

**Design System**:
- Color palette based on olive green tones (#556B2F primary, #8FA31E secondary, #C6D870 tertiary, #EFF5D2 background)
- Typography using Inter for UI elements and Lexend for headings/Vietnamese text
- Consistent spacing using Tailwind's spacing scale
- Custom CSS variables for light/dark mode support with elevation states (hover-elevate, active-elevate)

**Key Features**:
- AI chatbot component with markdown parsing for formatted responses
- Responsive design with mobile-first approach
- Recipe filtering and search functionality
- Interactive menu generation forms with validation
- Ingredient-based recipe suggestions with searchable ingredient library (60+ common Vietnamese ingredients)
- **Warning Banners**: Testing phase notifications across pages
  - **AutoDismissBanner Component** (Reusable): Yellow warning banner with "Trang web đang trong quá trình thử nghiệm." message, AlertCircle icon, auto-dismisses after 5 seconds (toast-like behavior), framer-motion animation with AnimatePresence for smooth entry/exit, appears on every page load (no localStorage persistence), centered layout
    - Applied to 9 pages: Home, Menu, Recipes, Shopping, MenuByDay, MenuByIngredients, MenuByMeal, RecipeDetail, NotFound (404)
    - ARIA accessibility support: role="status" and aria-live="polite" for screen readers
    - data-testid: `banner-testing-warning`
  - **Knowledge Page Banner** (Permanent): Same yellow warning banner but always visible at top of page without auto-dismiss or exit animation, data-testid: `banner-knowledge-warning`

**Animation System**: Framer Motion integration with comprehensive accessibility support
- **Implementation Approach**: Two-layer animation system ensuring accessibility compliance
  - **Layer 1 (JavaScript)**: `useReducedMotion` hook from framer-motion conditionally disables all animations
  - **Layer 2 (CSS)**: `@media (prefers-reduced-motion: reduce)` globally disables CSS-based motion effects
- **Animated Components**:
  - RecipeCard: Fade-in slide-up with stagger (delay: index * 0.1s), hover scale (1.02), tap scale (0.98), image zoom on hover (scale 1.1)
  - Hero: Background zoom-in (scale 1.1 → 1), sequential text fade-ins (delays: 0.2s, 0.4s, 0.6s)
  - FeatureCards: Stagger fade-in from bottom (delay: index * 0.15s), hover lift (y: -8px), icon rotation on hover (360deg)
- **Page-Level Animations**:
  - Home: Hero background zoom, feature cards stagger, featured recipes section with animated title
  - Recipes: Animated page header, recipe cards with stagger effect
  - RecipeDetail: Hero image scale, sequential content reveals (title, ingredients, steps with delays: 0.2s, 0.4s, 0.6s), nutrition sidebar slide-in from right
  - Menu: Animated header, 3 option cards with stagger effect (delays: 0.2s, 0.3s, 0.4s), icon scale on hover
  - MenuByDay: Animated header, form card, and result card on generation
- **Accessibility Features**:
  - Respects user's `prefers-reduced-motion` system preference
  - Zero-duration transitions for reduced motion users (instant rendering)
  - All hover/tap animations disabled when reduced motion is enabled
  - CSS utility classes (hover-elevate, transition-*, transforms) neutralized via media query
  - Dual-layer protection ensures no motion triggers for accessibility users
- **Animation Patterns**:
  - Entrance animations: opacity (0 → 1), y/x transforms (20px → 0), scale (0.95 → 1)
  - Interaction animations: hover scale, tap scale, icon rotation, card lift
  - Timing: smooth easing curves, appropriate delays for stagger effects (0.1-0.15s intervals)
  - Duration: 0.3-0.8s for most animations, instant (0s) for reduced motion users

## Backend Architecture

**Runtime**: Node.js with Express.js server

**API Structure**: RESTful endpoints using Express routes:
- `/api/chat` - AI chatbot interaction endpoint
- `/api/generate-menu` - Menu generation by day (budget, servings, meals/day, diet, skill level)
- `/api/menu/generate-meal` - Individual meal recipe generation (budget, servings, diet, optional dish name)
- `/api/menu/generate-from-ingredients` - Multiple recipe suggestions from available ingredients (ingredients, servings, optional budget, diet, skill level) - generates 2-4 different dishes

**Development Setup**: 
- Vite middleware for HMR in development
- Custom logging middleware for API requests
- Static file serving in production

**Data Layer**: 
- In-memory storage implementation (MemStorage class) for user management
- Schema defined using Drizzle ORM with PostgreSQL dialect
- Database configuration points to Neon serverless PostgreSQL

**Session Management**: Uses connect-pg-simple for PostgreSQL-backed sessions (configured but storage currently in-memory)

## External Dependencies

**AI Service**: OpenAI API integration via Replit's AI Integrations service
- Model: GPT-4o-mini for cost-effective responses
- System prompt configured for Vietnamese student cooking assistance
- Handles general chat, structured menu generation, and ingredient-based recipe suggestions
- **Ingredient-based generation**: Returns suggestions in 2 groups
  - **Group 1 (Zero-cost)**: 1-2 dishes using ONLY available ingredients (no purchases needed)
  - **Group 2 (Budget-friendly)**: 1-2 dishes that can buy additional ingredients within budget
  - Budget parameter is optional - if not provided, focuses on minimal additional purchases
  - Prevents unreasonable combinations (e.g., pork + shrimp in same dish)
  - Creates separate dishes for incompatible ingredients
  - Follows Vietnamese cuisine principles and traditional ingredient pairings
  - Example: Only water spinach → Group 1: Boiled water spinach (0đ), Group 2: Stir-fried water spinach with garlic (buy garlic for 50k)
- Markdown formatting support for rich text responses

**Database**: Neon Serverless PostgreSQL
- Connection via `@neondatabase/serverless` driver
- Schema migrations managed through Drizzle Kit
- Currently using in-memory storage but schema prepared for database migration

**UI Component Dependencies**: Extensive Radix UI component library including:
- Dialog, Popover, Dropdown Menu for overlays
- Form components (Input, Select, Checkbox, Textarea)
- Navigation components (Tabs, Accordion, Navigation Menu)
- Feedback components (Toast, Alert Dialog)

**Asset Management**: Static images stored in `attached_assets/generated_images/` directory for recipe photos

**Recipe Database**: Centralized recipe data structure in `shared/recipes.ts`
- 8 complete Vietnamese recipes with detailed information
- Each recipe includes: name, image, price, cookTime, servings, rating, mealType, description, nutrition (calories/protein/carbs/fat), ingredients with substitutes, cooking steps, and cost breakdown
- All recipes designed for student budgets (prices under 30,000 VND)
- Recipe collection:
  1. Trứng chiên cà chua (15,000đ) - Bữa sáng
  2. Rau muống xào tỏi (12,000đ) - Bữa trưa
  3. Cơm chiên trứng (20,000đ) - Bữa tối
  4. Mì tôm nâng cấp (18,000đ) - Ăn vặt
  5. Cháo gà (25,000đ) - Bữa sáng
  6. Thịt kho trứng (28,000đ) - Bữa trưa
  7. Canh chua cá (22,000đ) - Bữa tối
  8. Đậu hũ sốt cà chua (15,000đ) - Bữa trưa
- Prices based on Bách Hóa Xanh market rates (January 2025) for TP Hồ Chí Minh area
- Recipes.tsx and RecipeDetail.tsx dynamically render from this shared data source

**Ingredient Library**: Comprehensive Vietnamese ingredient database (`client/src/lib/ingredients.ts`)
- 140 detailed cooking ingredients grouped by category (fully updated January 2025)
- Source: Fully synchronized with Shopping page ingredient list (excluding fruits)
- Hierarchical structure with parent categories and detailed sub-items
- **Category Organization**: Rau → Rau thơm → Củ, quả → Nấm (restructured January 2025)
- Detailed breakdown by category:
  - **Rau**: 15 loại (rau cải, đậu đũa, giá, xà lách, cải bẹ xanh, rau muống, cải ngọt, cải thìa, cải ngồng, rau dền, rau lang, rau mồng tơi, rau ngót, rau đắng, rau má)
  - **Rau thơm**: 13 loại (ngò, mùi tàu, rau răm, rau diếp cá, rau húng cây, húng quế, tía tô, hẹ, rau thơm, hành lá, ngò rí, ngò gai, hẹ lá)
  - **Củ, quả**: 33 loại (bắp mỹ, bắp cải trắng, bắp cải tím, bắp cải thảo, khoai tây, bí đỏ, hành tím, tiêu xanh, sả cây, đậu bắp, cà chua, cà chua bi, cà rốt, củ cải trắng, bầu sao, bí xanh, gừng, củ dền, dưa chuột, khoai lang, hành tây, ớt hiểm, thơm, củ sắn, chanh, su su, đậu cove, tỏi, cà pháo, bạc hà, me chua, tắc, khổ qua)
  - **Nấm**: 7 loại (nấm kim châm, nấm hương, nấm đùi gà, nấm bào ngư, nấm tuyết, nấm hương khô, nấm mèo)
  - Thịt: 19 loại (3 parent: thịt heo/bò/gà + 16 chi tiết: 9 heo, 3 bò, 4 gà)
  - Hải sản: 16 loại (2 parent: tôm/cá + 14 chi tiết: 3 tôm, 6 cá, 5 khác - mực, bạch tuộc, tôm nhảy, ốc bươu, ốc móng tay)
  - Đạm thực vật: 5 loại
  - Tinh bột: 7 loại (gạo, mì, bún, bánh mì, miến, phở, hủ tiếu)
  - Gia vị khô: 7 loại (nước mắm, dầu ăn, muối, đường, tiêu, bột ngọt, nước tương)
  - Sữa & Khác: 3 loại (sữa tươi, sữa đặc, bơ)
- Searchable multi-select interface with real-time filtering
- Badge display for selected ingredients
- Custom ingredient input field for ingredients not in the predefined list
- Ingredient analysis logging system to track user-requested ingredients for database expansion
- Used for ingredient-based recipe generation (generates 2 groups of suggestions)
- **Shopping List Integration**: Shopping page uses same ingredient data source with mapped pricing information
  - Prices based on Bách Hóa Xanh and TP Hồ Chí Minh market rates (January 2025)
  - **Unit Types**: Supports multiple units for different ingredient types
    - "trái" (piece/fruit): Used for fruits typically sold by piece (chuối, táo, cam, xoài, thanh long, bưởi, dưa hấu, dưa lưới, dừa xiêm, cam sành)
    - "g" (gram): Used for ingredients sold by weight (vegetables, meats, some fruits like đu đủ, mận, mít)
    - "quả" (piece): Alternative unit for some fruits (legacy, gradually being replaced by "trái")
    - "ổ" (loaf): Used for bánh mì
  - Interactive checkboxes to select items for purchase
  - Dynamic quantity inputs with real-time price recalculation based on baseUnitPrice
  - Dynamic total calculation (only counts checked items)
  - Price disclaimer noting regional variations
  - **Hierarchical Ingredient Selection**: Parent items can be expanded to show specific sub-types
    - Thịt heo: Ba rọi, Sườn non, Nạc vai, Thịt mông (4 loại)
    - Thịt bò: Bò nạc, Bò kho, Thăn nội, Bắp bò (4 loại)
    - Thịt gà: Gà ta, Gà công nghiệp, Đùi gà, Cánh gà (4 loại)
    - Tôm: Tôm sú, Tôm thẻ, Tôm he (3 loại)
    - Cá: Cá rô phi, Cá diêu hồng, Cá lóc, Cá thu (4 loại)
    - Click chevron icon or item name to expand/collapse
    - Each sub-item has independent checkbox and quantity input
    - Sub-items visually indented with border-left
  - **Custom Ingredients**: Add ingredients not in predefined list (like MenuByIngredients page)
    - Input field accepts comma-separated ingredient names
    - Default values: 1 phần, 10.000đ/phần
    - Added to "Nguyên liệu khác" category
    - Fully adjustable quantity and included in total calculation
  - **PDF Download**: Uses jsPDF + html2canvas to generate PDF file
    - Captures styled HTML as PNG image and embeds in PDF (preserves Vietnamese text perfectly)
    - Mobile-friendly download format (A4 portrait)
    - Filename: `danh-sach-mua-sam-YYYY-MM-DD.pdf`
    - Includes both regular items and checked sub-items
  - **Clear list**: Unchecks all items (visual color change only, no strikethrough)

**Build & Development Tools**:
- TypeScript for type safety
- ESBuild for production builds
- PostCSS with Tailwind CSS and Autoprefixer
- Replit-specific plugins for development (cartographer, dev-banner, runtime-error-modal)

**Fonts**: Google Fonts CDN for Inter and Lexend font families