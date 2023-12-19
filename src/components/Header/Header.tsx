import React, {FC} from 'react';
import classes from "./Header.module.scss";


const Header: FC = () => {
    return (
        <header className={classes.header}>
            <h2 className={classes.headerLogo}>OCSearch</h2>
        </header>
    );
};

export default Header;