import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { StateType } from "../Redux/store";
import '../Styles/MainStyles/Main.css';
import Virus from '../Images/covid.jpg';


type CovidType = {
    general: string,
    recovery:number,
    deaths:string,
    date:string
};

const Coronavirus:React.FC =()=>{

    const countryId = useSelector<StateType,StateType['mainReducer']>(state => state.mainReducer);
    const [covid,setCovid] = useState<CovidType>({
        general: '',
        recovery:0,
        deaths:'',
        date:''
    });

    const getCoronavirus =async(countryCode:string)=>{

        //const coronavirusApi = `https://api.covid19api.com/dayone/country/${countryCode}`;
        const coronavirusApi = `https://api.covid19api.com/total/country/${countryCode}`;

        await axios.get(coronavirusApi)
        .then(response => {
            const lastUpdateCovid = response.data.pop();
            setCovid({
                general: lastUpdateCovid.Confirmed,
                recovery:lastUpdateCovid.Confirmed - lastUpdateCovid.Deaths,
                deaths:lastUpdateCovid.Deaths,
                date:lastUpdateCovid.Date.slice(0,-10)
            })
        })
        .catch(error => console.log(error))  
    };

    useEffect(()=>{
        getCoronavirus(countryId.countryCode);
    },[countryId.countryCode]);

    return(
        <>
            <section className='coronavirus'>
                <div className='coronavirus-el'>
                    <p>Coronavirus Daily</p>
                    <img src={require('../Images/coronavirus.png').default} alt=''/>
                </div>
                <div className='coronavirus-el'>
                    <div className='covid general'>
                            <i className="fa fa-medkit"></i>
                            <p>All infections</p>
                            <p>Date: {covid.date}</p>
                            <p><i className="fa fa-male"></i><br/>{covid.general}</p>
                    </div>
                    <div className='covid recovery'>
                            <i className="fa fa-heart"></i>
                            <p>Recovered</p>
                            <p>Date: {covid.date}</p>
                            <p><i className="fa fa-male"></i><br/>{covid.recovery}</p>
                    </div>
                    <div className='covid deaths'>
                            <i className="fa fa-cross"></i>
                            <p>All Deaths</p>
                            <p>Date: {covid.date}</p>
                            <p><i className="fa fa-male"></i><br/>{covid.deaths}</p>
                    </div>
                </div>
            </section>
        </>
    );
};

export default React.memo(Coronavirus);