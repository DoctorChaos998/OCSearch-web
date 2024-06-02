import React from 'react';
import classes from "./parsing.module.scss";
import FilePreview from "@/components/Parsing/FilePreview/FilePreview";
import TestDragAndDrop from "@/components/Parsing/TestDragAndDrop/TestDragAndDrop";

const Page = () => {
    return (
        <section className={classes.container}>
            <FilePreview/>
            <TestDragAndDrop/>
        </section>
    );
};

export default Page;