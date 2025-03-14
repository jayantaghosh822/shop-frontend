import { useEffect } from "react";

const useScript = (scriptSources, onLoadCallback) => {
  useEffect(() => {
    const scripts = [];

    const loadScripts = async () => {
      for (const src of scriptSources) {
        if (!document.querySelector(`script[src="${src}"]`)) {
          const script = document.createElement("script");
          script.src = src;
          script.async = true;
          script.onload = () => {
            console.log(`${src} loaded.`);
            if (window.jQuery) {
              window.$ = window.jQuery; // Ensure jQuery is globally available
            }
            if (onLoadCallback) onLoadCallback();
          };
          script.onerror = () => console.error(`Error loading ${src}`);
          document.body.appendChild(script);
          scripts.push(script);
        }
      }
      
    };

    loadScripts();

    return () => {
      scripts.forEach((script) => {
        script.remove();
        console.log(`${script.src} removed.`);
      });
    };
  }, [scriptSources]);
};

export default useScript;
