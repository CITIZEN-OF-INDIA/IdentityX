import axios from "axios";

const API = axios.create({
  baseURL: "https://citizen-of-india-my-projects.hf.space/docs",
});

export default API;