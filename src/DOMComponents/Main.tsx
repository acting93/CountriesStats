import React from "react";
import Map from '../SubComponentsToMain/Map';
import '../Styles/MainStyles/Main.css';
import AboutCountry from "../SubComponentsToMain/AboutCountry";
import Coronavirus from "../SubComponentsToMain/Coronovirus";
import Military from "../SubComponentsToMain/Military";
import GoldReserves from "../SubComponentsToMain/GoldReserves";

const Main:React.FC =()=>{
    return(
        <>
            <main className='main'>
                <Map />
                <AboutCountry />
                <Coronavirus />
                <Military />
                <GoldReserves />
            </main>
        </>
    );
};

export default Main




