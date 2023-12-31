import { useEffect } from "react";

const useChangeBackground = (img) => {
  useEffect(() => {
    document.documentElement.style.backgroundImage = `url(${img})`;
    document.documentElement.style.backgroundSize = "cover";
    document.documentElement.style.backgroundPosition = "center";
    document.documentElement.style.backgroundRepeat = "no-repeat";
    document.documentElement.style.backgroundAttachment = "fixed";

    return () => {
      document.documentElement.style.backgroundImage = null;
      document.documentElement.style.backgroundSize = null;
      document.documentElement.style.backgroundPosition = null;
      document.documentElement.style.backgroundRepeat = null;
      document.documentElement.style.backgroundAttachment = null;
    };
  }, [img]);
};

export default useChangeBackground;
