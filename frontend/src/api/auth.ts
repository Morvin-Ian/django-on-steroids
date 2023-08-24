export const baseUrl = "http://127.0.0.1:8000";

type loginCredentials = {
    email:string,
    password: string
}

type registrationCredentials = {
    username:string,
    email:string,
    password: string
}

interface MethodsType {
    loginUser(credentials:loginCredentials):Promise<string|void>
    registerUser(credentials:registrationCredentials):Promise<string|void>
}


const loginUrl = `${baseUrl}/api/auth/login/`;
const registrationUrl = `${baseUrl}/api/auth/register/`;

export const authenticate: MethodsType['loginUser'] = async (credentials) => {
  const response = await fetch(loginUrl, {
      method:"POST",
      headers:{
        'Content-Type': 'application/json',
      },

     body: JSON.stringify(credentials),
  });

  const data = await response.json();

  if (!response.ok) 
  {
    return data;
  }

  else{

      localStorage.clear()
      localStorage.setItem('access_token', data.token);
      localStorage.setItem('uuid', data.uuid);
      localStorage.setItem('profile', data.profile);
      localStorage.setItem('email', data.email);
      localStorage.setItem('username', data.username);
  }
}


export const registration:MethodsType['registerUser'] = async (credentials) =>{
    const response = await fetch(registrationUrl, {
          method:"POST",
          headers:{
            'Content-Type': 'application/json',

          },
          body: JSON.stringify(credentials),

       });

      if (!response.ok) 
      {
        const error = "Username or Email Already Exists"
        return error
        
      }

  }