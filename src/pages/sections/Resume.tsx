
import React, { useEffect, useState } from 'react';
import signature from '../../assets/images/signature2.png';
function Resume() {
  const [resumeData, setResumeData] = useState(null);

  useEffect(() => {
    // Fetch data from API on component mount
    const fetchData = async () => {
      const response = await fetch('https://portfolio-backend-30mp.onrender.com/api/v1/get/user/65b3a22c01d900e96c4219ae');
      const data = await response.json();
      if (data.success) {
        setResumeData(data.user);
      }
    };

    fetchData();
  }, []);

  if (!resumeData) {
    return <div>Loading...</div>;
  }
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long' }; // You can use 'short' for abbreviated month
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  };
  return (
    <section id="resume" className="section">
      <div className="section-wrapper block">
        <div className="content-1300">
          <div className="row">
            {/* Dynamic Experience Section */}
            <div className="one-half width-55">
              <h2 className="entry-title section-title">Experience</h2>
              <ul className="timeline-holder">
                {resumeData.timeline.map((exp, i) => (
                  <li key={'exp-' + i} className="timeline-event">
                    <span className="timeline-circle"></span>
                    <div
                      className="timeline-event-content"
                      dangerouslySetInnerHTML={{
                        __html: exp.bulletPoints.map(bp => `<p>${bp}</p>`).join(''), 
                      }}
                    />
                      <div className="timeline-event-date">
                        {exp.company_name} ({formatDate(exp.startDate)} - {formatDate(exp.endDate)})
                      </div>
                    
                  </li>
                ))}
              </ul>
            </div>

            {/* Static Cover Letter Section - Assuming it remains unchanged */}
            <div className="one-half width-40 last">
              <h2 className="entry-title section-title">Cover Letter</h2>
              <p className="section-info">
                {resumeData.coverLetter?.description || 'Your dynamic cover letter description here.'}
              </p>
              {resumeData.coverLetter?.paragraphes?.map((parg, i) => (
                <p key={'parg-' + i}>{parg}</p>
              ))}

              {/* Assuming signature is static, otherwise, you can also make this dynamic */}
              <img className="my-signature" src={signature} alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Resume;
