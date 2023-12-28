import { useQuery } from "@tanstack/react-query";
import { baseUrl } from "../utils/apiActions/dashboardApi";
const user = JSON.parse(localStorage.getItem('user'));
const fetchData = async(url) => {
    const response = await fetch(`${baseUrl}/${url}`, {
      method: "GET",
      headers: new Headers({
        Authorization: `Bearer ${user.access_token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
    });
    const data = await response.json();
    return data; 
};
export const useFetchData = (queryKey, url, onMount) => {
  return useQuery({
    queryKey,
    queryFn: () => fetchData(url),
    enabled: onMount,
  });
};
