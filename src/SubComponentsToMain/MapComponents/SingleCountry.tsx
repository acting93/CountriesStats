import React, {lazy, Suspense, useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { StateType } from "../../Redux/store";
import { SHOW_COUNTRY_MAP } from "../../Redux/actionTypes";
import SVGSingleCountry from "./SVGSinglleCountry";
import axios from "axios";

type SVGAttributes = {
    fill:string | null,
    stroke:string | null,
    viewBox:string | null,
    xmlns:string | null,
    width:string | null,
    height:string | null
};


const SingleCountry:React.FC =()=>{

    const countryISO = useSelector<StateType,StateType['mainReducer']>(state => state.mainReducer);
    const dispatch = useDispatch();

    const [svgAttr,setSvgAttr] = useState<SVGAttributes>({
        fill:'',
        stroke:'',
        viewBox:'',
        xmlns:'',
        width:'',
        height:''
    });

    const [pathElements,setPathElements] = useState<SVGPathElement[]>([]);

    const showEurope =()=>{
        dispatch<SHOW_COUNTRY_MAP>({
            type:'SHOW_COUNTRY_MAP',
            showCountry:true
        });
    };

    useEffect(()=>{

        const mapImported = require(`../../Maps/${countryISO.countryCode}.svg`).default;

        axios.get(mapImported)

        .then(response => {
            
            const xmlParser = new DOMParser();
            const country = xmlParser.parseFromString(response.data,"image/svg+xml").querySelectorAll('svg')[0];
            const path = xmlParser.parseFromString(response.data,"image/svg+xml").querySelectorAll('path');

            setPathElements(Array.from(path));

            setSvgAttr({
                ...svgAttr,
                fill:country.getAttribute('fill'),
                stroke:country.getAttribute('stroke'),
                viewBox:country.getAttribute('viewBox'),
                xmlns:country.getAttribute('xmlns'),
                width:country.getAttribute('width'),
                height:country.getAttribute('height')
            });
        })
        .catch(error => console.log(error))
    },[countryISO.countryCode])

    return(
        <>
            <div className='map-country map'>
                <button onClick={showEurope} id='show-map'>Show Europe</button>
                <SVGSingleCountry
                    attr={svgAttr}
                    path={pathElements}
                />
            </div>
        </>
    )
};

export default React.memo(SingleCountry);