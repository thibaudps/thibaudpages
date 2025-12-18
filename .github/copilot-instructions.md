# AI Coding Agent Instructions for Portfolio Site

## Architecture Overview
This is a single-page React portfolio website built with Vite, featuring a unique corkboard-style interface. The app renders different components based on screen size: `CorkBoard` for desktop (>768px) and `CorkBoardMobile` for mobile.

- **Data Flow**: Portfolio content is centralized in `src/config/portfolioConfig.js`, which defines section positions, sticky notes, and portfolio items. Components import this config directly.
- **Responsive Design**: Desktop uses absolute positioning on a large virtual canvas (5500x2500px) with zoom/pan interactions. Mobile uses vertical scrolling sections with card layouts.
- **Animations**: Extensive use of Framer Motion for smooth transitions, zooms, and interactive elements.

## Key Components
- `App.jsx`: Main router with loading screen (3s delay) and responsive component selection.
- `CorkBoard.jsx`: Desktop corkboard with positioned sections, buttons, and portfolio items using absolute coordinates.
- `CorkBoardMobile.jsx`: Mobile-optimized vertical layout with section cards.
- `ContactForm.jsx`: Static form that logs to console (no backend integration).
- `LoadingScreen.jsx`: Animated progress bar with gradient background.

## Developer Workflows
- **Development**: `npm run dev` starts Vite dev server with HMR.
- **Build**: `npm run build` outputs to `dist/` with production base path `/thibaudpages/` for GitHub Pages.
- **Deploy**: `npm run deploy` uses `gh-pages` to publish `dist/` to GitHub Pages.
- **Linting**: ESLint with React hooks and refresh plugins; ignores `dist/`.

## Project Conventions
- **Styling**: Tailwind CSS with custom fonts loaded via `src/components/fonts.css`. Avoid inline styles except for absolute positioning.
- **Image Assets**: Stored in `public/images/` with subfolders (`boutons/`, `portfolio/`, `sections/`). Reference via `import.meta.env.BASE_URL + 'images/...'`.
- **Component Structure**: Large components with internal config objects (e.g., `CONFIG`, `SECTIONS_DATA`). Use `/* eslint-disable no-unused-vars */` for unused imports.
- **Mobile Detection**: Window width <=768px triggers mobile view; handled in `App.jsx` with resize listener.
- **Animation Patterns**: Framer Motion `motion` components with `AnimatePresence` for enter/exit. Common variants: zoom transitions, drag constraints.

## Integration Points
- No external APIs or databases; all data is static in config files.
- Contact form is placeholder - extend with EmailJS or similar for actual sending.
- GitHub Pages deployment requires base path configuration in `vite.config.js`.

## Examples
- Adding a new portfolio section: Update `portfolioConfig.js` with position/color, then modify `CorkBoard.jsx` SECTIONS array and button config.
- Mobile card layout: Each section in `CorkBoardMobile.jsx` has `cards` array with title/description/image.
- Animation: Use `motion.div` with `whileHover={{ scale: 1.1 }}` for interactive elements.</content>
<parameter name="filePath">c:\Users\thiba\Desktop\TiboSite\portfolio-thibaudpages\.github\copilot-instructions.md