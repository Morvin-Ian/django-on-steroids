import { baseUrl } from "./auth";

type relationshipResponse = {
    chat: string;
    chat_uuid: string;
    user: string;
    uuid: string;
}


type relationshipArrayObject = relationshipResponse[]


interface MethodsType {
    fetchRelationships(access_token: string): Promise<relationshipArrayObject | string>,
}

const relationshipsUrl = `${baseUrl}/api/messages/chats/`;


export const fetchRelationships: MethodsType['fetchRelationships'] = async (access_token) => {
    try {
        const response = await fetch(relationshipsUrl, {
            headers: { 'Authorization': `Bearer ${access_token}` },
        });

        const data = await response.json();
        return data

    } catch (error) {
        return error
    }
}