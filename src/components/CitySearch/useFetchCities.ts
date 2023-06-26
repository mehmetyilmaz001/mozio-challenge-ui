import { CITIES_ENDPOINT } from "../../contants";
import { City, DDValue } from "../../types";

const useFetchCities = () => {
    async function fetchCityList(city: string): Promise<DDValue[]> {
        if (city.length <= 2) return [];

        return fetch(CITIES_ENDPOINT + '?name=' + city)
            .then((response) => response.json())
            .then((body) => {

                if (!body?.cities) {
                    return [];
                }

                return body?.cities?.map((city: City) => ({
                    label: city.name,
                    value: city.name,
                }));
            }
            );
    }

    return fetchCityList;
}

export default useFetchCities;