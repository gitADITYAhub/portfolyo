// // Data
// import homeData from '../../data/home.json';

// // ---------------

// function Home() {
//   return (
//     <section id="home" className="section full-width-section">
//       <div className="section-wrapper block">
//         <div className="home-left-part">
//           <p className="site-des">{homeData.welcomeText}</p>
//           <h1 className="entry-title">{homeData.name}</h1>
//           <p className="site-info">{homeData.text}</p>

//           <div className="social-links">
//             {homeData.socialLinks.map((link, i) => (
//               <a key={'social-link-' + i} href={link.to}>
//                 {link.text}
//               </a>
//             ))}
//           </div>
//         </div>
//         <div className="home-right-part"></div>
//       </div>
//     </section>
//   );
// }
// export default Home;

import React, { useState, useEffect } from 'react';

interface SocialLink {
  to: string;
  text: string;
}

interface HomeData {
  welcomeText: string;
  name: string;
  text: string;
  socialLinks: SocialLink[];
}

function Home() {
  const [homeData, setHomeData] = useState<HomeData>({
    welcomeText: '',
    name: '',
    text: '',
    socialLinks: [],
  });

  useEffect(() => {
    async function fetchData() {
      const userId = '65b3a22c01d900e96c4219ae';
      const url = `https://portfolio-backend-30mp.onrender.com/api/v1/get/user/${userId}`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data.success && data.user) {
          const transformedData: HomeData = {
            welcomeText: data.user.about.subTitle,
            name: data.user.about.name,
            text: data.user.about.description,
            socialLinks: data.user.social_handles.map((handle): SocialLink => ({
              to: handle.url,
              text: handle.platform,
            })),
          };
          setHomeData(transformedData);
        }
      } catch (error) {
        console.error('Failed to fetch: ', error);
      }
    }
    fetchData();
  }, []);

  return (
    <section id="home" className="section full-width-section">
      <div className="section-wrapper block">
        <div className="home-left-part">
          <p className="site-des">{homeData.welcomeText}</p>
          <h1 className="entry-title">{homeData.name}</h1>
          <p className="site-info">{homeData.text}</p>

          <div className="social-links">
            {homeData.socialLinks.map((link, i) => (
              <a key={`social-link-${i}`} href={link.to}>
                {link.text}
              </a>
            ))}
          </div>
        </div>
        <div className="home-right-part"></div>
      </div>
    </section>
  );
}

export default Home;

