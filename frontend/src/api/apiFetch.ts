type relationshipResponse = {
    chat: string;
    chat_uuid: string;
    user: string;
    uuid: string;
}


type messageResponse = {
    id:number;
    message_sender_uuid:string;
    message_receiver_uuid:string;
    text_message:string;

}

type relationshipArrayObject = relationshipResponse[]
type messageArrayObject = messageResponse[]


interface MethodsType{
    fetchRelationships(access_token:string):Promise<relationshipArrayObject>,
    fetchMessages(access_token:string):Promise<messageArrayObject>
}

const baseUrl = "http://127.0.0.1:8000/"
const relationshipsUrl = `${baseUrl}api/messages/chats/`;
const messagesUrl = `${baseUrl}api/messages/list/`;




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



export const fetchMessages: MethodsType['fetchMessages'] = async(access_token) => {
  try 
    {
        const response = await fetch(messagesUrl, {
            headers: { 'Authorization': `Bearer ${access_token}` },
        });

        if(!response.ok)
        {
            localStorage.clear()
        }

        const data = await response.json();
        return data;

    }catch (error) 
    {
        return error
    }
}

