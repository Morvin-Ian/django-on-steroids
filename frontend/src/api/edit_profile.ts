import { baseUrl } from "./auth"

type userProfile = {
  username: string;
  email: string;
  profile: File | null;
}


interface MethodsType {
  updateProfileMethod(access_token: string, profileData: userProfile): Promise<string>
}

const editProfileUrl = `${baseUrl}/api/auth/edit_user/`;



export const updateProfile: MethodsType['updateProfileMethod'] = async (access_token, profileData) => {


  const formDataObject = new FormData();
  formDataObject.append('username', profileData.username);
  formDataObject.append('email', profileData.email);
  if (profileData.profile) {
    formDataObject.append('profile', profileData.profile, profileData.profile.name);
  }
  const response = await fetch(editProfileUrl, {
    method: "PUT",
    headers: {
      'Authorization': `Bearer ${access_token}`
    },
    body: formDataObject
  })


  const data = await response.json();

  if (!response.ok) {

    return data;
  }
  else {

    localStorage.removeItem('profile')
    localStorage.removeItem('email')
    localStorage.removeItem('username')

    localStorage.setItem('profile', data.profile);
    localStorage.setItem('email', data.email);
    localStorage.setItem('username', data.username);

  }

}