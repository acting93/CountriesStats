import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_COUNTRY_INFO, GET_COUNTRY_NAME, GET_FLAG } from "../../Redux/actionTypes";
import { StateType } from "../../Redux/store";
import CountryInfo from "./InfoComponents/CountryInfo";
import WorldBankInfo from "./InfoComponents/WorldBankInfo";


interface CountryName {
    name: string,
    capital: string,
    currency:string,
    language:string
    area:string,
};

interface Emblems {
    coatofArms:string
    flag : string
};

interface Worldbank {
    population:string,
    populationSqKm:string
    forestArea:string
    gdp:string,
    gdpPPC:string
};


const InfoContry:React.FC =()=>{

    const dispatch = useDispatch();

    //id country from state (reducer)
    const countryId = useSelector<StateType,StateType['mainReducer']>(state => state.mainReducer); 

    //flag, coatOfarms state
    const [emblems,setEmblems] = useState<Emblems>({
        coatofArms:'',
        flag:''
    });

    const [country, setCountry] = useState<CountryName>({
        name: '',
        capital:'',
        currency:'',
        language:'',
        area:''
    });

    const [worldBankInfo,setWorldBankInfo] = useState<Worldbank>({
        population:'',
        populationSqKm:'',
        forestArea:'',
        gdp:'',
        gdpPPC:''
    });

//set countryInformation 

    const getCountryName =async(countryCode:string)=>{

        const apiCountry = `https://restcountries.com/v3.1/alpha/${countryCode}`;

            await axios.get(apiCountry,{
                headers:{'Content-Type':'application/json'}
            })
            .then(response => {

                const countryArray = response.data[0]; // iteration of array and object 
                const getCurrency = Object.entries<ObjectConstructor>(countryArray.currencies); // iteration with using object 
                const getLanguage = Object.values<ObjectConstructor>(countryArray.languages); // iteration with using object

                setCountry({
                    name: countryArray.name.common,
                    capital:countryArray.capital[0].toUpperCase(),
                    currency: getCurrency[0][1].name.toString(),
                    language:getLanguage.toString(),
                    area:new Intl.NumberFormat('pl-PL').format(countryArray.area)
                });

                setEmblems({
                    coatofArms:countryArray.coatOfArms.png,
                    flag:countryArray.flags.png
                });

                ///get flag to global state
                dispatch<GET_FLAG>({
                    type:'GET_FLAG',
                    flag: countryArray.flags.png
                });

                ///get name to global state

                dispatch<GET_COUNTRY_NAME>({
                    type:'GET_COUNTRY_NAME',
                    name:countryArray.name.common
                });

            })
            .catch(error => console.log(error));
    };

const getRestInformation =async(countryCode:string)=>{

    //World Bank

    const populationApi = `https://api.worldbank.org/v2/country/${countryCode}/indicator/SP.POP.TOTL?format=json`;
    const areaApi  = `https://api.worldbank.org/v2/country/${countryCode}/indicator/AG.SRF.TOTL.K2?format=json`;
    const GDPApi = `https://api.worldbank.org/v2/country/${countryCode}/indicator/NY.GDP.MKTP.CD?format=json`;
    const GDPperCapitaApi  = `https://api.worldbank.org/v2/country/${countryCode}/indicator/NY.GDP.PCAP.CD?format=json`;
    const Co2EmissionApi  = `https://api.worldbank.org/v2/country/${countryCode}/indicator/EN.ATM.CO2E.PC?format=json`; /// -  send result to global state
    const gniPerCapitaApi  = `https://api.worldbank.org/v2/country/${countryCode}/indicator/NY.GNP.PCAP.CD?format=json`; /// -  send result to global state
    const populationSqKm = `https://api.worldbank.org/v2/country/${countryCode}/indicator/EN.POP.DNST?format=json`;
    const gniApi = `https://api.worldbank.org/v2/country/${countryCode}/indicator/NY.GNP.ATLS.CD?format=json`; /// -  send result to global state 2020
    const forestAreaApi = `https://api.worldbank.org/v2/country/${countryCode}/indicator/AG.LND.FRST.K2?format=json`;
    const gdpGrowthApi = `https://api.worldbank.org/v2/country/${countryCode}/indicator/NY.GDP.MKTP.KD.ZG?format=json`; /// -  send result to global state 2020 annual %
    const inflationApi = `https://api.worldbank.org/v2/country/${countryCode}/indicator/NY.GDP.DEFL.KD.ZG?format=json`; /// -  send result to global state 2020 gdp deflator annual %
    const exportApi = `https://api.worldbank.org/v2/country/${countryCode}/indicator/NE.EXP.GNFS.ZS?format=json`; /// -  send result to global state 2020 export goods and service (% of GDP)
    const importApi = `https://api.worldbank.org/v2/country/${countryCode}/indicator/NE.IMP.GNFS.ZS?format=json`; /// -  send result to global state 2020 import goods and service (% of GDP)
    const industryApi = `https://api.worldbank.org/v2/country/${countryCode}/indicator/NV.IND.TOTL.ZS?format=json`; /// -  send result to global state 2020 Industry (including construction), value added (% of GDP)
    const militaryExpenditureApi = `https://api.worldbank.org/v2/country/${countryCode}/indicator/MS.MIL.XPND.GD.ZS?format=json`; /// -  send result to global state 2020 Military expenditure (% of GDP) - Poland
    const merchandiseTradeApi = `https://api.worldbank.org/v2/country/${countryCode}/indicator/TG.VAL.TOTL.GD.ZS?format=json`; /// -  send result to global state 2020 merchandise trade (% of GDP)

    const getPopulation = axios.get(populationApi);    
    const getArea = axios.get(areaApi);
    const getGDP = axios.get(GDPApi);
    const getGDPerCapita = axios.get(GDPperCapitaApi);
    const getCo2Emission = axios.get(Co2EmissionApi );
    const getGniPerCapita = axios.get(gniPerCapitaApi);
    const getPopulationSqKm = axios.get(populationSqKm);  
    const getForestArea = axios.get(forestAreaApi);
    const getGni = axios.get(gniApi);
    const getGdpGrowth = axios.get(gdpGrowthApi);
    const getInflation = axios.get(inflationApi);
    const getExport = axios.get(exportApi);
    const getImport = axios.get(importApi);
    const getIndustry = axios.get(industryApi);
    const getMilitaryExpenditure = axios.get(militaryExpenditureApi);
    const getMerchandiseTrade = axios.get(merchandiseTradeApi);

    const allApis = [getPopulation,getArea,getGDP,getGDPerCapita,getCo2Emission,getGniPerCapita,getPopulationSqKm,getForestArea,getGni,getGdpGrowth,getInflation,getExport,getImport,getIndustry,getMilitaryExpenditure,getMerchandiseTrade];

    await axios.all(allApis).then(

        axios.spread((...allData)=>{

            const population = new Intl.NumberFormat('pl-PL').format(allData[0].data[1][0].value); 
            const gdp = new Intl.NumberFormat('pl-PL').format((allData[2].data[1][0].value).toFixed(0));
            const gdpPerCapita = new Intl.NumberFormat('pl-Pl').format((allData[3].data[1][0].value).toFixed(0));
            const co2Emission = allData[4].data[1][2].value.toFixed(2);
            const gniPerCapita = new Intl.NumberFormat('pl-PL').format(allData[5].data[1][0].value);
            const populationSqKm = allData[6].data[1][0].value.toFixed(0); 
            const forestArea = new Intl.NumberFormat('pl-Pl').format(allData[7].data[1][0].value);
            const gni = new Intl.NumberFormat('pl-Pl').format(allData[8].data[1][0].value);
            const gdpGrowth = allData[9].data[1][0].value.toFixed(2);
            const inflation = allData[10].data[1][0].value.toFixed(2);
            const exportIndex = allData[11].data[1][0].value.toFixed(2);
            const importIndex = allData[12].data[1][0].value.toFixed(2);
            const industry = allData[13].data[1][0].value.toFixed(2);
            const militaryExpenditure = allData[14].data[1][0].value.toFixed(2);
            const merchandiseTrade = allData[15].data[1][0].value.toFixed(2);
            
            setWorldBankInfo({
               population:population,
               populationSqKm:populationSqKm,
               forestArea:forestArea,
               gdp:gdp,
               gdpPPC:gdpPerCapita
            });

            dispatch<GET_COUNTRY_INFO>({
                type:'GET_COUNTRY_INFO',
                payload:{
                    co2: co2Emission,
                    gniPerCapita:gniPerCapita,
                    gni:gni,
                    gdpGrowth:gdpGrowth,
                    inflation:inflation,
                    exportIndex:exportIndex,
                    importIndex:importIndex,
                    industry:industry,
                    militaryExpenditure:militaryExpenditure,
                    merchandiseTrade:merchandiseTrade
                }
            });
        })

    ).catch(error => console.log(error))
};

useEffect(()=>{

    getCountryName(countryId.countryCode);
    getRestInformation(countryId.countryCode);

},[countryId.countryCode]);

    return ( 
        <>
            <div className='map-element stats'>
                <div className='stats-el'>
                    <img
                        src={emblems.flag}
                        alt=''
                    />
                     <img 
                        src={emblems.coatofArms}
                        alt=''
                    />
            </div>
                <div className='stats-el'>
                    <p id='country-name'>{country.name}</p>
                    <table>
                        <tbody>
                            <CountryInfo
                                capital ={country.capital}
                                currency ={country.currency}
                                language ={country.language}
                            />
                            <WorldBankInfo 
                                population ={worldBankInfo.population}
                                area = {country.area} 
                                gdp = {worldBankInfo.gdp}
                                gdpPPC = {worldBankInfo.gdpPPC}
                                populationSqKm = {worldBankInfo.populationSqKm}
                                forestArea = {worldBankInfo.forestArea}
                            />
                        </tbody>
                    </table>
                </div>
            </div>
        </>
     );
};

export default InfoContry;

