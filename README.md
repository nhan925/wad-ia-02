# Windows 11 Calculator - Web Application

A fully functional web-based calculator that replicates the Windows 11 Calculator's Basic Mode. Built with React, Vite, and Tailwind CSS, featuring a modern UI with dark/light themes, calculation history, memory functions, and complete keyboard support with responsive design.

![Calculator Preview](https://img.shields.io/badge/React-18.3.1-blue) ![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4.0-38bdf8) ![Vite](https://img.shields.io/badge/Vite-5.4-646CFF) ![License](https://img.shields.io/badge/License-MIT-green)

---

## 📋 Table of Contents

- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Installation & Setup](#-installation--setup)
- [Usage Guide](#-usage-guide)
- [Deployment to GitHub Pages](#-deployment-to-github-pages)
- [Project Structure](#-project-structure)
- [Documentation](#-documentation)
- [License](#-license)

---

## ✨ Features

### Core Functionality
✅ **Complete Arithmetic Operations**: Addition, subtraction, multiplication, division  
✅ **Sequential Calculation Logic**: Left-to-right evaluation (e.g., `2 + 3 × 4 = 20`)  
✅ **Special Functions**: Square root (√), square (x²), reciprocal (¹⁄ₓ), percentage (%)  
✅ **Sign Toggle**: Positive/negative switching (±)  
✅ **Decimal Support**: Full floating-point precision using Decimal.js  
✅ **Error Handling**: Graceful handling of division by zero and invalid operations  

### Memory Operations
✅ **Memory Store (MS)**: Save current value to memory  
✅ **Memory Recall (MR)**: Retrieve stored memory value  
✅ **Memory Add (M+)**: Add current value to memory  
✅ **Memory Subtract (M−)**: Subtract current value from memory  
✅ **Memory Clear (MC)**: Clear memory storage  
✅ **Visual Indicator**: "M" badge shows when memory contains a value  

### Calculation History
✅ **Persistent History**: All calculations automatically saved with timestamps  
✅ **History Panel**: Toggle-able sidebar showing past calculations  
✅ **Click to Reuse**: Select any history entry to load its result  
✅ **Clear History**: Remove all history entries  
✅ **Real-time Updates**: History updates immediately after calculations  

### User Interface
✅ **Windows 11 Design**: Authentic Windows 11 Calculator appearance  
✅ **Dark/Light Themes**: Toggle between dark and light color schemes  
✅ **Theme Persistence**: Selected theme saved to localStorage  
✅ **Smooth Animations**: Polished transitions and hover effects  
✅ **Visual Feedback**: Clear hover, active, and focus states  

### Input Methods
✅ **Full Keyboard Support**: All operations accessible via keyboard  
✅ **Mouse/Touch Input**: Click or tap any button  
✅ **Keyboard Shortcuts**: Quick access to all functions (see Usage Guide)  

### Responsive Design
✅ **Mobile Optimized**: History panel appears as popup on mobile  
✅ **Adaptive Layout**: Optimized for phones, tablets, and desktops  
✅ **Touch-Friendly**: Large button targets for mobile devices  
✅ **Responsive Text**: Text sizes adjust based on screen size  
✅ **Cross-Browser**: Works on Chrome, Firefox, Safari, and Edge  

### Control Functions
✅ **Clear All (C)**: Reset calculator completely  
✅ **Clear Entry (CE)**: Clear current input only  
✅ **Backspace (⌫)**: Delete last digit entered  

---

## 🛠️ Technology Stack

### Core Technologies
- **React 18.3.1** - Modern UI library with hooks
- **Vite 5.4.2** - Lightning-fast build tool and dev server
- **Tailwind CSS 4.0** - Utility-first CSS framework
- **Decimal.js 10.4.3** - Arbitrary-precision decimal arithmetic

### Styling & Design
- **PostCSS** - CSS processing
- **Autoprefixer** - Cross-browser CSS compatibility
- **Custom CSS Variables** - Dynamic theming system

### Custom Hooks
- **useCalculator** - Calculator logic and state management
- **useMemory** - Memory operations (MS, MR, M+, M−, MC)
- **useTheme** - Dark/light theme toggling with persistence

### Development Tools
- **@vitejs/plugin-react** - Fast Refresh and JSX support
- **ESLint** - Code quality and consistency
- **gh-pages** - Automated GitHub Pages deployment

### Browser APIs
- **LocalStorage API** - Theme and history persistence
- **Keyboard Events API** - Keyboard input handling
- **CSS Custom Properties** - Dynamic theming
- **Flexbox & Grid** - Responsive layouts

---

## 🚀 Installation & Setup

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher) or **yarn** (v1.22.0 or higher)
- **Git** (for cloning the repository)

### Step 1: Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/wad-ia-02.git
cd wad-ia-02
```

### Step 2: Install Dependencies

Using npm:
```bash
npm install
```

Using yarn:
```bash
yarn install
```

### Step 3: Run the Development Server

Using npm:
```bash
npm run dev
```

Using yarn:
```bash
yarn dev
```

The application will open in your browser at `http://localhost:5173`

### Step 4: Build for Production

To create an optimized production build:

Using npm:
```bash
npm run build
```

Using yarn:
```bash
yarn build
```

The production files will be generated in the `dist/` directory.

### Step 5: Preview Production Build

To preview the production build locally:

Using npm:
```bash
npm run preview
```

Using yarn:
```bash
yarn preview
```

---

## 🌐 Deployment to GitHub Pages

Follow these step-by-step instructions to deploy your calculator to GitHub Pages:

### Step 1: Update `vite.config.js`

The `base` property in `vite.config.js` should match your repository name:

```javascript
export default defineConfig({
  plugins: [react()],
  base: '/wad-ia-02/', // Replace with your repository name
})
```

### Step 2: Install gh-pages Package

If not already installed:

```bash
npm install --save-dev gh-pages
```

### Step 3: Add Deployment Scripts

Verify your `package.json` contains these scripts:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

### Step 4: Create GitHub Repository

1. Go to [GitHub](https://github.com)
2. Click the "+" icon in the top right
3. Select "New repository"
4. Name it `wad-ia-02` (or your chosen name)
5. **Do not** initialize with README (we already have one)
6. Click "Create repository"

### Step 5: Connect Local Repository to GitHub

If you haven't already initialized git:

```bash
git init
git add .
git commit -m "Initial commit: Windows 11 Calculator"
```

Add the remote repository and push:

```bash
git remote add origin https://github.com/YOUR_USERNAME/wad-ia-02.git
git branch -M main
git push -u origin main
```

### Step 6: Deploy to GitHub Pages

Run the deployment command:

```bash
npm run deploy
```

This will:
1. Build the production version
2. Create a `gh-pages` branch
3. Push the `dist` folder contents to that branch

### Step 7: Configure GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (in the left sidebar)
3. Under **Source**, select:
   - Branch: `gh-pages`
   - Folder: `/ (root)`
4. Click **Save**

### Step 8: Access Your Deployed Calculator

After a few minutes, your calculator will be available at:

```
https://YOUR_USERNAME.github.io/wad-ia-02/
```

### Updating the Deployment

To deploy updates:

```bash
git add .
git commit -m "Update: Description of changes"
git push origin main
npm run deploy
```

### Troubleshooting Deployment

**Issue: 404 Error after deployment**
- Solution: Verify the `base` in `vite.config.js` matches your repository name

**Issue: Blank page after deployment**
- Solution: Check browser console for errors. Ensure all asset paths are correct

**Issue: Deployment fails**
- Solution: Ensure you have push permissions to the repository
- Solution: Check that `gh-pages` is installed: `npm list gh-pages`

**Issue: Changes not showing**
- Solution: Hard refresh the page (Ctrl+Shift+R or Cmd+Shift+R)
- Solution: Clear browser cache

---

## 📖 Usage Guide

### Basic Operations

1. **Enter a number**: Click digit buttons or type on keyboard
2. **Perform calculation**: Click an operator (+, −, ×, ÷)
3. **Get result**: Click = or press Enter

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `0-9` | Enter number |
| `.` or `,` | Decimal point |
| `+` | Addition |
| `-` | Subtraction |
| `*` | Multiplication |
| `/` | Division |
| `=` or `Enter` | Equals |
| `%` | Percentage |
| `Backspace` | Delete last digit |
| `Delete` | Clear entry (CE) |
| `Escape` | Clear all (C) |

### Special Functions

- **√ (Square Root)**: Click after entering a number
- **x² (Square)**: Click after entering a number
- **¹⁄ₓ (Reciprocal)**: Click after entering a number
- **± (Negate)**: Toggle positive/negative
- **% (Percentage)**: Context-dependent percentage calculation

### Examples

**Simple Calculation**:
```
2 + 3 = → 5
```

**Chained Operations**:
```
10 / 2 * 3 = → 15
```

**Percentage**:
```
200 - 10% = → 180
```

**Square Root**:
```
16 √ → 4
```

---

## 🛠️ Technology Stack

### Frontend
- **React 18.3.1** - UI library
- **Vite 5.4.2** - Build tool and dev server
- **Tailwind CSS 3.4+** - Utility-first CSS framework
- **PostCSS & Autoprefixer** - CSS processing

### Testing
- **Vitest** - Unit testing framework
- **React Testing Library** - Component testing utilities
- **@testing-library/jest-dom** - Custom matchers
- **@testing-library/user-event** - User interaction simulation
- **jsdom** - DOM implementation for testing

### Development Tools
- **@vitejs/plugin-react** - Fast Refresh and JSX support
- **gh-pages** - Automated GitHub Pages deployment

### Build & Deploy
- **Vite Build** - Optimized production builds with code splitting
- **GitHub Pages** - Free static hosting

### Browser APIs Used
- **DOM Events** - User interaction handling
- **Keyboard Events** - Keyboard input support
- **CSS Custom Properties** - Dynamic theming (via Tailwind)
- **Media Queries** - Responsive design (via Tailwind)

---

## 📁 Project Structure

```
wad-ia-02/
├── docs/                           # Documentation files
│   ├── FUNCTIONAL_SPECIFICATIONS.md    # Detailed functional requirements
│   ├── NON_FUNCTIONAL_SPECIFICATIONS.md # Performance and quality specs
│   ├── ACCEPTANCE_CRITERIA.md          # Project acceptance criteria
│   ├── TESTING_PLAN.md                 # Comprehensive testing plan
│   ├── DEPLOYMENT.md                   # Deployment guide
│   ├── QUICKSTART.md                   # Quick start guide
│   ├── INTERFACE_GUIDE.md              # UI/UX documentation
│   ├── PROJECT_SUMMARY.md              # Project overview
│   └── INDEX.md                        # Documentation index
├── public/                         # Static assets
│   └── fonts/                      # Custom fonts (if any)
├── src/
│   ├── components/                 # React components
│   │   ├── Calculator.jsx              # Main calculator component
│   │   ├── Display.jsx                 # Display component
│   │   ├── Button.jsx                  # Reusable button component
│   │   ├── CalculatorButtons.jsx       # Button grid layout
│   │   ├── MemoryButtons.jsx           # Memory operation buttons
│   │   └── HistoryPanel.jsx            # History and memory panel
│   ├── hooks/                      # Custom React hooks
│   │   ├── useCalculator.js            # Calculator logic hook
│   │   ├── useMemory.js                # Memory operations hook
│   │   └── useTheme.js                 # Theme management hook
│   ├── utils/                      # Utility functions
│   │   └── calculatorUtils.js          # Calculator helper functions
│   ├── App.jsx                     # Root component
│   ├── App.css                     # App-level styles
│   ├── main.jsx                    # React entry point
│   └── index.css                   # Global styles and theme variables
├── .gitignore                      # Git ignore rules
├── index.html                      # HTML template
├── package.json                    # Dependencies and scripts
├── vite.config.js                  # Vite configuration
├── tailwind.config.js              # Tailwind CSS configuration (if needed)
├── postcss.config.js               # PostCSS configuration
└── README.md                       # This file
```

### Key Files

- **Calculator.jsx**: Main component with state management and layout
- **useCalculator.js**: Custom hook containing all calculation logic
- **useMemory.js**: Custom hook for memory operations (MC, MR, M+, M−, MS)
- **useTheme.js**: Custom hook for dark/light theme toggling
- **calculatorUtils.js**: Utility functions for formatting and validation
- **index.css**: Global styles, CSS variables for theming, and Tailwind imports
- **vite.config.js**: Build and development server configuration

---

## 📚 Documentation

---

## � Documentation

Comprehensive project documentation is available in the `docs/` folder:

- **[Functional Specifications](docs/FUNCTIONAL_SPECIFICATIONS.md)** - Complete feature documentation with 23 supported features
- **[Non-Functional Specifications](docs/NON_FUNCTIONAL_SPECIFICATIONS.md)** - Performance, usability, compatibility, and security requirements
- **[Acceptance Criteria](docs/ACCEPTANCE_CRITERIA.md)** - 34 testable acceptance criteria with pass/fail status
- **[Testing Plan](docs/TESTING_PLAN.md)** - Comprehensive testing strategy with 118 test cases
- **[Deployment Guide](docs/DEPLOYMENT.md)** - Step-by-step deployment to GitHub Pages
- **[Quick Start Guide](docs/QUICKSTART.md)** - Get started in 5 minutes
- **[Interface Guide](docs/INTERFACE_GUIDE.md)** - UI/UX design documentation
- **[Project Summary](docs/PROJECT_SUMMARY.md)** - High-level project overview

---

## �📝 License

This project is licensed under the MIT License.

```
MIT License

Copyright (c) 2025

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 👨‍💻 Author

Created as part of the Web Application Development (WAD) Individual Assignment 02.

---

## 🙏 Acknowledgments

- Design inspiration from Microsoft's Windows 11 Calculator
- React team for the amazing library
- Vite team for the lightning-fast build tool

---

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Troubleshooting](#troubleshooting-deployment) section
2. Review the [Testing Plan](#-testing-plan) for expected behavior
3. Open an issue on GitHub

---

**Happy Calculating! 🎉**
