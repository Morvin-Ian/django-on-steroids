import { baseUrl } from "./auth"

type uuids = {
    sender: string;
    receiver: string;
}


interface MethodsType {
    addChatMethod(access_token: string, uuids: uuids): Promise<string>
}

const addChatUrl = `${baseUrl}/api/messages/add_dialog/`;


export const addChat: MethodsType['addChatMethod'] = async (access_token, uuids) => {

    const response = await fetch(addChatUrl, {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${access_token}`
        },
        body: JSON.stringify(uuids)
    })


    const data = await response.json();

    if (!response.ok) {
        console.log(data)
        return data
    }
    else {
        console.log(data)
        return data

    }

}