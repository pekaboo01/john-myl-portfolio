import React, { useState } from 'react'
import './Contact.css'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Using your actual Formspree endpoint
      const response = await fetch('https://formspree.io/f/xeolgqnk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `New Contact from ${formData.name}`,
          _captcha: false
        })
      })
      
      console.log('Formspree response:', response)
      console.log('Response status:', response.status)
      
      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', message: '' })
      } else {
        const errorData = await response.text()
        console.error('Formspree error response:', errorData)
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
      
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000)
    }
  }

  return (
    <section id="contact" className="section contact">
      <div className="particles"></div>
      
      <div className="container">
        <div className="contact-header fade-in">
          <h2 className="contact-title">contact me.</h2>
          <p className="contact-subtitle">
            Interested in collaborating or have a project in mind? I'm always open to discussing new opportunities and ideas.
          </p>
        </div>
        
        <div className="contact-content">
          <div className="contact-left">
            <div className="contact-info">
              <div className="contact-item fade-in stagger-1">
                <div className="contact-icon">
                  <img 
                    src="https://cdn-icons-png.flaticon.com/512/5968/5968534.png" 
                    alt="Gmail" 
                    className="contact-icon-img gmail-logo"
                  />
                </div>
                <div className="contact-details">
                  <h4>Email</h4>
                  <p>johnmylalinsonorin12@gmail.com</p>
                </div>
              </div>
              
              <div className="contact-item fade-in stagger-2">
                <div className="contact-icon">
                  <img 
                    src="https://cdn-icons-png.flaticon.com/512/455/455705.png" 
                    alt="Phone" 
                    className="contact-icon-img"
                  />
                </div>
                <div className="contact-details">
                  <h4>Phone</h4>
                  <p>+63 915 813 9515</p>
                </div>
              </div>
            </div>
            
            <div className="social-section fade-in stagger-3">
              <h3>Follow me on social media</h3>
              <div className="social-icons">
                <a 
                  href="https://www.facebook.com/lymnhoj.alinsonorin" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-icon facebook"
                >
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png" 
                    alt="Facebook" 
                    className="social-logo"
                  />
                </a>
                
                <a 
                  href="https://www.instagram.com/myl.alinsonorin/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-icon instagram"
                >
                  <img 
                    src="https://www.instagram.com/static/images/ico/favicon-200.png/ab6eff595bb1.png" 
                    alt="Instagram" 
                    className="social-logo"
                  />
                </a>
                
                <a 
                  href="https://discord.com/channels/@me" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-icon discord"
                >
                  <img 
                    src="https://www.freepnglogos.com/uploads/discord-logo-png/discord-logo-logodownload-download-logotipos-1.png" 
                    alt="Discord" 
                    className="social-logo"
                  />
                </a>
              </div>
            </div>
          </div>
          
          <div className="contact-right">
            <div className="contact-form-container fade-in stagger-4">
              <h3>Send me a message</h3>
              <p>Have a project in mind? Let's discuss how we can work together to bring your ideas to life.</p>
              
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <input 
                    type="text" 
                    name="name"
                    placeholder="Your Name" 
                    className="form-input"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <input 
                    type="email" 
                    name="email"
                    placeholder="Your Email" 
                    className="form-input"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <textarea 
                    name="message"
                    placeholder="Your Message" 
                    rows="5" 
                    className="form-textarea"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className="submit-btn btn btn-ripple"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
                
                {submitStatus === 'success' && (
                  <div className="submit-success">
                    <span className="success-icon">✅</span>
                    <p>Message sent successfully! I'll get back to you soon.</p>
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="submit-error">
                    <span className="error-icon">❌</span>
                    <p>Something went wrong. Please try again or email me directly.</p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
