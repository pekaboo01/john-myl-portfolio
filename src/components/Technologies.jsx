import React from 'react'
import './Technologies.css'

const Technologies = () => {
  const technologies = [
    {
      name: 'HTML5',
      category: 'Frontend',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg'
    },
    {
      name: 'CSS3',
      category: 'Frontend',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg'
    },
    {
      name: 'JavaScript',
      category: 'Frontend',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg'
    },
    {
      name: 'TypeScript',
      category: 'Frontend',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg'
    },
    {
      name: 'React',
      category: 'Frontend',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg'
    },
    {
      name: 'Next.js',
      category: 'Frontend',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg'
    },
    {
      name: 'Tailwind CSS',
      category: 'Frontend',
      logo: 'https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg'
    },
    {
      name: 'Node.js',
      category: 'Backend',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg'
    },
    {
      name: 'Express.js',
      category: 'Backend',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg'
    },
    {
      name: 'FastAPI',
      category: 'Backend',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg'
    },
    {
      name: 'Kotlin',
      category: 'Mobile Development',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg'
    },
    {
      name: 'Firebase',
      category: 'Database & Storage',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg'
    },
    {
      name: 'MySQL',
      category: 'Database & Storage',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg'
    },
    {
      name: 'PostgreSQL',
      category: 'Database & Storage',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg'
    },
    {
      name: 'Java',
      category: 'Programming Languages',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg'
    },
    {
      name: 'C',
      category: 'Programming Languages',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg'
    },
    {
      name: 'Figma',
      category: 'UI/UX Design',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg'
    }
  ]

  const categories = [
    'Frontend',
    'Backend', 
    'Mobile Development',
    'Database & Storage',
    'Programming Languages',
    'UI/UX Design'
  ]

  return (
    <section id="technologies" className="section technologies">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Skills & Technologies</h2>
          <p className="section-subtitle">
            Here are the technologies and tools I've been working with. I'm always learning 
            new ones and improving my skills with the ones I know.
          </p>
        </div>
        
        <div className="technologies-container">
          {categories.map(category => {
            const categoryTechs = technologies.filter(tech => tech.category === category)
            if (categoryTechs.length === 0) return null
            
            return (
              <div key={category} className="category-group">
                <h3 className="category-title">{category}</h3>
                <div className="tech-grid">
                  {categoryTechs.map((tech, index) => (
                    <div key={index} className="tech-card">
                      <div className="tech-logo">
                        <img 
                          src={tech.logo} 
                          alt={`${tech.name} logo`}
                          className="tech-logo-img"
                        />
                      </div>
                      <span className="tech-name">{tech.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Technologies
