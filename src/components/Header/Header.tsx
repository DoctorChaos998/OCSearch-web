import React, {FC} from 'react';
import classes from "./Header.module.css";


const Header: FC = () => {
    return (
        <header className={classes.header}>
            <h2 className={classes.logo}>OCS</h2>
        </header>
    );
};

export default Header;