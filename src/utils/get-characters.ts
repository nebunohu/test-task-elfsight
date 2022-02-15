export const getCharacters = async (url: string, list: any): Promise<any> => {
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };
  const res = await fetch(url, {method: 'GET', headers});
  const data = await res.json();
  list = [...list, ...data.results]
  if(data.info.next) list = await getCharacters(data.info.next, list);
  return list;
  
};