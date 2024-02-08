'use client'
import React, {useState} from 'react';
import FileSelector from "@/components/Parsing/FileSelector/FileSelector";
import classes from "./FilePreview.module.scss";

const FilePreview = () => {
    const [scrollTop, setScrollTop] = useState(0);
    return (
        <div className={classes.container}>
            <FileSelector/>
            <hr className={classes.separatingLine}/>
            <div className={classes.table} onScroll={(event) => setScrollTop(event.currentTarget.scrollTop)}>
                <table>
                    <thead>
                    <tr>
                        <th>Value1</th>
                        <th>Value2</th>
                        <th>Value3</th>
                        <th>Value4</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th>Value1</th>
                        <th>Value2</th>
                    </tr>
                    <tr>
                        <th>Value1</th>
                        <th>Value2</th>
                        <th>Value3</th>
                        <th>Value4</th>
                    </tr>
                    <tr>
                        <th>Value1</th>
                        <th>Value2</th>
                        <th>Value3</th>
                        <th>Value4</th>
                    </tr>
                    </tbody>
                </table>
            </div>
        <button onClick={() => console.log(scrollTop)}>sssss</button>
        </div>
    );
};

export default FilePreview;