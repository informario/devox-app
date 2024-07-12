import axios from 'axios';

const apiBlog = axios.create({
    baseURL: import.meta.env.VITE_VUE_APP_BACKEND_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});
function getHeader(){
    const token = localStorage.getItem('jwt');
    return {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }
  }


export default apiBlog;

export const getUsername = function() {
    return localStorage.getItem('username');
}

export const fetchParagraphs = async () => {
    try {
        const response = await apiBlog.get('/fetch', getHeader());
        return JSON.parse(response.data);
    }
    catch (error) {
        console.error('Error al obtener los datos:', error);
        throw error;
    }
};

export const pushParagraph = async (data) => {
    try {
        const response = await apiBlog.post('/push', data, getHeader());
        return response.data;
    }
    catch (error) {
        console.error('Error al obtener los datos:', error);
        throw error;
    }
};

export const removeParagraph = async (data) =>{
    try {
        const response = await apiBlog.post('/remove', data, getHeader());
        return response.data;
    }
    catch (error) {
        console.error('Error al eliminar parrafo:', error);
        throw error;
    }
}

export const getAuthToken = async (data) =>{
    try {
        const response = await apiBlog.post('/login', data, getHeader());
        return response.data.accessToken;
    }
    catch (error) {
        console.error('Error al obtener los datos:', error);
        throw error;
    }
}

export const sendSignUpForm = async(data) =>{
    try {
        const response = await apiBlog.post('/signupform', data, getHeader());
        return response.data.authToken;
    }
    catch (error) {
        console.error('Error al obtener los datos:', error);
        throw error;
    }
}

export const like = async(data) =>{
    try {
        const response = await apiBlog.post('/like', data, getHeader());
        return response.data;
    }
    catch (error) {
        console.error('Error al dar like:', error);
        throw error;
    }
}

export const getLikes = async (data) => {
    try {
        const response = await apiBlog.post('/getlikes', data, getHeader());
        return response.data;
    }
    catch (error) {
        console.error('Error al obtener los datos:', error);
        throw error;
    }
};

export const toggleLike = async (data) => {
    try {
        const response = await apiBlog.post('/togglelike', data, getHeader());
        return response.data;
    }
    catch (error) {
        console.error('Error al obtener los datos:', error);
        throw error;
    }
};