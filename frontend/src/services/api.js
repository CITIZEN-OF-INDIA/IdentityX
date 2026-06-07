import axios from "axios";

const API = axios.create({
  baseURL: "https://citizen-of-india-my-projects.hf.space/recognise",
});

export default API;