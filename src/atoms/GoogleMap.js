import React, { useState, useRef } from 'react';
import styled from 'styled-components/macro'
import GoogleMapReact from 'google-map-react';
import useSupercluster from 'use-supercluster'
import useSwr from 'swr'
// import { LocationQuery } from '../queries/LocationQuery'
// import { MarkerIcon } from './MarkerIcon'

const ClusterIcon = styled.h3 `
    color: #fff;
    background: #1978c8;
    border-radius: 50%;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
`
 
 const MarkerIcon = styled.h3 `
    background: #c8472c;
    border-radius: 50%;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
 `

 const fetcher = (...args) => fetch(...args).then(response => response.json())
    const Marker = ({ children}) => children
export function GoogleMap() {

    const centerIDS = {
      lat: 45.0826498,
      lng: -93.7312182
    }
    const centerUk = {
        lat: 52.6338937,
        lng: -1.1367487
    }

    // need to find a why in we-client to hold these state values in order to cluster markers on map -- like pagination for a map
    const mapRef = useRef()
    const [ zoom, setZoom ] = useState(14)
    const [ bounds, setBounds ] = useState(null)
    const url = 'https://data.police.uk/api/crimes-street/all-crimes?lat=52.629729&lng=-1.131592&date-2019-10'
    console.log({zoom})

    const {data, error} = useSwr(url, fetcher)
    const crimes = data && !error ? data : []
    // const crimes = LocationQuery
    console.log({crimes})
    const points = crimes.map((c) => ({
        type: "Feature",
        properties: {
            cluster: false,
            crimeId: c.id,
            category: c.category,
            latitude: c.location.latitude,
            longitude: c.location.longitude,
        },
        geometry: { 
            type: "Point", 
            coordinates: [
                parseFloat(c.location.longitude), 
                parseFloat(c.location.latitude)
            ] 
        }
    }))
    
    const { clusters, supercluster } = useSupercluster({
        points,
        bounds,
        zoom,
        options: { radius: 75, maxZoom: 20 }
    });
    // console.log({clusters})
    // console.log({crimes})
    // console.log({points})
        return (
        <div style={{ height: '95vh', width: '100%' }}>
            <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyANgyjKMfPcnUEef5sHlpg43R_apSMSUN8'}}
            defaultCenter={centerUk}
            defaultZoom={8}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map }) => {
                mapRef.current = map;
              }}
            onChange={({zoom, bounds}) => {
                setZoom(zoom)
                setBounds([
                    bounds.nw.lng,
                    bounds.se.lat,
                    bounds.se.lng,
                    bounds.nw.lat,
                ])
            }}
            >
                {clusters.map(cluster => {
                    const [longitude, latitude] = cluster.geometry.coordinates;
                    const {
                        cluster: isCluster,
                        point_count: pointCount
                    } = cluster.properties;
                    
                    if (isCluster) {
                        // console.log({latitude})
                        // console.log({longitude})
                        return (
                            <Marker
                            key={`cluster-${cluster.id}`}
                            lat={latitude}
                            lng={longitude}
                            >
                                <ClusterIcon
                                        style={{
                                            width:`${10 + (pointCount / points.length) * 30}px`,
                                            height:`${10 + (pointCount / points.length) * 30}px`,
                                        }}
                                        onClick={() => {
                                            const expansionZoom = Math.min(
                                                supercluster.getClusterExpansionZoom(cluster.id),
                                                20
                                                )
                                                mapRef.current.setZoom(expansionZoom);
                                                mapRef.current.panTo({ lat: latitude, lng: longitude });
                                            }}
                                        >
                                        {pointCount}
                                </ClusterIcon>
                            </Marker>
                        )
                    }
                    return (
                        <Marker
                        key={`crime-${cluster.properties.crimeId}`}
                        lat={latitude}
                        lng={longitude}
                        >
                            <MarkerIcon/>
                        </Marker>
                    )
              })}
            </GoogleMapReact>
        </div>
    );
}
 
