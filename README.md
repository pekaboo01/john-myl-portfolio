# John Myl Alinsonorin - Portfolio

A modern, responsive portfolio website built with React and Vite, featuring a beautiful green and black theme with smooth animations.

## 🚀 Features

- **Modern Design**: Clean, professional green and black theme
- **Responsive Layout**: Works perfectly on all devices
- **Smooth Animations**: Scroll-triggered animations and hover effects
- **Interactive Elements**: Magnetic hover effects and particle system
- **Contact Form**: Functional contact form with Formspree integration
- **Loading Page**: Custom 404-style loading animation
- **Tech Snake Game**: Interactive game in the hero section

## 📧 Contact Form Setup

The contact form is powered by **Formspree** and will send messages directly to your email.

### Current Configuration
- **Formspree Endpoint**: `https://formspree.io/f/xeolgqnk`
- **Status**: ✅ **ACTIVE** - Messages will be sent to your email

### How It Works
1. **User fills out the form** with their name, email, and message
2. **Formspree receives the submission** and processes it
3. **You get an email** with the contact details
4. **User sees success message** confirming their message was sent

### To Change the Email Destination
1. Go to [Formspree.io](https://formspree.io)
2. Create a new form or modify the existing one
3. Update the endpoint URL in `src/components/Contact.jsx`
4. Replace `xpzgwqjq` with your new form ID

## 🛠️ Technologies Used

- **Frontend**: React 18, Vite
- **Styling**: CSS3 with CSS Variables and Animations
- **Contact Form**: Formspree
- **Deployment**: Netlify

## 📱 Sections

1. **Hero**: Introduction with rotating greetings and Tech Snake game
2. **About**: Education, achievements, and experience
3. **Technologies**: Skills and tech stack organized by category
4. **Projects**: Portfolio of completed and ongoing projects
5. **Contact**: Contact form and social media links

## 🎮 Interactive Features

- **Scroll Animations**: Elements fade in as you scroll
- **Magnetic Hover**: Interactive elements respond to mouse movement
- **Particle System**: Floating particles in the background
- **Ripple Effects**: Button interactions with ripple animations
- **Custom Loading**: 404-style loading page with typewriter effect

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd john-myl-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🌐 Deployment

The portfolio is configured for Netlify deployment with:
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Environment variables**: Configured for production

## 📝 Customization

### Colors
All colors are defined in CSS variables in `src/index.css`:
- Primary accent: `#00d4aa` (Green)
- Background: `#0a0a0a` (Dark)
- Text: `#ffffff` (White)

### Animations
- Scroll animations use classes like `fade-in`, `slide-in-left`
- Staggered animations with `stagger-1` through `stagger-5`
- Hover effects with `magnetic` class

## 📞 Support

If you have any questions or need help customizing the portfolio, feel free to reach out!

---

**Built with ❤️ by John Myl Alinsonorin**
