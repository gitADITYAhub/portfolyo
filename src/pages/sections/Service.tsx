// // Images
// import servImg1 from '../../assets/images/services/service1.png';
// import servImg2 from '../../assets/images/services/service2.png';
// import servImg3 from '../../assets/images/services/service3.png';
// import servImg4 from '../../assets/images/services/service4.png';
// import servImg5 from '../../assets/images/services/service4.png';

// // Data
// import serviceData from '../../data/service.json';

// // -----------------------

// function Service() {
//   const images: string[] = [servImg1, servImg2, servImg3, servImg4, servImg5];

//   return (
//     <section id="service" className="section">
//       <div className="section-wrapper block">
//         <div className="content-1300">
//           <div className="row">
//             <div className="one-half width-55">
//               <div className="services-wrapper">
//                 {serviceData.servicesBoxes.map((serv, i) => (
//                   <div key={'serv-' + i} className={serv.className!}>
//                     <img src={images[i]} alt={serv.imageAltText} />
//                     <h4 className="service-title">{serv.servTitle}</h4>
//                     <div className="service-text">{serv.servDesc}</div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="one-half width-40 last">
//               <h2 className="entry-title section-title">{serviceData.title}</h2>
//               <p className="section-info">{serviceData.description}</p>
//               {serviceData.paragraphes.map((parg, i) => (
//                 <p key={'p-' + i}>{parg}</p>
//               ))}

//               <div className="button-group-wrapper">
//                 <a className="button">Download CV</a>
//                 <a href="#portfolio" className="button">
//                   Check My Portfolio
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default Service;

import React, { useEffect, useState } from 'react';
import servImg1 from '../../assets/images/services/service1.png';
import servImg2 from '../../assets/images/services/service2.png';
import servImg3 from '../../assets/images/services/service3.png';
import servImg4 from '../../assets/images/services/service4.png';
import servImg5 from '../../assets/images/services/service4.png';

// Assuming the structure of your service data from the API matches this interface
interface Service {
  name: string;
  desc: string;
  charge: string;
  image: { url: string; };
  enabled: boolean;
}

function ServiceComponent() {
  const [services, setServices] = useState<Service[]>([]);
  const images = [servImg1, servImg2, servImg3, servImg4, servImg5];

  useEffect(() => {
    async function fetchServices() {
      try {
        const response = await fetch('https://portfolio-backend-30mp.onrender.com/api/v1/get/user/65b3a22c01d900e96c4219ae');
        const { user } = await response.json();
        if (user && user.services) {
          // Filter enabled services and set them
          const enabledServices = user.services.filter((service: Service) => service.enabled);
          setServices(enabledServices);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    }

    fetchServices();
  }, []);

  return (
    <section id="service" className="section">
      <div className="section-wrapper block">
        <div className="content-1300">
          <div className="row">
            <div className="one-half width-55">
              <div className="services-wrapper">
                {services.map((service, index) => (
                  <div key={index} className="service-holder">
                    {/* Image selection logic can be adjusted as per your requirement */}
                    <img src={images[index % images.length]} alt={service.name} />
                    <h4 className="service-title">{service.name}</h4>
                    <div className="service-text">{service.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="one-half width-40 last">
              <h2 className="entry-title section-title">Services</h2>
              <p className="section-info">Here are the services I offer.</p>
              {/* Static paragraphs can be replaced or dynamically generated as needed */}
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra tristique placerat in massa consectetur quisque.</p>
              <p>Additional description about the services.</p>

              <div className="button-group-wrapper">
                {/* Placeholder actions; update href with actual links as necessary */}
                <a className="button" href="/download-cv">Download CV</a>
                <a className="button" href="#portfolio">Check My Portfolio</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServiceComponent;
