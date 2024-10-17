import axios from "axios";
const FACTS_URL = "https://api.adviceslip.com/advice";

export const fetchRandomFact = async () => {
  try {
    const response = await axios.get(FACTS_URL);
    return response.data.slip.advice;
  } catch (err) {
    console.error("Error is", err);
  }
};
