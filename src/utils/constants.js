// export const BASE_URL = "/api";  ** Used in porduction


// Used in localhost
// export const BASE_URL = "http://localhost:7777";


                //  ** OR **

export const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:7777"
    : "https://developer-connect-backend.onrender.com";
