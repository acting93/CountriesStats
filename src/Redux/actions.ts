
interface CountryInfoInterface {
        co2:string,
        gniPerCapita:string,
        gni:string,
        gdpGrowth:string,
        inflation:string,
        exportIndex:string,
        importIndex:string,
        industry:string,
        militaryExpenditure:string,
        merchandiseTrade:string
};

//action that gets code of country from map 

export const GET_CODE_COUNTRY_TYPE =(countryCode:string)=>({
    type: 'GET_CODE_COUNTRY',
    countryCode
});

///action gets flag to global state

export const getFlag =(flag:string)=>({
    type:'GET_FLAG',
    flag
});

///action gets name to global state

export const CountryName =(name:string)=>({
    type:'COUNTRY_NAME',
    name
});

//action gets country informations o global state

export const CountryInfo =({co2,gniPerCapita,gni,gdpGrowth,inflation,exportIndex,importIndex,industry,militaryExpenditure,merchandiseTrade}:CountryInfoInterface)=>({
    type:'GET_COUNTRY_INFO',
    payload:{
        co2,
        gniPerCapita,
        gni,
        gdpGrowth,
        inflation,
        exportIndex,
        importIndex,
        industry,
        militaryExpenditure,
        merchandiseTrade,
    }
});

//action shows/hides choosen country

export const ShowCountryMap =(showCountry:boolean)=>({
    type:'SHOW_COUNTRY_MAP',
    showCountry
});