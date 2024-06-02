import {createSlice} from "@reduxjs/toolkit";
import {status} from "@/types/slices";

interface IParsingSlice{
    isActive: boolean
    preview: {
        status: status,
        files: string[],
        currentFile: string
    }
}
const initialState: IParsingSlice = {
    isActive: false,
    preview: {
        status: "initial",
        files: ['513.79525144640-79518407984.csv', '512.79525144640-79518407984.csv', '511.79525144640-79518407984.csv'],
        currentFile: '513.79525144640-79518407984.csv'
    }
}
const parsingSlice = createSlice({
    name: 'parsingSlice',
    initialState,
    reducers: {

    }
})

export const {actions: parsingActions, reducer: parsingReducer} = parsingSlice;