import type {fileSorterTarget, fileStatus, folderSorterTarget} from "@/types/fileSystem";

export const validFileExtensions  = ['csv', 'txt', 'sql', 'xlsx', 'zip', 'rar', '7z', 'tar']
export const fileStatusDisplayName:{[key in fileStatus]: string} = {
    uploading: 'Uploading',
    uploaded: 'Uploaded',
    unzipping: 'Unzipping',
    converting: 'Converting',
    ready_for_parsing: 'Ready for parsing',
    parsing: 'Parsing',
    normalizing: 'Normalizing'
}

export const allSorterTarget = {
    name: "Name",
    uploadDate: "Upload date",
    size: "Size",
    filesNumber: "Files number",
}

export const fileSorterTargets: {sorterTarget: fileSorterTarget, targetName: string}[] = [
    {sorterTarget: "name", targetName: "Name"},
    {sorterTarget: "uploadDate", targetName: "Upload date"},
    {sorterTarget: "size", targetName: "Size"},
]

export const folderSorterMethods: {sorterTarget: folderSorterTarget, targetName: string}[] = [
    {sorterTarget: "name", targetName: "Name"},
    {sorterTarget: "uploadDate", targetName: "Upload date"},
    {sorterTarget: "filesNumber", targetName: "Files number"},
]

