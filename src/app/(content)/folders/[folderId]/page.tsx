'use client'
import React, {useEffect} from 'react';
import {useParams, useRouter} from "next/navigation";
import {loadingFileList} from "@/lib/features/fileSystemSlice/fileSystemActions";
import {fileSystemActions} from "@/lib/features/fileSystemSlice/fileSystemSlice";
import FileSystemLoader from "@/components/FileSystem/FileSystemLoader/FileSystemLoader";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import FileSystemItemsList from "@/components/FileSystem/ItemsList/FileSystemItemsList";

const Page = () => {
    const params: {folderId: string} = useParams();
    const dispatch = useAppDispatch();
    const status = useAppSelector(state => state.fileSystemReducer.status);
    const router = useRouter();

    useEffect(() => {
        dispatch(fileSystemActions.resetFilters());
        if(+params.folderId === +params.folderId){
            dispatch(loadingFileList(+params.folderId));
        }
        else{
            router.push('/folders');
        }
    }, []);

    useEffect(() => {
        if(status === 'error') router.push('/folders');
    }, [status]);


    return (
        (status==='loading'||status==='initial')?
            <FileSystemLoader/>
            :
            <FileSystemItemsList/>
    );
};

export default Page;