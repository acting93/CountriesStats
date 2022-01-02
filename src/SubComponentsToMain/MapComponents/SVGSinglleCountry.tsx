import React from "react";

type SVGAttributes = {
    fill:string | null
    stroke:string | null
    viewBox:string | null
    xmlns:string | null
    width:string | null
    height:string | null
};

interface AllProps {
    attr: SVGAttributes
    path: SVGPathElement[]
};
 
const SVGSingleCountry:React.FC<AllProps> = ({attr,path}:AllProps) =>{

    const svgPath = path.map(item => <path className='path' key={item.getAttribute('d')} name={`${item.getAttribute('name_en')}`}  d={`${item.getAttribute('d')}`}>
        <title className="path-title">{item.getAttribute('name_en') || item.getAttribute('title')}</title>
    </path>);

    return(
        <>
           <svg fill="#3498db" stroke="#ecf0f1" viewBox={`${attr.viewBox}`}  strokeWidth="1">
                {svgPath} 
           </svg>
        </>
    )
}
 
export default React.memo(SVGSingleCountry);