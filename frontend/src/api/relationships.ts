type relationshipResponse = {
    chat: string;
    chat_uuid: string;
    user: string;
    uuid: string;
}


type relationshipArrayObject = relationshipResponse[]


interface MethodsType{
    fetchRelationships(access_token:string):Promise<relationshipArrayObject>,
}

const baseUrl = "http://127.0.0.1:8000/"
const relationshipsUrl = `${baseUrl}api/messages/chats/`;




export const fetchRelationships: MethodsType['fetchRelationships'] = async (access_token) => {
    try {
          // Send a fetch request with the bearer token
          const response =  await fetch(relationshipsUrl, {
              headers: { 'Authorization': `Bearer ${access_token}` },
          });
  
          const data = await response.json();    
          localStorage.setItem('relationships', JSON.stringify(data));
          return data
  
      }catch (error) 
      {
          return error
      }
  }