# Resume Page Testing Checklist

## Manual Testing Guide for Resume Redesign

This document provides a comprehensive checklist for testing the newly redesigned resume page.

---

## 🌐 Browser Testing

### Desktop (1920x1080)
- [ ] Open http://localhost:5174/resume
- [ ] Verify sidebar is visible on the left (dark #2c3e50 background)
- [ ] Verify main content is on the right (white background)
- [ ] Check that sidebar width is approximately 30% (280-350px)
- [ ] Verify sticky header at the top with language toggle and download button

### Tablet (768px - 1024px)
- [ ] Open browser DevTools and set viewport to 768px width
- [ ] Verify layout still maintains sidebar on left
- [ ] Check that content is readable and not cramped
- [ ] Verify all sections are accessible

### Mobile (<768px)
- [ ] Set viewport to 375px width (iPhone SE)
- [ ] Verify layout switches to column/stack layout
- [ ] Sidebar should appear on top, main content below
- [ ] Check that sticky header is functional
- [ ] Verify all touch targets are at least 44x44px

---

## 🎨 Visual Design Testing

### Color Theme
- [ ] Primary color is deep blue (#1976d2) for headings and accents
- [ ] Sidebar background is dark (#2c3e50) with white text
- [ ] Main content has white background with dark text (#212121)
- [ ] Dividers are visible but subtle (#e0e0e0)
- [ ] Cards have light gray background (#fafafa)

### Typography
- [ ] All Chinese text renders correctly (no missing characters)
- [ ] Font sizes are readable (not too small)
- [ ] Line heights provide good readability
- [ ] Headings have proper hierarchy (h4 > h5 > h6)

### Icons
- [ ] Material-UI icons appear correctly (not as boxes or missing)
- [ ] Icons in sidebar sections are visible
- [ ] Contact icons (Email, Phone, GitHub, etc.) display properly

### Photo/Avatar
- [ ] If avatar.jpg exists: Photo displays in circular frame
- [ ] Avatar in sidebar is 150x150px with primary color border
- [ ] Avatar is centered at top of sidebar
- [ ] If photo is missing: Check that no broken image appears

---

## 🌍 Bilingual Support Testing

### Chinese Version (中文)
- [ ] Click "中文" button in toggle
- [ ] Verify all section titles are in Chinese
- [ ] Check personal info labels (性别, 出生日期, 政治面貌)
- [ ] Verify job intention displays correctly
- [ ] Check education shows "在读" badge for in-progress degree
- [ ] Verify "预计" appears with expected graduation date
- [ ] All skills, languages, certificates in Chinese

### English Version
- [ ] Click "English" button in toggle
- [ ] Verify all section titles are in English
- [ ] Check personal info labels (Gender, Birth Date, Political Status)
- [ ] Verify job intention displays correctly
- [ ] Check education shows "In Progress" badge
- [ ] Verify "Expected" appears with graduation date
- [ ] All content properly translated

### Toggle Behavior
- [ ] Language toggle switches state immediately
- [ ] No page reload when switching languages
- [ ] Selected language button is highlighted
- [ ] Data updates for both sidebar and main content

---

## 📄 PDF Download Testing

### Chinese PDF
1. [ ] Select "中文" language
2. [ ] Click "下载简历" button
3. [ ] PDF downloads successfully
4. [ ] Filename format: `张三_简历_YYYY-MM-DD.pdf`
5. [ ] Open PDF and verify:
   - [ ] A4 size (210 x 297 mm)
   - [ ] Sidebar on left (dark background)
   - [ ] Main content on right
   - [ ] Photo appears as 80x80pt circular avatar
   - [ ] Chinese characters render correctly (Source Han Sans CN font)
   - [ ] All sections are present
   - [ ] No content overflow or cut-off
   - [ ] Colors match web version
   - [ ] Content spans multiple pages if needed (no single-page restriction)

### English PDF
1. [ ] Select "English" language
2. [ ] Click "Download Resume" button
3. [ ] PDF downloads successfully
4. [ ] Filename format: `San Zhang_Resume_YYYY-MM-DD.pdf`
5. [ ] Verify all content above in English

### PDF Quality
- [ ] Text is crisp and readable (not blurry)
- [ ] Colors are accurate
- [ ] Layout is professional
- [ ] No overlapping text or elements
- [ ] Skills chips display correctly
- [ ] Bullet points align properly
- [ ] Cards/sections have proper spacing

---

## 📱 Responsive Testing

### Sidebar Behavior
- [ ] Desktop (>768px): Sidebar on left, fixed width
- [ ] Mobile (<768px): Sidebar stacks on top
- [ ] Sidebar content doesn't overflow
- [ ] All sidebar sections accessible on all screen sizes

### Main Content Behavior
- [ ] Content adjusts to available width
- [ ] Cards don't break on smaller screens
- [ ] Chip/badge wrapping works correctly
- [ ] Bullet lists maintain proper indentation

### Header Behavior
- [ ] Sticky header stays at top when scrolling
- [ ] Header elements are properly spaced
- [ ] On mobile: Header elements stack or compress appropriately
- [ ] Download button remains accessible

---

## 🔍 Content Verification

### Personal Info Section (Sidebar)
- [ ] Photo displays (or gracefully handles missing photo)
- [ ] Name appears in large, bold text
- [ ] Gender displayed with icon
- [ ] Birth date formatted correctly
- [ ] Political status shows correctly

### Contact Section (Sidebar)
- [ ] Email is clickable (mailto: link)
- [ ] Phone is clickable (tel: link)
- [ ] Address displays as plain text
- [ ] GitHub link opens in new tab
- [ ] LinkedIn link opens in new tab
- [ ] Website link opens in new tab
- [ ] All icons are visible

### Skills Section (Sidebar)
- [ ] Skills grouped by category
- [ ] Category names in primary color
- [ ] Skill chips have proper styling
- [ ] Multiple skills wrap correctly

### Languages Section (Sidebar)
- [ ] Language name appears in bold
- [ ] Level description appears below name
- [ ] Proper spacing between languages

### Certificates Section (Sidebar)
- [ ] Certificate name in bold primary color
- [ ] Issuer shows below name
- [ ] Date displays correctly
- [ ] Multiple certificates have proper spacing

### Job Intention Section (Main)
- [ ] Large heading with icon
- [ ] Job title displays prominently
- [ ] Proper color (primary blue)

### Personal Summary Section (Main)
- [ ] Section title with proper styling
- [ ] Summary text in card with light background
- [ ] Text is justified and readable
- [ ] Line height provides good readability

### Education Section (Main)
- [ ] Each degree in separate card
- [ ] Degree name is bold
- [ ] "在读" / "In Progress" badge appears for master's degree
- [ ] Research direction displays if present
- [ ] Expected graduation shows with proper format
- [ ] GPA displays if present
- [ ] Honors show as chips
- [ ] Date and location on right side
- [ ] Master's degree appears before bachelor's

### Work Experience Section (Main)
- [ ] Each job in separate card
- [ ] Position name is bold
- [ ] Company name displays below position
- [ ] Location and period on right side
- [ ] Responsibilities in bullet list
- [ ] Achievements in bullet list (if present)
- [ ] Proper spacing and indentation

### Projects Section (Main)
- [ ] Each project in separate card
- [ ] Project name is bold
- [ ] Role displays below name
- [ ] Period on right side
- [ ] Description paragraph readable
- [ ] Technologies show as chips
- [ ] Highlights in bullet list
- [ ] Proper spacing

### Awards Section (Main)
- [ ] Each award in separate card
- [ ] Award name is bold
- [ ] Level badge appears if present
- [ ] Issuer shows below name
- [ ] Date on right side
- [ ] Proper color coding

---

## 🎯 Interaction Testing

### Language Toggle
- [ ] Click between "中文" and "English" multiple times
- [ ] No lag or delay in switching
- [ ] No console errors
- [ ] Data updates consistently

### Download Button
- [ ] Button has hover effect (darker blue)
- [ ] Click triggers PDF generation
- [ ] No console errors during generation
- [ ] Download prompt appears
- [ ] File saves to default download location

### Links
- [ ] Hover states work on all links
- [ ] External links open in new tab
- [ ] Email link opens email client
- [ ] Phone link triggers appropriate action

### Scrolling
- [ ] Smooth scrolling behavior
- [ ] Sticky header remains visible
- [ ] No content jumps or jitters
- [ ] All sections accessible via scroll

---

## 🐛 Error Handling

### Missing Data
- [ ] If photo is missing: No broken image, graceful degradation
- [ ] If optional fields are empty: No display issues
- [ ] If data arrays are empty: Sections still render properly

### Console Errors
- [ ] Open browser DevTools console
- [ ] No red errors on page load
- [ ] No errors when switching languages
- [ ] No errors when downloading PDF
- [ ] No warnings about missing dependencies

---

## ✅ Cross-Browser Testing

### Chrome/Edge (Chromium)
- [ ] Desktop rendering correct
- [ ] Mobile responsive mode works
- [ ] PDF download works
- [ ] No visual glitches

### Firefox
- [ ] Desktop rendering correct
- [ ] Mobile responsive mode works
- [ ] PDF download works
- [ ] No visual glitches

### Safari (macOS/iOS)
- [ ] Desktop rendering correct
- [ ] iOS mobile rendering correct
- [ ] PDF download works
- [ ] No visual glitches
- [ ] Fonts render correctly

---

## 📊 Performance Testing

### Load Time
- [ ] Page loads in < 2 seconds on fast connection
- [ ] Page loads in < 5 seconds on 3G simulation
- [ ] Lazy loading works (if implemented)

### PDF Generation Time
- [ ] PDF generates in < 5 seconds for Chinese version
- [ ] PDF generates in < 5 seconds for English version
- [ ] No browser freeze during generation

### Memory
- [ ] No memory leaks after switching languages multiple times
- [ ] No memory issues after generating multiple PDFs

---

## 🔧 Developer Testing

### Code Quality
- [ ] No TypeScript errors in IDE
- [ ] No ESLint warnings
- [ ] All imports resolve correctly
- [ ] No unused variables or imports

### Build Process
- [ ] `npm run build` completes successfully
- [ ] No build warnings
- [ ] Bundle size is reasonable
- [ ] Production build works in `npm run preview`

---

## 📋 Final Checks

- [ ] All sections from user requirements are present
- [ ] Design matches mockup (sidebar layout with dark theme)
- [ ] Professional appearance suitable for job applications
- [ ] No typos or grammatical errors in template data
- [ ] Photo placeholder instructions are clear in README
- [ ] All links work correctly
- [ ] Resume is ready for customization with real data

---

## 🚀 Deployment Readiness

- [ ] Resume page accessible at `/resume` route
- [ ] Works on production build
- [ ] SEO meta tags appropriate (if applicable)
- [ ] No hardcoded localhost URLs
- [ ] Font files are included in build output
- [ ] All assets load correctly

---

## ✨ User Acceptance Criteria

Based on original requirements:
- [x] Resume looks professional and beautiful
- [x] Includes photo, basic info (gender, birth date, political status)
- [x] Education clearly shows bachelor's vs master's
- [x] Master's degree marked as "在读" with expected graduation
- [x] Research direction displayed for master's
- [x] Job intention prominently displayed
- [x] Personal summary 150-200 words
- [x] Sidebar layout (left: dark, right: white)
- [x] Deep blue theme color (#1976d2)
- [x] Mobile responsive with stack layout
- [x] PDF export with sidebar layout, A4 size
- [x] Bilingual support (Chinese & English)
- [x] Awards section included
- [x] Language ability (CET-6) displayed
- [x] No page header/footer
- [x] Template data ready for user customization

---

**Testing Date**: _____________

**Tested By**: _____________

**Status**: ☐ Pass  ☐ Fail  ☐ Needs Revision

**Notes**:
_____________________________________________________________________________
_____________________________________________________________________________
_____________________________________________________________________________
