import React, { useState, useRef } from 'react';
import useSwr from 'swr'



export function LocationQuery() {
    const fetcher = (...args) => fetch(...args).then(response => response.json())
    const url = 'https://data.police.uk/api/crimes-street/all-crimes?lat=52.629729&lng=-1.131592&date-2019-10'
    const {data, error} = useSwr(url, fetcher)
    const crimes = data && !error ? data : []

    return crimes
}
