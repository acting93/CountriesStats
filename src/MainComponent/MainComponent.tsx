import * as React from 'react';
import Header from '../DOMComponents/Header';
import Main from '../DOMComponents/Main';
import '../Styles/WrapperStyles/Wrapper.css';

//Main component contains ModelDOm of APP
//Styles to this component is in App.css

const MainComponent:React.FC =()=> {

    return(
        <>
            <div className='wrapper'>
                <Header />
                <Main />
            </div>
        </>
    )
};

export default MainComponent;