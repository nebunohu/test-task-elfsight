export const getToken = async (url, username, password) => {
  const headers = new Headers({
    'content-type': 'application/json'
  });
  const body = JSON.stringify({username, password});
  
  const res = await fetch( url, {method: 'POST', headers, body} );
  return res;
  
}