import React, { useEffect, useState } from "react";
import '../Styles/MainStyles/Main.css';
import GoldImage from '../Images/gold2.png';
import { StateType } from "../Redux/store";
import { useSelector } from "react-redux";
import axios, { AxiosResponse } from "axios";


type Gold = {
    lastYear:string,
    lastYearValue:string,
    tenYearAgo:string,
    tenYearAgoValue:string,
    twentyYearAgo:string,
    twentyYearAgoValue:string,
    goldLastYear:string,
    goldTenYearAgo:string,
    goldTwentyYearAgo:string,
};

const GoldReserves:React.FC =()=>{

    const countryId = useSelector<StateType,StateType['mainReducer']>(state => state.mainReducer);
    const [goldState,setGoldState] = useState<Gold>({
        lastYear:'',
        lastYearValue:'',
        tenYearAgo:'',
        tenYearAgoValue:'',
        twentyYearAgo:'',
        twentyYearAgoValue:'',
        goldLastYear:'',
        goldTenYearAgo:'',
        goldTwentyYearAgo:''
    });

    const getGoldStats =async(countryCode:string)=>{

        const allReservsesApi = `http://api.worldbank.org/v2/country/${countryCode}/indicator/FI.RES.TOTL.CD?format=json` // all reserves
        const allReservsesWithoutGoldApi = `http://api.worldbank.org/v2/country/${countryCode}/indicator/FI.RES.XGLD.CD?format=json` // all reserves - gold

        const getAllReservses = axios(allReservsesApi);
        const getAllReservsesWithoutGold = axios(allReservsesWithoutGoldApi);
        const goldApiAll = [getAllReservses,getAllReservsesWithoutGold];
        
        await axios.all(goldApiAll).then(
            axios.spread((...allData)=>{

                const lastYear = allData[0].data[1][0].date; //gets year
                const tenYearsAgo = allData[0].data[1][10].date; // gets year
                const twentyYearsAgo = allData[0].data[1][20].date; // gets year
                const lastYearGoldValue = new Intl.NumberFormat('pl-PL').format(allData[0].data[1][0].value); // last year all reserves
                const tenYearAgoGoldValue = new Intl.NumberFormat('pl-PL').format(allData[0].data[1][10].value); // 10 years ago  all reserves
                const twentyYearAgoGoldValue = new Intl.NumberFormat('pl-PL').format(allData[0].data[1][20].value); // 20 years ago all reserves
                const lastYearAllReservsesWithoutGold = new Intl.NumberFormat('pl-PL').format(parseInt(allData[0].data[1][0].value) - parseInt(allData[1].data[1][0].value)); // last year all reserves without gold
                const tenYearAllReservsesWithoutGold = new Intl.NumberFormat('pl-PL').format(parseInt(allData[0].data[1][10].value) - parseInt(allData[1].data[1][10].value)); // 10 years agor all reserves without gold
                const twentyYearAllReservsesWithoutGold = new Intl.NumberFormat('pl-PL').format(parseInt(allData[0].data[1][20].value) - parseInt(allData[1].data[1][20].value)); // 20 years all reserves without gold

                setGoldState({
                    lastYear:lastYear,
                    lastYearValue:lastYearGoldValue,
                    tenYearAgo:tenYearsAgo,
                    tenYearAgoValue:tenYearAgoGoldValue,
                    twentyYearAgo:twentyYearsAgo,
                    twentyYearAgoValue:twentyYearAgoGoldValue,
                    goldLastYear:lastYearAllReservsesWithoutGold, // parse to number only gold value last year
                    goldTenYearAgo:tenYearAllReservsesWithoutGold, // parse to number only gold value 10 years ago
                    goldTwentyYearAgo:twentyYearAllReservsesWithoutGold // parse to number only gold value 20 years ago
                })
            })
        )
    };

    useEffect(()=>{
        getGoldStats(countryId.countryCode);
    },[countryId]);

    return(
        <>
            <section className='gold-reserves'>
                <div className='gold-title'>
                    <p>Total reserves (includes gold, current US$)</p>
                </div>
                <div className='gold-content'>
                    <div className='gold-el'>
                        <div className='el-title'><p>{goldState.lastYear}</p></div>
                        <div className='el-image'><img src={GoldImage} alt=''/></div>
                        <p>All reserves</p>
                        <p>{goldState.lastYearValue}</p>
                        <p>Gold reserves</p>
                        <p>{goldState.goldLastYear}</p>
                    </div>
                    <div className='gold-el'>
                        <div className='el-title'><p>{goldState.tenYearAgo}</p></div>
                        <div className='el-image'><img src={GoldImage} alt=''/></div>
                        <p>All reserves</p>
                        <p>{goldState.tenYearAgoValue}</p>
                        <p>Gold reserves</p>
                        <p>{goldState.goldTenYearAgo}</p>
                    </div>
                    <div className='gold-el'>
                        <div className='el-title'><p>{goldState.twentyYearAgo}</p></div>
                        <div className='el-image'><img src={GoldImage} alt=''/></div>
                        <p>All reserves</p>
                        <p>{goldState.twentyYearAgoValue}</p>
                        <p>Gold reserves</p>
                        <p>{goldState.goldTwentyYearAgo}</p>
                    </div>
                </div>
            </section>
            
        </>
    );
};

export default React.memo(GoldReserves);