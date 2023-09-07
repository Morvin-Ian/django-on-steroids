import { baseUrl } from "./auth";

type userResponse = {
    uuid: string;
    username: string;
    email: string;
    profile: string;
}


export type userArrayObject = userResponse[]


interface MethodsType {
    fetchUsers(access_token: string): Promise<userArrayObject>,
}

const usersApiUrl = `${baseUrl}/api/auth/users/`;


export const fetchUsers: MethodsType['fetchUsers'] = async (access_token) => {
    const response = await fetch(usersApiUrl, {
        headers: { 'Authorization': `Bearer ${access_token}` },
    })

    const data = await response.json();
    localStorage.setItem('non-relationships', JSON.stringify(data));
    return data

}