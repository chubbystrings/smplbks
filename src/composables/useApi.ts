import axiosInstance from "@/services/axios";
import { currentUser } from "@/utils/Auth";
import { AxiosRequestConfig } from "axios";

const useAPI = () => {
  let config: AxiosRequestConfig<any>;

  const setConfig = () => {
    const credentials = window.btoa(
      currentUser()?.username + ":" + currentUser()?.password
    );

    config = {
      headers: {
        Authorization: "Basic " + credentials,
      },
    };
  };

  const read = async (url: string) => {
    setConfig();

    try {
      const data = await axiosInstance.get(url, config);
      return data;
    } catch (error: any) {
      throw new Error(error);
    }
  };

  const create = async (url: string, payload: Record<string, any>) => {
    if (url.includes("login")) {
      console.log('reached here')
      try {
        const res = await axiosInstance.post(url, payload);
        console.log(res);
      } catch (error: any) {
        throw new Error(error)
      }
    } else {
      setConfig();
      await axiosInstance.post(url, payload, config);
    }
  };

  const patch = async (
    url: string,
    id: string,
    payload: Record<string, any>
  ) => {
    setConfig();
    const newUrl = `${url}/${id}`;
    const res = await axiosInstance.put(newUrl, payload, config);
    return res;
  };

  const remove = async (url: string, id: string) => {
    setConfig();
    const newUrl = "";
    await axiosInstance.delete(url, config);
  };

  return { create, read, patch, remove };
};

export default useAPI;
