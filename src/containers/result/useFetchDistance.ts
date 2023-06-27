import { useEffect, useMemo, useState } from "react";
import { Distance, Range } from "../../types";
import { GET_DISTANCE_ENDPOINT } from "../../contants";
import { LineItem } from "../../components/Line";

const useFetchDistance = (cities: string | null) => {
    const [distance, setDistance] = useState<Distance | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchDistance = async (cities: string) => {
        try {
            setLoading(true);
            const response = await fetch(`${GET_DISTANCE_ENDPOINT}?cities=${cities}`);
            const data = await response.json();
            setDistance(data?.result as Distance);
        } catch (error) {
            setError(error as string);
        } finally {
            setLoading(false);
        }

    }

    useEffect(() => {
        fetchDistance(cities ?? '')
    }, [cities]);

    const lineItems: LineItem[] = useMemo(() => {

        if (!distance) {
            return [] as LineItem[];
        }

        const items = [];

        const { ranges } = distance;

        for (let i = 0; i < ranges.length; i++) {
            const range: Range = ranges[i];
            const prevRange = ranges[i - 1];
            const nextRange = ranges[i + 1];
            let info = range.distance.toFixed(2) + ' km';
            if (i === 0 || (i > 0 && prevRange.to !== range.from)) {
                items.push({
                    id: range.from,
                    name: range.from,
                    info
                });
            }

            items.push({
                id: range.to,
                name: range.to,
                info: nextRange ? nextRange.distance.toFixed(2) + ' km' : ''
            });

        }
        return items;
    }, [distance]);


    return { lineItems, loading, error, distance }

};

export default useFetchDistance;
