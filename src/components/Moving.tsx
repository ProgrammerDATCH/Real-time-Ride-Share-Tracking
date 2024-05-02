import MapComponent from './MapComponent'
import { useState } from 'react'
import { formatDuration } from '../utils/functionUtils';
import { route } from '../constants/coordinates';
import { FiBell, FiHeart, FiInfo, FiMenu } from 'react-icons/fi';
export const Moving = () => {
    const [routeInfo, setRouteInfo] = useState<google.maps.DirectionsLeg | null>(null);
    return (
        <div className='bg-gradient-to-r from-cyan-500 to-green-500 w-full h-full'>
            <div className="menu flex justify-between items-center px-5" style={{ height: '10%' }}>
                <FiMenu className='text-white text-xl' />
                <h4 className='text-3xl'>Startup</h4>
            </div>
            <div className="route-details flex flex-col bg-white p-4 text-lg h-1/5">
                <h2 className='text-xl font-bold'>{route.startingPoint.name} - {route.endingPoint.name}</h2>
                <span>Next stop: {!routeInfo ? "Loading..." : routeInfo?.end_address}</span>
                <span className='flex w-full justify-between text-base'><span>Distance: {!routeInfo ? "Loading..." : (routeInfo as any)?.distance.text}</span> <span>Time: {!routeInfo ? "Loading..." : formatDuration((routeInfo as any)?.duration.value)}</span></span>
            </div>
            <div className="map flex justify-center h-3/5">
                <MapComponent setRouteInfo={setRouteInfo} />
            </div>
            <div className="icons flex justify-around items-center w-11/12" style={{ height: '10%' }}>
                <FiHeart className='text-white text-xl' />
                <FiInfo className='text-white text-xl' />
                <FiBell className='text-white text-xl' />
            </div>
        </div>
    )
}
