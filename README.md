# QR Pro - Professional QR Code Generator

A clean, minimalist QR code generator built with TypeScript and Vite, designed for production deployment with Nixpacks.

## Features

- 🎨 Clean, minimalist UI inspired by Vercel
- ⚡ Fast QR code generation
- 📱 Responsive design
- 🎯 Multiple size options
- 🔧 Error correction levels
- 💾 PNG download functionality
- 📊 Google AdSense integration
- 🚀 Production-ready deployment

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Production Deployment with Nixpacks

This project is configured for Nixpacks deployment:

1. **Automatic Detection**: Nixpacks will detect this as a Node.js project
2. **Build Process**: Runs `npm ci` and `npm run build`
3. **Server**: Uses `serve` to host the static files
4. **Configuration**: See `nixpacks.toml` for custom settings

### Deploy to Railway, Render, or other Nixpacks-compatible platforms:

```bash
# The project will automatically build and deploy
# No additional configuration needed
```

## AdSense Integration

The project includes Google AdSense integration with:
- Top banner ad placement
- Bottom banner ad placement
- Responsive ad units
- Automatic initialization

**Note**: Update the `data-ad-slot` values in `index.html` with your actual AdSense ad unit IDs.

## Project Structure

```
├── src/
│   └── main.ts          # Main TypeScript application
├── public/
│   └── favicon.svg      # SVG favicon
├── index.html           # Main HTML file with SEO optimization
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── vite.config.ts       # Vite build configuration
├── nixpacks.toml        # Nixpacks deployment configuration
└── README.md           # This file
```

## SEO Features

- Meta tags for search engines
- Open Graph tags for social sharing
- Twitter Card support
- Structured data ready
- Mobile-optimized

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
