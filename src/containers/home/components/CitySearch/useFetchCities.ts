import { LabeledValue } from "antd/es/select";
import { CITIES_ENDPOINT } from "../../../../contants";
import { City } from "../../../../types";

const useFetchCities = () => {
    async function fetchCityList(city: string): Promise<LabeledValue[]> {
        if (city.length <= 2) return [];

        return fetch(CITIES_ENDPOINT + '?name=' + city)
            .then((response) => { 
                if(!response.ok) throw new Error("Error");
                return response.json();
            })
            .then((body) => {

                if (!body?.cities) {
                    return [];
                }

                return body?.cities?.map((city: City) => ({
                    label: city.name,
                    value: city.name,
                }));
            }
            ).catch((error) => {
                console.error("ee => ", error);
                throw new Error("Error");
            });
    }

    return fetchCityList;
}

export default useFetchCities;