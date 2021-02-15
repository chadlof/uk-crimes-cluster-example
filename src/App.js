// import components, dependencies, functions
import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro'
import { Sidebar } from './molecules/Sidebar'
import { labeledStatement } from '@babel/types';
import { GoogleMap } from './atoms/GoogleMap'
import { Button} from './atoms/Button'

// component/file level logic
const AppWrapper = styled.div `
  display: flex;
  margin: auto;
  height: 100vh;
  width: 100%;
`
const SidebarWrapper = styled.div `
  display: flex;
  justify-content: flex-start;
  align-items:center;
  width:20%;
`

const MainViewWrapper = styled.div `
  display: flex;
  flex-flow: column;
  justify-content: space-evenly;
  align-items:center;
  width: 100%;
`

const MapWrapper = styled.div `
  display: flex;
  justify-content: space-evenly;
  align-items:center;
  width: 100%;
  height: 100vh;
`

function App() {
  // render logic
  const [ isMapOpen, setIsMapOpen ]= useState(true)
  

  console.log({isMapOpen})
  return (
    <AppWrapper>
      <SidebarWrapper>
        <Sidebar/>
      </SidebarWrapper>
      <MainViewWrapper>
      <MapWrapper>
            {
              isMapOpen &&
              <GoogleMap/>
            }
      </MapWrapper>
      <Button 
      name={isMapOpen ? 'Hide Map' : 'Show Map'}
      value={isMapOpen}
      setValue={setIsMapOpen}
      />
      </MainViewWrapper>
    </AppWrapper>
  );
}

export default App;
