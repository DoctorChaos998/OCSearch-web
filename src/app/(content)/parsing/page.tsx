import React from 'react';
import classes from "./parsing.module.scss";
import FilePreview from "@/components/Parsing/FilePreview/FilePreview";

const Page = () => {
    return (
        <section className={classes.container}>
            <FilePreview/>
        </section>
    );
};

export default Page;