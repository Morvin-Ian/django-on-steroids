import { baseUrl } from "./auth";

type messageResponse = {
    id: number;
    message_sender_uuid: string;
    message_receiver_uuid: string;
    text_message: string;

}

type messageArrayObject = messageResponse[]


interface MethodsType {
    fetchMessages(access_token: string): Promise<messageArrayObject | string>
    updateMessageRead(access_token: string, dialog:string):Promise<string>
}

const messagesUrl = `${baseUrl}/api/messages/list/`;
const messagesReadUrl = `${baseUrl}/api/messages/read/`;



export const fetchMessages: MethodsType['fetchMessages'] = async (access_token) => {
    try {
        const response = await fetch(messagesUrl, {
            headers: { 'Authorization': `Bearer ${access_token}` },
        });

        if (!response.ok) {
            localStorage.clear()
        }

        const data = await response.json();
        return data;

    } catch (error) {
        return error
    }
}

export const updateMessageRead: MethodsType['updateMessageRead'] = async (access_token, dialog) => {
    try {
        const response = await fetch(messagesReadUrl, {
            method:'PUT',
            headers: { 
                'Authorization': `Bearer ${access_token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"dialog":dialog})
        });

        const data = await response.json();
        return data;

    } catch (error) {
        return error
    }
}

