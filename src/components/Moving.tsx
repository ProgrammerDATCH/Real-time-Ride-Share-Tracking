import MapComponent from './MapComponent'
import { useState } from 'react'
import { Leg } from '../interfaces';
import { formatDuration } from '../utils/functionUtils';
import route from '../constants/coordinates';
import { FiBell, FiHeart, FiInfo, FiMenu } from 'react-icons/fi';
export const Moving = () => {
    const [routeInfo, setRouteInfo] = useState<Leg | null>(null);
  return (
    <div className='bg-gradient-to-r from-cyan-500 to-green-500 w-full flex flex-col h-full justify-between'>
        <div className="menu flex justify-between h-16 items-center px-5">
            <FiMenu className='text-white text-xl' />
            <h4 className='text-3xl'>Startup</h4>
        </div>
        <div className="route-details flex flex-col bg-white p-4 text-lg">
            <h2 className='text-xl font-bold'>{route.startingPoint.name} - {route.endingPoint.name}</h2>
            <span>Next stop: {!routeInfo ? "Loading..." : routeInfo?.end_address}</span>
            <span className='flex w-full justify-between text-base'><span>Distance: {!routeInfo ? "Loading..." : routeInfo?.distance.text}</span> <span>Time: {!routeInfo ? "Loading..." : formatDuration(routeInfo?.duration.value)}</span></span>
        </div>
        <div className="map flex justify-center">
            <MapComponent setRouteInfo={setRouteInfo} />
        </div>
        <div className="icons flex justify-around items-center w-11/12 h-16">
            <FiHeart className='text-white text-xl' />
            <FiInfo className='text-white text-xl' />
            <FiBell className='text-white text-xl' />
        </div>
    </div>
  )
}
