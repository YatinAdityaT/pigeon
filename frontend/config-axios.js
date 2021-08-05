// Config global for csrf tokens and session ids
import axios from "axios";

axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.withCredentials = true;
axios.defaults.headers.common["Content-Type"] = "application/json";
export default axios;
