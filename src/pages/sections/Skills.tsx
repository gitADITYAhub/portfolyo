// import { useRef, useEffect, useState } from 'react';

// // Plugins
// import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
// import 'react-circular-progressbar/dist/styles.css';

// // Data
// import skillsData from '../../data/skills.json';

// // ------------------

// function Skills() {
//   const circleProgressBarRef = useRef<HTMLDivElement>(null);
//   const [circleProgress, setCircleProgress] = useState<number[]>(
//     new Array(skillsData.circleProgress.length).fill(0)
//   );
//   const normalProgressBarRef = useRef<HTMLDivElement>(null);
//   const [normalProgress, setNormalProgress] = useState<number[]>(
//     new Array(skillsData.horizontalProgress.length).fill(0)
//   );

//   useEffect(() => {
//     const progressBarYPosition =
//       circleProgressBarRef.current!.getBoundingClientRect().top +
//       window.scrollY;
//     const handleScroll = () => {
//       if (window.scrollY >= progressBarYPosition) {
//         setCircleProgress(
//           skillsData.circleProgress.map((progress) => progress.percentage)
//         );
//       }
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, [circleProgress]);

//   useEffect(() => {
//     const progressBarYPosition =
//       normalProgressBarRef.current!.getBoundingClientRect().top +
//       window.scrollY;
//     const handleScroll = () => {
//       if (window.scrollY >= progressBarYPosition) {
//         setNormalProgress(
//           skillsData.horizontalProgress.map((progress) => progress.percentage)
//         );
//       }
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, [normalProgress]);

//   return (
//     <section id="skills" className="section">
//       <div className="section-wrapper block">
//         <div className="content-1300">
//           <div className="row m-bottom-60">
//             <h2 className="entry-title section-title">{skillsData.title}</h2>

//             <div className="skill-circle-holder">
//               {skillsData.circleProgress.map((prog, i) => (
//                 <div key={'circle-prog-' + i} className="skill-circle">
//                   <div ref={circleProgressBarRef}>
//                     <CircularProgressbar
//                       value={circleProgress[i]}
//                       text={`${prog.percentage}%`}
//                       counterClockwise
//                       strokeWidth={15}
//                       styles={buildStyles({
//                         textColor: '#F37B83',
//                         textSize: 18,
//                         pathColor: '#F37B83',
//                         trailColor: '#554247',
//                         strokeLinecap: 'butt',
//                         pathTransitionDuration: 2,
//                       })}
//                     />
//                   </div>
//                   <p className="skill-circle-text">{prog.title}</p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="row" ref={normalProgressBarRef}>
//             <div className="one-half">
//               <div className="skills-holder">
//                 {skillsData.horizontalProgress
//                   .slice(0, Math.ceil(skillsData.horizontalProgress.length / 2))
//                   .map((skill, i) => (
//                     <div key={'skill-' + i} className="skill-holder">
//                       <div className="skill-text">
//                         <div className="skill">
//                           <div
//                             className="skill-fill"
//                             style={{ width: `${normalProgress[i]}%` }}></div>
//                         </div>
//                         <span>{skill.title}</span>
//                       </div>
//                       <div className="skill-percent">{skill.percentage}%</div>
//                     </div>
//                   ))}
//               </div>
//             </div>

//             <div className="one-half last">
//               <div className="skills-holder sec-skills-holder">
//                 {skillsData.horizontalProgress
//                   .slice(Math.ceil(skillsData.horizontalProgress.length / 2))
//                   .map((skill, i) => (
//                     <div key={'skill2-' + i} className="skill-holder">
//                       <div className="skill-text">
//                         <div className="skill">
//                           <div
//                             className="skill-fill"
//                             style={{
//                               width: `${
//                                 normalProgress[
//                                   i +
//                                     Math.ceil(
//                                       skillsData.horizontalProgress.length / 2
//                                     )
//                                 ]
//                               }%`,
//                             }}></div>
//                         </div>
//                         <span>{skill.title}</span>
//                       </div>
//                       <div className="skill-percent">{skill.percentage}%</div>
//                     </div>
//                   ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default Skills;
import React, { useRef, useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function Skills() {
  const circleProgressBarRef = useRef(null);
  const [skills, setSkills] = useState([]);
  const [circleProgress, setCircleProgress] = useState([]);
  const normalProgressBarRef = useRef(null);
  const [normalProgress, setNormalProgress] = useState([]);

  useEffect(() => {
    async function fetchSkills() {
      try {
        const response = await fetch('https://portfolio-backend-30mp.onrender.com/api/v1/get/user/65b3a22c01d900e96c4219ae');
        const jsonData = await response.json();
        if (jsonData.success) {
          setSkills(jsonData.user.skills.filter(skill => skill.enabled));
        } else {
          // Handle error
          console.error('API call was unsuccessful');
        }
      } catch (error) {
        console.error('Failed to fetch skills', error);
      }
    }

    fetchSkills();
  }, []);

  useEffect(() => {
    if (skills.length > 0 && circleProgressBarRef.current) {
      setCircleProgress(skills.map(skill => skill.percentage));
    }
  }, [skills]);

  // Assuming half of the skills are normal progress bar skills
  useEffect(() => {
    if (skills.length > 0 && normalProgressBarRef.current) {
      setNormalProgress(skills.slice(0, Math.floor(skills.length / 2)).map(skill => skill.percentage));
    }
  }, [skills]);

  return (
    <section id="skills" className="section">
      <div className="section-wrapper block">
        <div className="content-1300">
          <div className="row m-bottom-60">
            <h2 className="entry-title section-title">Skills</h2>

            <div className="skill-circle-holder" ref={circleProgressBarRef}>
              {circleProgress.map((percentage, i) => (
                <div key={'circle-prog-' + i} className="skill-circle">
                  <CircularProgressbar
                    value={percentage}
                    text={`${percentage}%`}
                    styles={buildStyles({
                      textColor: '#F37B83',
                      textSize: '18px',
                      pathColor: '#F37B83',
                      trailColor: '#eee',
                      pathTransitionDuration: 2.5,
                    })}
                  />
                  <p className="skill-circle-text">{skills[i].name}</p>
      
                </div>
              ))}
            </div>
          </div>

          <div className="row" ref={normalProgressBarRef}>
            {normalProgress.map((percentage, i) => (
              <div key={'normal-prog-' + i} className="skill-holder">
                <span>{skills[i].name}</span>
                <div className="skill">
                  <div
                    className="skill-fill"
                    style={{ width: `${percentage}%` }}>
                    <span className="skill-text">{`${percentage}%`}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;
