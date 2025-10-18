# Quick Start Guide

## Running the Calculator Locally

1. **Install dependencies** (first time only):
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Open in browser**:
   - Go to: http://localhost:5173/wad-ia-02/

## Deploying to GitHub Pages

1. **Update vite.config.js** with your repository name
2. **Run deployment**:
   ```bash
   npm run deploy
   ```

3. **Configure GitHub Pages**:
   - Settings → Pages
   - Source: gh-pages branch
   - Save

Your site will be live at: `https://YOUR_USERNAME.github.io/wad-ia-02/`

## Testing Keyboard Shortcuts

- **Numbers**: `0-9`
- **Operators**: `+`, `-`, `*`, `/`
- **Equals**: `Enter`
- **Clear**: `Escape`
- **Backspace**: `Backspace`

## Features to Test

✅ Basic operations: `2 + 3 =` → `5`
✅ Sequential: `10 / 2 * 3 =` → `15`
✅ Percentage: `200 - 10% =` → `180`
✅ Square root: `√16` → `4`
✅ Clear Entry: `CE` vs Clear: `C`

Enjoy your calculator! 🎉
