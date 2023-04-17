import React,{Fragment} from 'react';
import classes from './HeaderComponent.module.css';
import tuLogo from '../../Sources/assets/tu_dresden_pic/tu-dresdenlogo.png';
const HeaderComponent = () =>{
    return (
        <Fragment>
            <header className={classes.header}>
            <img src={tuLogo} width="30" alt="Tu-Logo" 
            className={`d-inline-block align-middle mr-2 ${classes.logo}`}/>
                <b><h2 className={classes.headingText}>MATH GRASS</h2></b>
            </header>
        </Fragment>
    );
}

export default HeaderComponent;