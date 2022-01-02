import React from "react"
import { useSelector } from "react-redux";
import { StateType } from "../Redux/store";
import '../Styles/MainStyles/Main.css';
 
const AboutCountry:React.FC = () => {

    const countryInfo = useSelector<StateType,StateType['mainReducer']>(state => state.mainReducer);
    
    return ( 
        <>
            <section className='about-country' >
                <div className='country-element'>
                    <img
                        src={countryInfo.flag}
                        alt=''
                    />
                </div>
                <div className='country-element'>
                    <div className='country-title'>
                        <p>{countryInfo.countryName}</p>
                    </div>
                    <div className='country-content'>
                            <div className='content-part'>
                                <span><p>CO2 Emission (Tones per capita)</p></span>
                                <span><p>{countryInfo.co2}</p></span>
                            </div>
                            <div className='content-part'>
                                <span><p>Inflation</p></span>
                                <span><p>{countryInfo.inflation}</p></span>
                            </div>
                            <div className='content-part'>
                                <span><p>GNI</p></span>
                                <span><p>{countryInfo.gni}</p></span>
                            </div>
                            <div className='content-part'>
                                <span><p>GNI per capita, Atlas method (current US$)</p></span>
                                <span><p>{countryInfo.gniPerCapita}</p></span>
                            </div>
                            <div className='content-part'>
                                <span><p>Export</p></span>
                                <span><p>{countryInfo.exportIndex}</p></span>
                            </div>
                            <div className='content-part'>
                                <span><p>Import</p></span>
                                <span><p>{countryInfo.importIndex}</p></span>
                            </div>
                            <div className='content-part'>
                                <span><p>Industry</p></span>
                                <span><p>{countryInfo.industry}</p></span>
                            </div>
                            <div className='content-part'>
                                <span><p>Merchandise Trade</p></span>
                                <span><p>{countryInfo.merchandiseTrade}</p></span>
                            </div>
                            <div className='content-part'>
                                <span><p>Military Expediture</p></span>
                                <span><p>{countryInfo.militaryExpenditure}</p></span>
                            </div>
                            <div className='content-part'>
                                <span><p>GDP growth</p></span>
                                <span><p>{countryInfo.gdpGrowth}</p></span>
                            </div>
                    </div>
                </div>
            </section>
        </>
     );
};
 
export default AboutCountry;