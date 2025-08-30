# John Myl Alinsonorin - Personal Portfolio Website

A modern, unique, and minimalistic personal portfolio website built with Vite + React, featuring a distinctive design with animated greetings, floating elements, and innovative visual components.

## ✨ **Unique Features**

- 🌍 **Animated Multi-Language Greetings** - Cycles through "Hi" in 10 different languages every 2 seconds
- 🎭 **Floating Visual Elements** - Animated emojis that float around the hero section
- 🔷 **Hexagon Profile Design** - Unique hexagonal profile shape instead of traditional circles
- 🎨 **Category-Based Skills** - Technologies organized by functional categories with icons
- 🏷️ **Project Status Badges** - Live, In Development, and Prototype status indicators
- ✨ **Enhanced Animations** - Smooth hover effects, sliding animations, and visual feedback
- 🎯 **Modern Gradient Backgrounds** - Multi-layered gradient backgrounds with subtle overlays

## 🎨 **Design Highlights**

- **Unique Color Scheme** - Custom gradients using blue-purple, teal, and coral combinations
- **Hexagonal Elements** - Modern geometric shapes for visual interest
- **Floating Animations** - Subtle floating elements that add life to the design
- **Enhanced Typography** - Better font weights and spacing for improved readability
- **Interactive Elements** - Hover effects, sliding animations, and visual feedback
- **Responsive Design** - Optimized for all devices with mobile-first approach

## 🚀 **Getting Started**

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Installation
1. Clone the repository:
```bash
git clone <your-repo-url>
cd mycv
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production
```bash
npm run build
```

## 🌐 **Deployment Options**

### **Netlify (Recommended)**
1. Push code to GitHub
2. Connect to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Deploy! 🚀

### **Vercel**
- Import GitHub repo
- Automatic Vite detection
- One-click deploy

### **GitHub Pages**
- Install gh-pages: `npm install --save-dev gh-pages`
- Add deploy scripts to package.json
- Run: `npm run deploy`

## 📝 **Customization**

### **Personal Information**
Update the following files with your information:
- `src/components/Hero.jsx` - Name, title, description, and greeting languages
- `src/components/About.jsx` - Education, experience, and achievements
- `src/components/Contact.jsx` - Contact details and social links
- `src/components/Projects.jsx` - Your projects and technologies
- `src/components/Technologies.jsx` - Skills organized by categories

### **Greeting Languages**
Customize the animated greetings in `src/components/Hero.jsx`:
```javascript
const greetings = [
  { text: "Hi", lang: "English" },
  { text: "Hola", lang: "Spanish" },
  // Add more languages as needed
]
```

### **Floating Elements**
Modify the floating emojis in the hero section:
```javascript
<div className="floating-elements">
  <div className="floating-element element-1">⚡</div>
  <div className="floating-element element-2">🚀</div>
  // Customize emojis and positions
</div>
```

### **Styling**
The design uses CSS variables and custom gradients. Main colors are defined in `src/index.css`:
```css
:root {
  --bg-primary: #0a0a0a;
  --bg-secondary: #1a1a2e;
  --accent-primary: #3b82f6;
  --accent-secondary: #8b5cf6;
}
```

## 🏗️ **Project Structure**
```
src/
├── components/
│   ├── Header.jsx          # Navigation with JohnDev branding
│   ├── Hero.jsx            # Animated greetings + floating elements
│   ├── About.jsx           # Hexagon profile + experience
│   ├── Technologies.jsx    # Category-based skills display
│   ├── Projects.jsx        # Project showcase with status badges
│   └── Contact.jsx         # Contact info + social links
├── App.jsx                 # Main app component
├── main.jsx                # React entry point
└── index.css               # Global styles and variables
```

## 🌟 **Unique Components**

### **Animated Hero Section**
- Multi-language greeting animation
- Floating visual elements
- Gradient text effects
- Interactive call-to-action button

### **Hexagon Profile**
- Unique hexagonal shape design
- Glowing animation effects
- Decorative floating dots
- Sticky positioning on desktop

### **Category-Based Skills**
- Technologies organized by function
- Icon-based skill representation
- Hover animations and effects
- Responsive grid layout

### **Enhanced Project Cards**
- Status badges (Live, In Development, Prototype)
- Category labels
- Enhanced hover effects
- Technology tag animations

## 📱 **Responsive Features**
- **Mobile-first** design approach
- **Hamburger menu** for mobile navigation
- **Adaptive layouts** for all screen sizes
- **Touch-friendly** interactions
- **Optimized animations** for mobile devices

## 🎯 **Browser Support**
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 **License**
This project is open source and available under the [MIT License](LICENSE).

## 🤝 **Contributing**
Feel free to submit issues and enhancement requests!

---

**Built with ❤️ by John Myl Alinsonorin**
