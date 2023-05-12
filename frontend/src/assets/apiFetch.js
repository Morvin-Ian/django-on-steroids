// File resppsible for fetching Api data 


const relationshipsUrl = "http://127.0.0.1:8000/api/messages/chats/";

// const redirect = useNavigate()



export const fetchRelationships = async(access_token) => {
  try {
   
    // Send a fetch request with the bearer token
    const response = await fetch(relationshipsUrl, {
      headers: { 'Authorization': `Bearer ${access_token}` },
    });

    // Get the response data
    const data = await response.json();
    
    return data

    } 
    catch (error) 
    {
        console.error(error);
    }
}


const messagesUrl = "http://127.0.0.1:8000/api/messages/list/";

export const fetchMessages = async(access_token) => {
    try 
    {
    // Send a fetch request with the bearer token
    const response = await fetch(messagesUrl, {
        headers: { 'Authorization': `Bearer ${access_token}` },
    });

    if(!response.ok)
    {
        localStorage.clear()
        // redirect('/sign-in')
    }
    // Get the response data

    const data = await response.json();
        return data;

    } 

    catch (error) 
    {
        console.error(error);
    }
}

