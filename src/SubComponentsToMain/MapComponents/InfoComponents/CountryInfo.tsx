import React from "react";

interface CountryProps {
    capital: string,
    currency:string,
    language:string
};

const CountryInfo:React.FC<CountryProps> =({capital,currency,language})=>{

    return(
        <>
            <tr>
                <td>Capital</td>
                <td>{capital}</td>
            </tr>
            <tr>
                <td>Currency</td>
                <td>{currency}</td>
            </tr>
            <tr>
                <td>Language</td>
                <td>{language}</td>
            </tr>
        </>
    )

};

export default CountryInfo;
