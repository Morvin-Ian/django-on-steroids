// const baseUrl = "http://127.0.0.1:8000";
// const loginUrl = `${baseUrl}/api/auth/login/`;

// const loginUser = async (credentials) =>
// {
//   const response = await fetch(url, {
//       method:"POST",
//       headers:{
//         'Content-Type': 'application/json',
//       },

//      body: JSON.stringify(credentials), // body data type must match "Content-Type" header
//   });

//   const data = await response.json();

//   if (!response.ok) 
//   {
//     // setError(data)
//     // setPassword('');

//   }

//   else
//   {
//       localStorage.clear()
//       localStorage.setItem('access_token', data.token);
//       localStorage.setItem('uuid', data.uuid);
//       localStorage.setItem('email', data.email);
//       localStorage.setItem('username', data.username);
    
//   }
// }