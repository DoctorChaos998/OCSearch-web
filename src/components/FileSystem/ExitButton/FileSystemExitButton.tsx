import React from 'react';
import classes from "./FileSystemExitButton.module.scss";
import {useRouter} from "next/navigation";

const FileSystemExitButton = () => {
    const router = useRouter();

    return (
        <button onClick={() => router.push('/folders')} className={classes.goOutFromFolderButton}>
            <span className="material-icons">
                arrow_back
            </span>
        </button>
    );
};

export default FileSystemExitButton;