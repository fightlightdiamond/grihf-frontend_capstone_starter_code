export const API_URL = window.location.hostname === "localhost"
    ? "https://cuongpm12-8181.theiadockernext-1-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/"
    : "https://cuongpm12-8181.theiadockernext-1-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/";
console.log(
    "API_URL :",
    API_URL
);