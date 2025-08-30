import React from 'react'
import './About.css'

const About = () => {
  return (
    <section id="about" className="section about">
      <div className="particles"></div>
      
      <div className="container">
        <div className="section-header fade-in">
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">
            Get to know me better - my journey, skills, and what drives me in the world of technology.
          </p>
        </div>
        
        <div className="about-content">
          <div className="about-left">
            <div className="profile-container scale-in stagger-1">
              <div className="profile-hexagon">
                <span className="profile-initial">J</span>
                <div className="profile-decoration">
                  <div className="decoration-dot dot-1"></div>
                  <div className="decoration-dot dot-2"></div>
                  <div className="decoration-dot dot-3"></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="about-right">
            <div className="about-section fade-in stagger-2">
              <h3 className="about-heading">
                <span className="heading-icon">🌟</span>
                About Me
              </h3>
              <p className="about-text">
                I'm a 4th-year Computer Engineering student at the University of San Carlos – Talamban Campus. 
                I'm passionate about exploring technology, solving problems, and continuously learning to improve 
                my skills. While I'm still growing in my journey, I look forward to applying what I've learned 
                to real-world projects and contributing to meaningful solutions through teamwork and innovation.
              </p>
              <blockquote className="about-quote">
                "The best code is no code at all. But if you must write code, make it beautiful." - Me
              </blockquote>
            </div>

            <div className="about-section fade-in stagger-3">
              <h3 className="about-heading">
                <span className="heading-icon">🎓</span>
                Education
              </h3>
              <div className="education-item">
                <h4 className="education-title">BS Computer Engineering</h4>
                <p className="education-school">University of San Carlos - Talamban Campus</p>
                <p className="education-year">2021 - 2025</p>
              </div>
            </div>

            <div className="about-section fade-in stagger-4">
              <h3 className="about-heading">
                <span className="heading-icon">🏆</span>
                Achievements & Certifications
              </h3>
              <div className="achievement-item">
                <p className="achievement-name">Dean's Lister (2021-2022)</p>
              </div>
              <div className="achievement-item">
                <p className="achievement-name">Robotics and Automation Conference</p>
              </div>
              <div className="achievement-item">
                <p className="achievement-name">Computer Engineering and Technology Conference</p>
              </div>
              <div className="achievement-item">
                <p className="achievement-name">Trainer-Facilitator, ASEAN Data Science Explorers 2024 Enablement Session - SAP Analytics Cloud and SAP Build Apps</p>
              </div>
            </div>

            <div className="about-section fade-in stagger-5">
              <h3 className="about-heading">
                <span className="heading-icon">💼</span>
                Experience
              </h3>
              <div className="experience-item">
                <div className="experience-header">
                  <h4 className="experience-title">Full-Stack Developer</h4>
                  <span className="experience-company">— VSDiamond Dental Clinic</span>
                </div>
                <p className="experience-period">2024 - Present</p>
                <p className="experience-description">
                  Developed a comprehensive web-based dental management system. Built both frontend and backend 
                  components, implementing features for patient management, appointment scheduling, and dental 
                  records. Gained hands-on experience with full-stack development and real-world project delivery.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
