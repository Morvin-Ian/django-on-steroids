import { baseUrl } from "./auth";

type messageResponse = {
    id:number;
    message_sender_uuid:string;
    message_receiver_uuid:string;
    text_message:string;

}

type messageArrayObject = messageResponse[]


interface MethodsType{
    fetchMessages(access_token:string):Promise<messageArrayObject|string>
}

const messagesUrl = `${baseUrl}api/messages/list/`;



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

