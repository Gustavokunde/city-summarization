declare global {
  interface Window {
    dataLayer: Array<unknown>;
  }
}

const loadGoogleAnalytics = () => {
  const existingScript = document.getElementById("googleAnalytics");
  if (!existingScript) {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${
      import.meta.env.VITE_APP_TRACKING_ANALYTICS_ID
    }`;
    script.id = "googleAnalytics";
    document.body.appendChild(script);
  }

  window.dataLayer = window.dataLayer || [];
  function gtag(arg1: string, arg2: string | Date) {
    window.dataLayer.push(arg1);
    window.dataLayer.push(arg2);
  }
  gtag("js", new Date());
  gtag("config", import.meta.env.VITE_APP_TRACKING_ANALYTICS_ID);
};
export default loadGoogleAnalytics;
