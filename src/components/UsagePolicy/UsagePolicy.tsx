'use client'
import React, {useEffect, useState} from 'react';
import classes from "./UsagePolicy.module.scss";

const UsagePolicy = () => {
    const [usagePolicyIsVisible, setUsagePolicyIsVisible] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            if(!localStorage.getItem('usagePolicy')){
                setUsagePolicyIsVisible(true);
            }
        }, 10000);
    }, []);

    return (
        usagePolicyIsVisible&&
        <div className={classes.wrapper}>
            <div className={classes.container}>
                I accept the policy of using this site and consent to the use of all my personal data such as phone number, email, passwords, etc.
                <button className={classes.button} onClick={() => {
                    localStorage.setItem('usagePolicy', "true");
                    setUsagePolicyIsVisible(false);
                }}>
                    I agree
                    <span className="material-icons">
                        done
                    </span>
                </button>
            </div>
        </div>
    );
};

export default UsagePolicy;