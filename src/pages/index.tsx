import { useEffect, useState } from 'react';

// Sections
import HomeSection from './sections/Home';
import Service from './sections/Service';
import Resume from './sections/Resume';
import Contact from './sections/Contact';
import Portfolio from './sections/portfolio';
import Skills from './sections/Skills';

// Components
import Loader from '../components/Loader';

// -------------------

function Home() {
  const [loading, setLoading] = useState<boolean>(true);
  const [fadeOffLoader, setFadeOffLoader] = useState<boolean>(false);

  useEffect(() => {
    const loaderTimer = setTimeout(handleLoad, 750);
    return () => {
      clearTimeout(loaderTimer);
    };
  }, []);

  const handleLoad = () => {
    setFadeOffLoader(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  return (
    <>
      {loading ? <Loader fadeOffLoader={fadeOffLoader} /> : <></>}

      <div>
        <div className="content-right">
          <div className="content-right-wrapper">
            <HomeSection />
            <Service />
            <Portfolio />
            <Resume />
            <Skills />
            <Contact />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
