import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { StateType } from "../Redux/store";
import '../Styles/MainStyles/Main.css';

type MilitaryTypes = {
    expenditureGdp:string,
    year:string,
    militaryExpenditure:string,
    militaryPersonnel:string,
    armsExport: string,
    armsExportYear:string,
    armsImport:string,
    armsImportYear:string,
};

const Military:React.FC =()=>{
    
    const countryId = useSelector<StateType,StateType['mainReducer']>(state => state.mainReducer);    
    const [militaryStats,setMilitaryStats] = useState<MilitaryTypes>({
        expenditureGdp:'',
        year:'',
        militaryExpenditure:'',
        militaryPersonnel:'',
        armsExport: '',
        armsExportYear:'',
        armsImport:'',
        armsImportYear:''
    });

    const getMilitaryInfo =async(countryCode:string)=>{
        
        const expenditureGdpApi = `https://api.worldbank.org/v2/country/${countryCode}/indicator/MS.MIL.XPND.GD.ZS?format=json`; //A percentage of expenditure military % of GDP 
        const militaryExpenditureApi = `https://api.worldbank.org/v2/country/${countryCode}/indicator/MS.MIL.XPND.CD?format=json`; // A military expenditure per country
        const militaryPersonnelApi = `https://api.worldbank.org/v2/country/${countryCode}/indicator/MS.MIL.TOTL.P1?format=json`; // A military personnel per country
        const armyExportApi = `https://api.worldbank.org/v2/country/${countryCode}/indicator/MS.MIL.XPRT.KD?format=json`; // Army export equipement USD
        const armyImportApi = `https://api.worldbank.org/v2/country/${countryCode}/indicator/MS.MIL.MPRT.KD?format=json`; // Army import equipement USD

        const getExpenditureGdp = axios(expenditureGdpApi);
        const getMilitaryExpenditure = axios(militaryExpenditureApi);
        const getMilitaryPersonnel = axios(militaryPersonnelApi);
        const getArmyExport = axios(armyExportApi);
        const getArmyImport = axios(armyImportApi);

        const allMilitaryAPi = [getExpenditureGdp,getMilitaryExpenditure,getMilitaryPersonnel,getArmyExport,getArmyImport];

        await axios.all(allMilitaryAPi).then(

              axios.spread((...allData)=>{
                const expenditureGdp = allData[0].data[1][0].value.toFixed(2);
                const expenditureGdpDate = allData[0].data[1][0].date
                const militaryExpenditure = new Intl.NumberFormat('pl-Pl').format(allData[1].data[1][0].value.toFixed(2));
                const militaryPersonnel = new Intl.NumberFormat('pl-Pl').format(allData[2].data[1][2].value);
                const armyExport = new Intl.NumberFormat('pl-Pl').format(allData[3].data[1][0].value);
                const armyExportDate = allData[3].data[1][0].date;
                const armyImport = new Intl.NumberFormat('pl-Pl').format(allData[4].data[1][0].value);
                const armyImportDate = allData[4].data[1][0].date;
                
                setMilitaryStats({
                    expenditureGdp:expenditureGdp,
                    year:expenditureGdpDate,
                    militaryExpenditure:militaryExpenditure,
                    militaryPersonnel:militaryPersonnel,
                    armsExport: armyExport,
                    armsExportYear:armyExportDate,
                    armsImport:armyImport,
                    armsImportYear:armyImportDate
                })
            })
        )
        .catch(error => console.log(error))
    };


    useEffect(()=>{
        getMilitaryInfo(countryId.countryCode);
    },[countryId]);


    return(
        <>
            <section className='military'>
                <div className='military-title'>
                    <p>Military</p>
                </div>
                <div className='military-content'>
                    <div className='military-el'>
                        <table>
                            <tbody>
                            <tr>
                                <td>Military Expenditure <br/> {militaryStats.year}</td>
                                <td>{militaryStats.expenditureGdp} % GDP</td>
                                <td>{militaryStats.militaryExpenditure} USD</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className='military-el'>
                        <table>
                            <tbody>
                            <tr>
                                <td>Active personnel <br/>  2018</td>
                                <td>{militaryStats.militaryPersonnel}</td>
                                <td>Arms Export - {militaryStats.armsExportYear}</td>
                                <td>{militaryStats.armsExport}</td>
                                <td>Arms Import - {militaryStats.armsImportYear}</td>
                                <td>{militaryStats.armsImport}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </>
    );

};

export default React.memo(Military);
