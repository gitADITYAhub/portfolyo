import { motion } from 'framer-motion';
import { useState } from 'react';

type LoaderProps = {
  fadeOffLoader: boolean;
};

function Loader({ fadeOffLoader }: LoaderProps) {
  // const [isLoaded, setIsLoaded] = useState<boolean>(false);

  return (
    <div className={'preloader ' + (fadeOffLoader ? 'fadeOff' : '')}>
      <div className="loader"></div>
    </div>
  );
}
export default Loader;
