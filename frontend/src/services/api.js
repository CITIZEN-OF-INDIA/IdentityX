import axios from "axios";

const API = axios.create({
  baseURL: "https://citizen-of-india-my-projects.hf.space/api",
});

export default API;