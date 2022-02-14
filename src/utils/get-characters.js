import { authorizationToken } from "./authorization-header";
import { getCharactersSuccess } from "../services/actions/characters-actions";

export const getCharacters = async (url, list) => {
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': authorizationToken()
  };
  const res = await fetch(url, {method: 'GET', headers});
  const data = await res.json();
  list = [...list, ...data.results]
  if(data.info.next) list = await getCharacters(data.info.next, list);
  return list;
  
};