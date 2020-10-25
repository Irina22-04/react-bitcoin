import axios from 'axios';

export const getBitcoins = async (start, end) => {
    return axios(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}`)
        .then(response => response.data);
};
