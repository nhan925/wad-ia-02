# Deployment Checklist for GitHub Pages

## Before Deployment

- [x] Project built and tested locally
- [x] All features working correctly
- [x] Responsive design verified
- [x] Cross-browser testing completed

## Step-by-Step Deployment

### 1. Initialize Git Repository (if not done)
```powershell
git init
git add .
git commit -m "Initial commit: Windows 11 Calculator"
```

### 2. Create GitHub Repository
1. Go to https://github.com/new
2. Repository name: `wad-ia-02`
3. Keep it public
4. Don't initialize with README
5. Click "Create repository"

### 3. Connect to GitHub
```powershell
git remote add origin https://github.com/YOUR_USERNAME/wad-ia-02.git
git branch -M main
git push -u origin main
```

### 4. Update vite.config.js
Make sure the `base` matches your repository name:
```javascript
base: '/wad-ia-02/',
```

### 5. Deploy to GitHub Pages
```powershell
npm run deploy
```

This will:
- Build the production version
- Create a `gh-pages` branch
- Push to GitHub

### 6. Configure GitHub Pages
1. Go to repository Settings
2. Click "Pages" in sidebar
3. Under "Source":
   - Branch: `gh-pages`
   - Folder: `/ (root)`
4. Click "Save"

### 7. Wait and Access
Wait 1-2 minutes, then visit:
```
https://YOUR_USERNAME.github.io/wad-ia-02/
```

## Updating the Site

After making changes:
```powershell
git add .
git commit -m "Description of changes"
git push origin main
npm run deploy
```

## Troubleshooting

### Problem: 404 Error
**Solution**: Check that `base` in `vite.config.js` matches repo name

### Problem: Blank Page
**Solution**: Open browser console (F12) to check for errors

### Problem: Changes Not Showing
**Solution**: 
- Hard refresh: `Ctrl + Shift + R`
- Clear browser cache
- Wait a few minutes for GitHub to rebuild

### Problem: Deployment Fails
**Solution**: 
- Verify gh-pages is installed: `npm list gh-pages`
- Check you have write access to the repository
- Ensure you're logged into GitHub

## Verification

✅ Homepage loads correctly
✅ All buttons work
✅ Calculator performs operations correctly
✅ Responsive on mobile
✅ No console errors

## Your Deployed URL
```
https://YOUR_USERNAME.github.io/wad-ia-02/
```

Replace `YOUR_USERNAME` with your actual GitHub username.

---

**Note**: The calculator is now ready for submission! 🎉
