import React, {FC} from 'react';
import {searchOptions} from "@/entites/search/searchInput";


interface ISearchDropdownProps {
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
    value: string
}

const SearchDropdown: FC<ISearchDropdownProps> = ({onChange, value}) => {
    console.log(searchOptions)
    return (
        <div>
            <select value={value} onChange={onChange} disabled={false}>
                {searchOptions.map((searchDropdownValue) =>
                    <option value={searchDropdownValue.value}>{searchDropdownValue.name}</option>
                )}
            </select>
        </div>
    );
};

export default SearchDropdown;