import React, {FC} from 'react';
import classes from "./UserCard.module.css";
interface IUserCard {
    nickname: string
}

const UserCard: FC<IUserCard> = ({nickname}) => {
    return (
        <div className={classes.userCardContainer}>
            <h1 className={classes.userNickname}>Вечер в хату, {nickname}</h1>
            <span className={`material-icons ${classes.verified}`}>
                verified
            </span>
        </div>
    );
};

export default UserCard;