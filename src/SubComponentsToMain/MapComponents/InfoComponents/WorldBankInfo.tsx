import React from "react";


interface WorldBankInfoProps {
    population:string,
    populationSqKm:string,
    forestArea:string,
    area:string,
    gdp:string,
    gdpPPC:string
};
 
const WorldBankInfo:React.FC<WorldBankInfoProps> = ({population,area,gdp,gdpPPC,populationSqKm,forestArea}) => {

    return ( 
        <>
            <tr>
                <td>Population</td>
                <td>{population}</td>
            </tr>
            <tr>
                <td>Population km<sup>2</sup></td>
                <td>{populationSqKm}</td>
            </tr>
            <tr>
                <td>Area</td>
                <td>{area} km<sup>2</sup></td>
            </tr>
            <tr>
                <td>Forest Area</td>
                <td>{forestArea} km<sup>2</sup></td>
            </tr>
            <tr>
                <td>GDP</td>
                <td>{gdp} USD (2020)</td>
            </tr>
            <tr>
                <td>GDP per Capita</td>
                <td>{gdpPPC} USD (2020)</td>
            </tr>
        </>
     );
};
 
export default WorldBankInfo;