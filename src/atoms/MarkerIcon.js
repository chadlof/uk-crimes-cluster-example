import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro'
import markerIcon from '../static/markerIcon.png'

const LogoWrapper = styled.div `
  display: flex;
  justify-content:center;
  align-items: center;
  height: 10vmin;
  pointer-events: none;
  color: red;
`

export const MarkerIcon = () => {
  return (
    <LogoWrapper>
      <img src={markerIcon}  alt="Map Marker icon" height='100%' />
    </LogoWrapper>
  )
}