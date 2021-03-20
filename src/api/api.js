import axios from 'axios'

//amadeus apis
let token_api = "https://test.api.amadeus.com/v1/security/oauth2/token/"

//dhruv apis
let base = "https://thawing-sierra-99222.herokuapp.com/api/"
let signup_api = base + "users/register/"
let login_api = base + "users/login/"

export const login = async (email , password) => {
    const response = await axios.post(login_api , {
        "email": email,
        "password": password,
    },
    {
        headers: {
          'Content-Type': 'application/json'
        }
    })
    console.log(response.data)
    return response
}

export const signup = async (obj) => {
    const response = await axios.post(signup_api , obj)
    return response
}

export const get_api_token = async (city) => {
    var config = {
        method: 'get',
        url: 'https://hotels4.p.rapidapi.com/locations/search?query=' + city + '&locale=en_US',
        headers: { 
          'x-rapidapi-key': 'c5d58e6967msh3f4f3f0fbdaa628p13eb8djsn66d180fdca4d', 
          'x-rapidapi-host': 'hotels4.p.rapidapi.com'
        }
      };

    let response = await axios(config)
    return response
}