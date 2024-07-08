import axios from 'axios';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_VUE_APP_BACKEND_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default apiClient;

export const fetch = async () => {
    try {
        const response = await apiClient.get('/fetch');
        console.log('api.js: Datos recibidos:', response.data);
        return JSON.parse(response.data);
    }
    catch (error) {
        console.error('Error al obtener los datos:', error);
        throw error;
    }
};

export const push = async (data) => {
    try {
        const response = await apiClient.post('/push', data);
        return response.data;
    }
    catch (error) {
        console.error('Error al obtener los datos:', error);
        throw error;
    }
};

export const remove = async (id) =>{
    try {
        const response = await apiClient.delete('/remove', {params: {id: id}});
        return response.data;
    }
    catch (error) {
        console.error('Error al obtener los datos:', error);
        throw error;
    }
}
