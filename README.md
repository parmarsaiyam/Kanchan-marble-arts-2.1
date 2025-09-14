# Kanchan Marble Arts Website

A premium, production-ready website for a 20-year-old family-run marble arts business specializing in custom mandirs, murtis, pillars, tulsi stands, and artistic pieces.

## 🌟 Features

- **Mobile-First Design**: Optimized for all devices with responsive layouts
- **Premium Aesthetic**: Clean, symmetric design with marble-inspired color palette
- **Gallery with Lightbox**: Interactive masonry gallery with zoom and navigation
- **Content Management System**: Optional Decap CMS for easy content editing
- **PWA Ready**: Installable app with offline support
- **SEO Optimized**: Complete metadata, structured data, and accessibility
- **Fast Performance**: Optimized images, lazy loading, and efficient code
- **CI/CD Ready**: GitHub Actions, ESLint, Prettier, and Husky pre-commit hooks
- **Theme Support**: Light/dark mode toggle and hero layout variants

## 🚀 Quick Start

\`\`\`bash
# Clone the repository
git clone <your-repo-url>
cd kanchan-marble-arts

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
\`\`\`

## 📦 Deployment

### Vercel (Recommended)

1. **Connect Repository**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings

2. **Environment Variables**:
   - In Vercel dashboard, go to Project Settings > Environment Variables
   - Add variables from `.env.example` as needed

3. **Custom Domain** (Optional):
   - Go to Project Settings > Domains
   - Add your custom domain
   - Update DNS records as instructed

4. **Deploy**:
   - Push to main branch to trigger automatic deployment
   - Or click "Deploy" in Vercel dashboard

### Netlify

1. **Build Settings**:
   \`\`\`
   Build command: npm run build
   Publish directory: out
   \`\`\`

2. **Environment Variables**:
   - Go to Site Settings > Environment Variables
   - Add variables from `.env.example`

3. **Deploy**:
   - Connect GitHub repository
   - Enable automatic deploys

### Traditional Hosting

\`\`\`bash
# Build static files
npm run build

# Upload the 'out' folder to your web server
# Ensure your server supports:
# - HTTPS
# - Gzip compression
# - Proper MIME types for modern image formats
\`\`\`

## 🎛️ Content Management

### Option 1: Decap CMS (Recommended for Non-Technical Users)

**Setup**:
1. Deploy your site first
2. Go to `https://yourdomain.com/admin`
3. Authenticate with GitHub
4. Start editing content through the visual interface

**Features**:
- Visual editor for all content
- Image upload and management
- Preview before publishing
- Git-based workflow (all changes are commits)

**Login Instructions**:
1. Visit `/admin` on your live site
2. Click "Login with GitHub"
3. Authorize the application
4. Start editing content

### Option 2: Direct File Editing

Edit JSON files directly in the `content/` folder:

#### Business Information (`content/settings.json`)
\`\`\`json
{
  "brandName": "Your Business Name",
  "tagline": "Your Tagline",
  "phone": "+91 YOUR NUMBER",
  "whatsapp": "+91 YOUR WHATSAPP",
  "email": "your@email.com",
  "address": "Your Full Address",
  "theme": {
    "darkMode": false,
    "heroLayout": "centered"
  }
}
\`\`\`

#### Gallery Management
**Automatic Method** (Recommended):
\`\`\`bash
# Add images to public/images/gallery/[category]/
# Then run:
npm run gallery:update
\`\`\`

**Manual Method**:
Edit `content/gallery.json`:
\`\`\`json
{
  "images": [
    {
      "src": "/images/gallery/mandirs/traditional-mandir.jpg",
      "alt": "Traditional marble mandir",
      "category": "mandirs",
      "width": 800,
      "height": 1000,
      "caption": "Handcrafted traditional mandir"
    }
  ]
}
\`\`\`

#### Products (`content/products.json`)
\`\`\`json
{
  "categories": [
    {
      "name": "Mandirs",
      "description": "Sacred spaces for worship",
      "image": "/images/products/mandirs.jpg",
      "features": ["Custom designs", "Premium marble", "Expert craftsmanship"]
    }
  ]
}
\`\`\`

## 🎨 Customization

### Theme Settings

**Light/Dark Mode**:
- Edit `content/settings.json`
- Set `theme.darkMode` to `true` or `false`

**Hero Layout**:
- Edit `content/settings.json`
- Set `theme.heroLayout` to `"centered"` or `"split"`

### Color Customization

Edit `app/globals.css`:
\`\`\`css
@theme inline {
  /* Light theme */
  --color-background: 254 254 254; /* Marble ivory */
  --color-foreground: 31 31 31;    /* Charcoal */
  --color-accent: 139 90 43;       /* Deep gold */
  
  /* Dark theme */
  --color-background-dark: 31 31 31;
  --color-foreground-dark: 254 254 254;
  --color-accent-dark: 180 140 90;
}
\`\`\`

### Typography

The site uses two fonts:
- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)

To change fonts, edit `app/layout.tsx`:
\`\`\`tsx
import { Cute_Font as YourFont, Cute_Font as AnotherFont } from 'next/font/google'
\`\`\`

## 🔧 Development

### Scripts

\`\`\`bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Production server
npm run lint         # ESLint check
npm run lint:fix     # Fix ESLint issues
npm run format       # Format with Prettier
npm run type-check   # TypeScript check
npm run gallery:update  # Update gallery.json
\`\`\`

### Project Structure

\`\`\`
├── app/                    # Next.js app router
│   ├── (pages)/           # Route groups
│   ├── api/               # API routes
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   └── [feature].tsx     # Feature components
├── content/              # Content JSON files
├── public/               # Static assets
│   ├── admin/            # Decap CMS
│   ├── images/           # Image assets
│   └── icons/            # PWA icons
├── scripts/              # Utility scripts
└── .github/workflows/    # CI/CD workflows
\`\`\`

### Adding New Pages

1. **Create the page**:
   \`\`\`tsx
   // app/new-page/page.tsx
   export default function NewPage() {
     return <div>New Page Content</div>
   }
   \`\`\`

2. **Add navigation**:
   \`\`\`tsx
   // components/header.tsx
   const navItems = [
     // ... existing items
     { name: "New Page", href: "/new-page" }
   ]
   \`\`\`

3. **Update sitemap**:
   \`\`\`xml
   <!-- public/sitemap.xml -->
   <url>
     <loc>https://yourdomain.com/new-page</loc>
     <lastmod>2024-01-15</lastmod>
   </url>
   \`\`\`

## 📊 Performance & SEO

### Lighthouse Scores Target
- **Performance**: ≥95
- **Accessibility**: ≥90
- **Best Practices**: ≥95
- **SEO**: ≥95

### Performance Tips

1. **Images**:
   - Use WebP/AVIF formats
   - Optimize file sizes (< 500KB)
   - Use proper dimensions
   - Enable lazy loading

2. **Code**:
   - Minimize JavaScript bundles
   - Use dynamic imports for large components
   - Enable compression (Gzip/Brotli)

3. **Fonts**:
   - Use `font-display: swap`
   - Preload critical fonts
   - Subset fonts if possible

### SEO Features

- **Metadata**: Complete meta tags for all pages
- **Structured Data**: JSON-LD for local business
- **Sitemap**: Auto-generated XML sitemap
- **Robots.txt**: Search engine instructions
- **Open Graph**: Social media previews
- **Accessibility**: WCAG AA compliant

## 🔒 Security

### Best Practices Implemented

- **HTTPS**: Enforced in production
- **Content Security Policy**: Headers configured
- **Input Validation**: Form validation on client and server
- **Dependencies**: Regular security updates via Dependabot
- **Environment Variables**: Sensitive data in env files only

### Regular Maintenance

\`\`\`bash
# Update dependencies
npm audit
npm update

# Check for security vulnerabilities
npm audit fix

# Update Node.js version as needed
\`\`\`

## 📈 Analytics & Monitoring

### Google Analytics 4

1. **Get Tracking ID**:
   - Go to [analytics.google.com](https://analytics.google.com)
   - Create property and get GA4 ID

2. **Add to Environment**:
   \`\`\`env
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   \`\`\`

3. **Verify Setup**:
   - Use Google Analytics Debugger
   - Check Real-time reports

### Vercel Analytics

\`\`\`env
NEXT_PUBLIC_VERCEL_ANALYTICS=true
\`\`\`

### Core Web Vitals Monitoring

- Monitor in Google Search Console
- Use Vercel Speed Insights
- Regular Lighthouse audits

## 🆘 Troubleshooting

### Common Issues

**Build Errors**:
\`\`\`bash
# Clear Next.js cache
rm -rf .next
npm run build

# Check TypeScript errors
npm run type-check

# Check ESLint errors
npm run lint
\`\`\`

**Images Not Loading**:
- Verify file paths in JSON files
- Check image files exist in `public/images/`
- Ensure proper file extensions

**CMS Not Working**:
- Check GitHub authentication
- Verify `config.yml` syntax
- Ensure proper repository permissions

**Performance Issues**:
- Optimize images (use WebP/AVIF)
- Check bundle size with `npm run build`
- Enable compression on server

### Getting Help

1. **Check Console**: Browser dev tools for JavaScript errors
2. **Validate JSON**: Use JSON validator for content files
3. **Test Locally**: Always test changes locally first
4. **Check Logs**: Vercel/Netlify deployment logs for build errors

## 📞 Support

### For Content Updates
- Use Decap CMS at `/admin` (recommended)
- Edit JSON files directly
- Run `npm run gallery:update` after adding images

### For Technical Issues
- Check this README first
- Review error messages carefully
- Test in different browsers
- Contact your developer for custom changes

### Regular Maintenance Schedule

**Monthly**:
- Add new gallery images
- Update testimonials
- Check performance scores

**Quarterly**:
- Review and update content
- Check for dependency updates
- Audit accessibility

**Annually**:
- Update copyright year
- Review contact information
- Renew SSL certificates (if self-managed)

---

## 🏗️ Built With

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI + shadcn/ui
- **Icons**: Lucide React
- **Fonts**: Geist (Inter alternative)
- **CMS**: Decap CMS (optional)
- **Deployment**: Vercel (recommended)

**Built with ❤️ for Kanchan Marble Arts**

*Last updated: Aug 2025*
