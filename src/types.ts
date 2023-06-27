export type City = {
    name: string;
    latitude: number;
    longitude: number;
}

export type Range = {
    from: string;
    to: string;
    distance: number;
}

export type Distance = {
    ranges: Range[];
    totalDistance: number;
}