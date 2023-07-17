import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ISearchField, searchDropdownValues} from "@/entites/search/searchInput";


interface ISearchState {
    nextId: number,
    searchFields: ISearchField[]
}

const initialState: ISearchState = {
    nextId: 1,
    searchFields: [{id: 0, searchStringValue: '', searchDropdown: { isActive: false, currentOption: 'NONE'}}]
}

export const searchSlice = createSlice({
    name: "SearchSlice",
    initialState,
    reducers: {
        changeSearchInput(state, action:PayloadAction<ISearchField>){
            state.searchFields = state.searchFields.map((searchField) => {if (searchField.id === action.payload.id) {
                return action.payload;
            } else {
                return searchField;
            }})
        },
        changeSearchDropdown(state, action:PayloadAction<ISearchField>){
            state.searchFields = state.searchFields.map((searchField) => {if (searchField.id === action.payload.id) {
                return action.payload;
            } else {
                return searchField;
            }})
        },
        addSearchLine(state) {
            state.searchFields.push({id: state.nextId++, searchStringValue: '', searchDropdown: { isActive: false, currentOption: 'NONE'}})
        }
    }

})

export default searchSlice.reducer