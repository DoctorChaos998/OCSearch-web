import React, {FC} from 'react';
import classes from "./FolderCard.module.css";
import {IFileOrFolder} from "@/entites/files/filesAndFolders";
interface FolderCardProps {
    onDoubleClick: (event: React.MouseEvent<HTMLDivElement>, id: string, path?: string) => void
    onClick: (event: React.MouseEvent<HTMLDivElement>, id: string) => void
    entity: IFileOrFolder
}
const FolderCard: FC<FolderCardProps> = ({entity, onDoubleClick, onClick}) => {
    return (
        <div onDoubleClick={(event) => onDoubleClick(event, entity.id, entity.path)} className={`${classes.folderCardContainer} ${entity.isActive? classes.folderCardContainerActive: ''}`} onClick={(event) => onClick(event, entity.id)}>
            {entity.type === "folder"?
                <span className={`material-icons ${classes.folderIcon}`}>
                    folder
                </span>:
                <span className="material-icons">
                    note
                </span>}
            <p className={classes.folderName}>{entity.name}</p>
        </div>
    );
};

export default FolderCard;