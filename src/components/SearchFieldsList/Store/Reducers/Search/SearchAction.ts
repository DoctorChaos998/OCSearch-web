import {ISearchField} from "@/entites/search/searchInput";
import {AppDispatch} from "@/store";
import {searchSlice} from "@/components/SearchFieldsList/Store/Reducers/Search/SearchSlise";


export const changeSearchString = (searchField: ISearchField) => (dispatch: AppDispatch) => {
    dispatch(searchSlice.actions.changeSearchInput(searchField))
}

export const changeSearchDropdown = (searchField: ISearchField) => (dispatch: AppDispatch) => {
    console.log(searchField)
    dispatch(searchSlice.actions.changeSearchDropdown(searchField))
}

export const addSearchLine = () => (dispatch: AppDispatch) => {
    dispatch(searchSlice.actions.addSearchLine())
}