// File resppsible for fetching Api data 

const baseUrl = "http://127.0.0.1:8000/"

const relationshipsUrl = `${baseUrl}api/messages/chats/`;



export const fetchRelationships = async(access_token) => {
  try {
        // Send a fetch request with the bearer token

        const response = await fetch(relationshipsUrl, {
            headers: { 'Authorization': `Bearer ${access_token}` },
        });

        const data = await response.json();    
        localStorage.setItem('relationships', JSON.stringify(data));
        return data

    }catch (error) 
    {
        console.error(error);
    }
}


const messagesUrl = `${baseUrl}api/messages/list/`;

export const fetchMessages = async(access_token) => {
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
        console.error(error);
    }
}

