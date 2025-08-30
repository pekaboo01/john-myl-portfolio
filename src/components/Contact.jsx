import React from 'react'
import './Contact.css'

const Contact = () => {
  return (
    <section id="contact" className="section contact">
      <div className="container">
        <div className="contact-header">
          <h2 className="contact-title">contact me.</h2>
          <p className="contact-subtitle">
            Interested in collaborating or have a project in mind? I'm always open to discussing new opportunities and ideas.
          </p>
        </div>
        
        <div className="contact-content">
          <div className="contact-left">
            <div className="contact-info">
              <div className="contact-item">
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
              
              <div className="contact-item">
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
          </div>
          
          <div className="contact-right">
            <button className="email-btn">
              <span className="email-icon">📧</span>
              <span>Send me an email</span>
            </button>
            
            <div className="social-section">
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
        </div>
      </div>
    </section>
  )
}

export default Contact
