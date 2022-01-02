import React from "react";
import { useSelector } from "react-redux";
import { StateType } from "../Redux/store";
import '../Styles/MainStyles/Main.css';
import InfoCountry from "./MapComponents/InfoCountry";
import MapWorld from "./MapComponents/MapWorld";
import SingleCountry from "./MapComponents/SingleCountry";


const Map:React.FC =()=>{

    const isCountry = useSelector<StateType,StateType['mainReducer']>(state => state.mainReducer);

    return(
        <>
            <section className='main-element map-content'>
                <InfoCountry /> 
                {isCountry.showCountry === false ? <SingleCountry /> : <MapWorld />}
            </section>
        </>
    );
};

export default Map;

