import { useEffect, useState } from "react";
import PublicLayout from "../../layouts/PublicLayout";
import { GET_DISTANCE_ENDPOINT } from "../../contants";

const Result = () => {
    const [ distance, setDistance ] = useState(null);
    const urlParams = new URLSearchParams(window.location.search);
    const cities = urlParams.get('cities');
    const date = urlParams.get('date');
    const passengers = urlParams.get('passengers');

    const fetchDistance = async (cities: string) => {
        const response = await fetch(`${GET_DISTANCE_ENDPOINT}?cities=${cities}`);
        const data = await response.json();
        setDistance(data);
        console.log(data);
    }

    useEffect(() => {
        fetchDistance(cities ?? '')
    }, [cities]);


    if(!distance) {
        return <div>Loading...</div>
    }
    
    return (
        <PublicLayout>
            <h1>Result</h1>

            {JSON.stringify(distance)}

            {date && <div>Date: {date}</div>}
            {passengers && <div>Passengers: {passengers}</div>}
        </PublicLayout>
    )
}

export default Result;