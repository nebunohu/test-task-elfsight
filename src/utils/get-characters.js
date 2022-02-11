import { authorizationToken } from "./authorization-header";

export const getCharacters = async (url) => {
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': authorizationToken()
  };
  const res = await fetch(url, {method: 'GET', headers});
  return res;
  
};