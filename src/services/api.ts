import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://saude-familia-ihc.herokuapp.com/projeto-saude-familia',
    maxContentLength: 99999999999999,
    maxBodyLength: 999999999999999,
});
