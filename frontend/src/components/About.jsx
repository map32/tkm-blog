import React from 'react';
import aboutData from '../../ktmAbout'

// --- CSS Styles ---
// All styles are defined here, removing the dependency on Tailwind CSS.
const styles = `
  /* General Body Styles */
  .about-body {
    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  }

  @media (min-width: 640px) {
    .about-body {
      padding: 1.5rem;
    }
  }
  @media (min-width: 768px) {
    .about-body {
      padding: 2rem;
    }
  }


  /* Card Styling */
  .about-card {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    overflow: hidden;
    background-color: #101116;
    text-color: #ffffff;
    border:1px solid #232329;
    border-radius:.8rem;
    padding:1rem;
  }

  /* Profile Header */
  .profile-header {
    padding: 1.5rem;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  @media (min-width: 768px) {
    .profile-header {
      padding: 2.5rem;
      flex-direction: row;
    }
  }

  .profile-picture-wrapper {
    width: 10rem;
    height: 10rem;
    flex-shrink: 0;
    margin-bottom: 1.5rem;
  }
  @media (min-width: 768px) {
    .profile-picture-wrapper {
      width: 12rem;
      height: 12rem;
      margin-bottom: 0;
      margin-right: 2.5rem;
    }
  }

  .profile-picture {
    width: 100%;
    height: 100%;
    border-radius: 9999px;
    object-fit: cover;
    border: 4px solid #a7f3d0;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  .profile-info {
    text-align: center;
  }
  @media (min-width: 768px) {
    .profile-info {
      text-align: left;
    }
  }

  .profile-info h1 {
    font-size: 2.25rem;
    line-height: 2.5rem;
    font-weight: 700;
    color: #ffffff;
  }
  @media (min-width: 768px) {
    .profile-info h1 {
      font-size: 3rem;
      line-height: 1;
    }
  }

  .profile-info p {
    font-size: 1.25rem;
    line-height: 1.75rem;
    color: #0d9488;
    margin-top: 0.5rem;
  }
   @media (min-width: 768px) {
    .profile-info p {
      font-size: 1.5rem;
      line-height: 2rem;
    }
  }
  
  /* Content Sections */
  .content-section {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    padding-bottom: 2rem;
  }
  @media (min-width: 768px) {
    .content-section {
      padding-left: 2.5rem;
      padding-right: 2.5rem;
    }
  }

  .content-section h2 {
    font-size: 1.5rem;
    line-height: 2rem;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #b2f5ea;
  }

  .bio-text p {
    margin-bottom: 1rem;
    font-size: 1.125rem;
    line-height: 1.75rem;
    color: #caf1e1ff;
  }
  .bio-text p:last-child {
      margin-bottom: 0;
  }

  /* Skills */
  .skills-container {
    display: flex;
    flex-wrap: wrap;
  }

  .skill-badge {
    display: inline-block;
    background-color: #ccfbf1;
    color: #115e59;
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 600;
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
  }

  /* Socials */
  .socials-section {
    padding: 1.5rem;
  }
   @media (min-width: 768px) {
    .socials-section {
      padding: 1.5rem 2.5rem;
    }
  }
  
  .socials-section h2 {
    text-align: center;
    font-size: 1.5rem;
    line-height: 2rem;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 1rem;
  }

  .social-links {
    display: flex;
    justify-content: center;
  }
  
  .social-links a {
    color: #4b5563;
    margin: 0 0.75rem;
    transition: color 0.3s ease-in-out;
  }

  .social-links a:hover {
    color: #0f766e;
  }
  
  /* Screen reader only */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
`;

// --- SVG Icons ---
const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);
const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle>
  </svg>
);
const MailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline>
    </svg>
);

// --- Reusable Components ---
const SkillBadge = ({ skill }) => (
  <span className="skill-badge">{skill}</span>
);

const StyleSheet = () => <style>{styles}</style>;
const studentDeveloper = aboutData;


// --- AboutPage Component ---
const AboutPage = () => {

  return (
    <div className="card">
        {studentDeveloper.map((studentDeveloper) => (<div className="about-card">
          <div className="profile-header">
            <div className="profile-picture-wrapper">
              <img
                src={studentDeveloper.pic}
                alt={`Profile picture of ${studentDeveloper.name}`}
                className="profile-picture"
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x400/cccccc/ffffff?text=Image+Error'; }}
              />
            </div>
            <div className="profile-info">
              <h1>{studentDeveloper.name}</h1>
              <p>{studentDeveloper.title}</p>
            </div>
          </div>

          <div className="content-section">
            <h2>My Project Journey</h2>
            <div className="bio-text">
              {studentDeveloper.bio.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="content-section">
            <h2>Interests</h2>
            <div className="skills-container">
              {studentDeveloper.interests.map((skill, index) => (
                <SkillBadge key={index} skill={skill} />
              ))}
            </div>
          </div>

          {/*<div className="socials-section">
            <h2>Contact & Portfolio</h2>
            <div className="social-links">
              <a href={studentDeveloper.socials.github} target="_blank" rel="noopener noreferrer">
                <GithubIcon />
                <span className="sr-only">GitHub</span>
              </a>
              <a href={studentDeveloper.socials.linkedin} target="_blank" rel="noopener noreferrer">
                <LinkedinIcon />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href={studentDeveloper.socials.email}>
                <MailIcon />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>*/}
        </div>))}
    </div>
  );
};

// --- App Component ---
export default function App() {
  return (
    <>
      <StyleSheet />
      <AboutPage />
    </>
  );
}
