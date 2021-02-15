import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro'
import { BrowserRouter as Router } from "react-router-dom";
import { Logo } from '../atoms/Logo'
import { Link } from '../atoms/Link'

const SidebarWrapper = styled.div `
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items:center;
  width: 100%;
  height: 100vh;
  border: 1px solid #504e4ef2;
  box-shadow:
  rgba(0,0,0,0.4)
  10px 10px;
`
const LogoWrapper = styled.div `
  display: flex;
  justify-content: center;
  align-items:center;  
  background-color: #504e4ef2;
  height:20%;
  margin-bottom: 40px;
  width: 100%;
`
export const Sidebar = () => {

  

  return (
    <SidebarWrapper>
      <LogoWrapper>
        <Logo/>
      </LogoWrapper>
        <Router>
          <Link to='/pages/IDSHome' name='IDS Home'/>
          <Link to='/' name='Map' />
          <Link to='/' name='Images'/>
        </Router>
   </SidebarWrapper>
  );
}

