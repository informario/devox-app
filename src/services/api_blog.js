import axios from 'axios';

const apiBlog = axios.create({
    baseURL: import.meta.env.VITE_VUE_APP_BACKEND_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default apiBlog;

export const fetchParagraphs = async (header) => {
    try {
        const response = await apiBlog.get('/fetch', header);
        return JSON.parse(response.data);
    }
    catch (error) {
        console.error('Error al obtener los datos:', error);
        throw error;
    }
};

export const pushParagraph = async (data, header) => {
    try {
        const response = await apiBlog.post('/push', data, header);
        return response.data;
    }
    catch (error) {
        console.error('Error al obtener los datos:', error);
        throw error;
    }
};

export const removeParagraph = async (data, header) =>{
    try {
        const response = await apiBlog.post('/remove', data, header);
        return response.data;
    }
    catch (error) {
        console.error('Error al eliminar parrafo:', error);
        throw error;
    }
}

export const getAuthToken = async (data, header) =>{
    try {
        const response = await apiBlog.post('/login', data, header);
        return response.data.accessToken;
    }
    catch (error) {
        console.error('Error al obtener los datos:', error);
        throw error;
    }
}

export const sendSignUpForm = async(data) =>{
    try {
        const response = await apiBlog.post('/signupform', data);
        return response.data.authToken;
    }
    catch (error) {
        console.error('Error al obtener los datos:', error);
        throw error;
    }
}