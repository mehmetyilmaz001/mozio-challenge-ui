import React from "react";
import { useMemo } from "react";
import PublicLayout from "../../layouts/PublicLayout";
import Line from "../../components/Line";
import AppCard from "../../components/AppCard";
import history from "../../history";
import { Button, Skeleton } from "antd";
import useFetchDistance from "./useFetchDistance";

const Result = () => {

    const urlParams = new URLSearchParams(window.location.search);
    const cities = urlParams.get('cities');
    const date = urlParams.get('date');
    const passengers = urlParams.get('passengers');

    const { distance, lineItems, loading, error } = useFetchDistance(cities);

    const resultUi = useMemo(() => {
        if (loading) return <Skeleton active />

        if (error) return <span className='higlight-text'>Something went wrong</span>

        return (
            <>
                <Line items={lineItems} />
                <div className="center column">
                    {distance?.totalDistance ? <div> <span className='higlight-text'>{distance.totalDistance} km</span> is total distance</div> : <></>}
                    {passengers && <div> <span className='higlight-text'>{passengers}</span> passengers</div>}
                    {date && <div><span className='higlight-text'>{date}</span></div>}
                </div>
            </>
        );
    
        }
    , [loading, error, lineItems, distance?.totalDistance, passengers, date]);


    return (
        <PublicLayout>
            <AppCard>
            <div className="center column">
                {resultUi}
                {!loading && <Button onClick={() => {
                    history.push({
                        pathname: '/',
                        search: window.location.search,
                    });
                }} type="primary" className="mt-35">Back</Button> }
            </div>
            </AppCard>
        </PublicLayout>
    )
}

export default Result;