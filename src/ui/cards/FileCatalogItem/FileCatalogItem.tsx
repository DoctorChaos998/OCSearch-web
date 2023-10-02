import React, {FC} from 'react';
import {IFileCatalogItem} from "@/entites/files/fileCatalogItem";
import classes from "./FileCatalogItem.module.css";
interface IFolderCardProps {
    onDoubleClickFolderCardHandler: (event: React.MouseEvent<HTMLDivElement>, type: string, id: number) => void
    onClick: (event: React.MouseEvent<HTMLDivElement>, id: number, index: number) => void
    entity: IFileCatalogItem
    index: number
}
const FileCatalogItem: FC<IFolderCardProps> = ({entity, onDoubleClickFolderCardHandler, onClick, index}) => {
    return (
        <div onDoubleClick={(event) => onDoubleClickFolderCardHandler(event, entity.type, entity.id)} className={`${classes.folderCardContainer} ${entity.isSelected? classes.folderCardContainerActive: ''}`} onClick={(event) => onClick(event, entity.id, index)}>
            {entity.type === "folder"?
                <span className={`material-icons ${classes.folderIcon}`}>
                    folder
                </span>:
                <span className={`material-icons ${classes.fileIcon}`}>
                    contact_page
                </span>}
            <p className={classes.FileCatalogItemName}>{entity.name}</p>
        </div>
    );
};

export default FileCatalogItem;