import '../Styles/HeaderStyles/Header.css';
import Logo from '../Images/logo.png';
import { useEffect, useState } from 'react';

const Header:React.FC =()=> {

    const [menu,setMenu] = useState<boolean>(true);
 
    const scrollToMilitary =()=>{
        const getMIlitary = document.querySelector('.military') as HTMLBodyElement;
        getMIlitary.scrollIntoView({behavior:'smooth',block:'start'});
    };

    const scrollToCovid =()=>{
        const getCovid = document.querySelector('.coronavirus') as HTMLBodyElement;
        getCovid.scrollIntoView({behavior:'smooth',block:'start'});
    };

    const scrollToGold =()=>{
        const getCovid = document.querySelector('.gold-reserves') as HTMLBodyElement;
        getCovid.scrollIntoView({behavior:'smooth',block:'start'});
    };

    const showMenu =()=>{
        setMenu(!menu);
    };

    useEffect(()=>{

        const width = window.innerWidth;

        if(width > 576){
            setMenu(true);
        }else{
            setMenu(false);
        };

        window.addEventListener('resize',()=>{
            
            const width = window.innerWidth;

            if(width > 576){
                setMenu(true);
            }else{
                setMenu(false);
            };
        });

    },[]);


    return ( 
        <>
            <header className='navbar'>
                <img src={Logo} alt=''/>
                {menu === true ? <div className='navbar-content'>
                    <p onClick={scrollToCovid}>Coronavirus</p>
                    <p onClick={scrollToMilitary}>military</p>
                    <p onClick={scrollToGold}>Reserves</p>
                </div> : null}
                <i className="fa fa-bars" onClick={showMenu}></i>
            </header>
        </>
     );
}

export default Header 