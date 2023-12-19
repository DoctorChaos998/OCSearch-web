import React from 'react';
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
const SessionsSkeletonLoading = () => {
    return (
        <Skeleton style={{marginTop:12}} baseColor="#202020" highlightColor="#833ab4" height={116} width={550} borderRadius={40}></Skeleton>
    );
};

export default SessionsSkeletonLoading;