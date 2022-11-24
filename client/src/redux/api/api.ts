import axios from "axios";
export enum BASE_URL {
  baseURL = "http://localhost:5555/user",
}

export const apiData = async (url: string, data: any, method: string) => {
  if (method === "POST") {
    const postData = await axios.post(url, data);
    return postData.data;
  } else if (method === "PUT") {
    const putData = await axios.put(url, data);
    return putData.data;
  } else if (method === "DELETE") {
    const deletedData = await axios.delete(url);
    return deletedData.data;
  } else if (method === "GET") {
    const getData = await axios.get(url);
    return getData.data;
  }
};
