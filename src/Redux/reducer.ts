import {AllActions} from './actionTypes';

type StateTypes = {
    countryCode: string,
    flag:string,
    countryName:string,
    co2:string,
    gniPerCapita:string,
    gni:string,
    gdpGrowth:string,
    inflation:string,
    exportIndex:string,
    importIndex:string,
    industry:string,
    militaryExpenditure:string,
    merchandiseTrade:string,
    showCountry:boolean
};


const mainState:StateTypes = {
    countryCode: 'pl',
    flag:'',
    countryName:'',
    co2:'',
    gniPerCapita:'',
    gni:'',
    gdpGrowth:'',
    inflation:'',
    exportIndex:'',
    importIndex:'',
    industry:'',
    militaryExpenditure:'',
    merchandiseTrade:'',
    showCountry:false
};

const mainReducer =(state = mainState,action:AllActions)=>{
    switch(action.type){
        
        case 'GET_CODE_COUNTRY':
            return {
                ...state,
                countryCode: action.codeCountry
            }

        case 'GET_FLAG':
            return{
                ...state,
                flag:action.flag
            }
            
        case 'GET_COUNTRY_NAME':
            return{
                ...state,
                countryName:action.name
            }
        
        case 'GET_COUNTRY_INFO':
            return{
                ...state,
                co2:action.payload.co2,
                gniPerCapita:action.payload.gniPerCapita,
                gni:action.payload.gni,
                gdpGrowth:action.payload.gdpGrowth,
                inflation:action.payload.inflation,
                exportIndex:action.payload.exportIndex,
                importIndex:action.payload.importIndex,
                industry:action.payload.industry,
                militaryExpenditure:action.payload.militaryExpenditure,
                merchandiseTrade:action.payload.merchandiseTrade
            }

        case 'SHOW_COUNTRY_MAP':
            return{
                ...state,
                showCountry: action.showCountry
            }
        
        default: return state
    }
};

export default mainReducer;