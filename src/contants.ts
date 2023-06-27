export const API_BASE_URL = 'https://mozio-challenge-api.vercel.app/api/';
export const CITIES_ENDPOINT = API_BASE_URL + 'cities';
export const GET_DISTANCE_ENDPOINT = API_BASE_URL + 'getDistance';

export const ERROR_MESSAGES = {
    CITY_REQUIRED: 'Please select a city',
    CITY_ORIGIN_REQUIRED: 'You must choose the city of origin',
    CITY_DUPLICATE: 'The city of origin and destination cannot be the same'
}

export const UI_DATE_FORMAT = 'DD/MM/YYYY';