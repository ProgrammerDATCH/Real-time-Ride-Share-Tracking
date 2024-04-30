interface Coordinate {
    lat: number;
    lng: number;
    name: string;
}
interface Route {
    startingPoint: Coordinate;
    intermediateStops: Coordinate[];
    endingPoint: Coordinate;
}

const route: Route = {
    startingPoint: {
        lat: -1.939826787816454,
        lng: 30.0445426438232,
        name: "Nyabugogo"
    },
    intermediateStops: [
        {
            lat: -1.9355377074007851,
            lng: 30.060163829002217,
            name: "A"
        },
        {
            lat: -1.9358808342336546,
            lng: 30.08024820994666,
            name: "B"
        },
        {
            lat: -1.9489196023037583,
            lng: 30.092607828989397,
            name: "C"
        },
        {
            lat: -1.9592132952818164,
            lng: 30.106684061788073,
            name: "D"
        },
        {
            lat: -1.9487480402200394,
            lng: 30.126596781356923,
            name: "E"
        },
    ],
    endingPoint: {
        lat: -1.9365670876910166,
        lng: 30.13020167024439,
        name: 'Kimironko'
    }
};

export default route;
