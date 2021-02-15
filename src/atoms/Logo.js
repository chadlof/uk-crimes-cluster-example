import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro'
import logo from '../logo.svg';

const LogoWrapper = styled.div `
  display: flex;
  justify-content:center;
  align-items: center;
  height: 10vmin;
  pointer-events: none;
`

export const Logo = () => {
  return (
    <LogoWrapper>
      <img src={logo}  alt="logo" height='100%' />
    </LogoWrapper>
  )
}
