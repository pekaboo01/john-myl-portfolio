import React from 'react'
import './Projects.css'

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: 'HIYV',
      description: 'A family task planner built on mobile applications using Kotlin. Helps families organize and manage daily tasks, schedules, and responsibilities through an intuitive mobile interface.',
      technologies: ['Kotlin', 'Android Studio', 'Firebase', 'XML', 'Material Design'],
      image: '/images/hiyv-project.png',
      status: 'Completed',
      category: 'Mobile App'
    },
    {
      id: 2,
      title: 'Smart Bin with Alert System',
      description: 'A prototype for sustainable waste management in Sindulan, Tinaan. Features LCD display, ultrasonic sensor, Raspberry Pi, solar power, and GSM module. Sends notifications/updates to LGU when bins are full or status changes.',
      technologies: ['Raspberry Pi', 'Python', 'Arduino', 'Ultrasonic Sensor', 'GSM Module', 'Solar Power', 'LCD Display'],
      image: '/images/smart-bin-project.png',
      status: 'Prototype',
      category: 'IoT & Hardware'
    },
    {
      id: 3,
      title: 'ASCI',
      description: 'A school canteen ordering system designed and built for students. Allows them to order from the local canteen through their smartphone despite hectic schedules, with features for meal preparation timing and pickup scheduling.',
      technologies: ['Android Studio', 'Firebase', 'Java', 'XML', 'Google Maps API', 'Push Notifications'],
      image: '/images/asci-project.png',
      status: 'Completed',
      category: 'Mobile App'
    },
    {
      id: 4,
      title: 'VSDiamond Dental Clinic',
      description: 'A comprehensive web-based dental management system for managing appointments, patient records, user account system, inventory, and clinic analytical data. Streamlines dental practice operations.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Firebase', 'Express.js', 'MongoDB'],
      image: '/images/vsdiamond-project.png',
      status: 'In Development',
      category: 'Web System'
    }
  ]

  return (
    <section id="projects" className="section projects">
      <div className="particles"></div>
      
      <div className="container">
        <div className="section-header fade-in">
          <h2 className="section-title">My Projects</h2>
          <p className="section-subtitle">
            Here are some projects I've worked on. Each one has taught me something new and 
            helped me grow as a developer.
          </p>
        </div>
        
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div 
              key={project.id} 
              className="project-card fade-in"
              style={{ transitionDelay: `${index * 0.2}s` }}
            >
              <div className="project-header">
                <div className="project-image">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    onError={(e) => {
                      console.error(`Failed to load image: ${project.image}`);
                      e.target.style.display = 'none';
                    }}
                  />
                  <div className="project-overlay">
                    <span className="project-status">{project.status}</span>
                  </div>
                  <div className="project-category">{project.category}</div>
                </div>
              </div>
              
              <div className="project-content">
                <h3 className="project-title">
                  {project.title}
                  <span className="project-arrow">→</span>
                </h3>
                <p className="project-description">{project.description}</p>
                <div className="project-technologies">
                  {project.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex} 
                      className="project-tech-tag fade-in"
                      style={{ transitionDelay: `${(index * 0.2) + (techIndex * 0.1)}s` }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
