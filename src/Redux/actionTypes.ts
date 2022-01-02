//type of action that gets code of country 

export interface GET_CODE_COUNTRY_TYPE {
    type:'GET_CODE_COUNTRY',
    codeCountry: string
};

export interface GET_FLAG {
    type:'GET_FLAG',
    flag:string
};

export interface GET_COUNTRY_NAME {
    type:'GET_COUNTRY_NAME',
    name:string
};

export interface GET_COUNTRY_INFO {
    type:'GET_COUNTRY_INFO',
    payload:{
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
};

export interface SHOW_COUNTRY_MAP {
    type:'SHOW_COUNTRY_MAP',
    showCountry:boolean
};


export type AllActions = GET_CODE_COUNTRY_TYPE | GET_FLAG | GET_COUNTRY_NAME | GET_COUNTRY_INFO | SHOW_COUNTRY_MAP;
