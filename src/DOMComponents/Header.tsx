import '../Styles/HeaderStyles/Header.css';
import Logo from '../Images/logo.png';

const Header:React.FC =()=> {
    return ( 
        <>
            <header className='navbar'>
                <div className='navbar-content'>
                    <img src={Logo} alt=''/>
                </div>
            </header>
        </>
     );
}

export default Header 