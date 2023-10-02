import React, {FC} from 'react';
import classes from "./UserCard.module.css";
interface IUserCardProps {
    userCardNickname: string
}

const UserCard: FC<IUserCardProps> = ({userCardNickname}) => {
    return (
        <div className={classes.userCardContainer}>
            <h1 className={classes.userCardNickname}>Вечер в хату, {userCardNickname}</h1>
            <span className={`material-icons ${classes.userCardVerifiedIcon}`}>
                verified
            </span>
        </div>
    );
};

export default UserCard;