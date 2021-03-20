import axios from 'axios'

//amadeus apis
let token_api = "https://test.api.amadeus.com/v1/security/oauth2/token/"

//dhruv apis
let base = "https://unsungtraveller.herokuapp.com/api/v1/"
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

export const get_cities_attr = async (city) => {
    var config = {
        method: 'get',
        url: 'https://hotels4.p.rapidapi.com/locations/search?query=' + city + '&locale=en_US',
        headers: { 
            'x-rapidapi-key': 'e3078ac64amsh7ca33c2f0f6ba25p1cb3c2jsn3201da75e3b0',
            'x-rapidapi-host': 'hotels4.p.rapidapi.com'
        }
      };

    let response = await axios(config)
    return response
}

export const get_image_city = async (city) => {
    let url = "https://api.teleport.org/api/urban_areas/slug:" + city + "/images/"
    let response = await axios.get(url)
    return response
}

export const get_hotels = async (did , sdate , edate , num) => {
    const options = {
        method: 'GET',
        url: 'https://hotels4.p.rapidapi.com/properties/list',
        params: {
          destinationId: did,
          pageNumber: '1',
          checkIn: sdate,
          checkOut: edate,
          pageSize: '25',
          adults1: num,
          currency: 'USD',
          locale: 'en_US',
          sortOrder: 'PRICE'
        },
        headers: {
            'x-rapidapi-key': 'e3078ac64amsh7ca33c2f0f6ba25p1cb3c2jsn3201da75e3b0',
            'x-rapidapi-host': 'hotels4.p.rapidapi.com'
        }
      };
      
      let response = await axios.request(options)
      return response
}

export const get_hotel_photo = async (_id) => {
    const options = {
        method: 'GET',
        url: 'https://hotels4.p.rapidapi.com/properties/get-hotel-photos',
        params: {id: _id},
        headers: {
            'x-rapidapi-key': 'e3078ac64amsh7ca33c2f0f6ba25p1cb3c2jsn3201da75e3b0',
            'x-rapidapi-host': 'hotels4.p.rapidapi.com'
        }
      };
      
      let response = await axios.request(options)
      return response
}