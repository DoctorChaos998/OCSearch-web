import React, {FC} from 'react';
import {searchOptions} from "@/entites/search/searchInput";


interface ISearchDropdownProps {
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
    value: string
    isActive: boolean
}

const SearchDropdown: FC<ISearchDropdownProps> = ({onChange, value, isActive}) => {
    return (
        <div>
            <select value={value} onChange={onChange} disabled={!isActive}>
                {searchOptions.map((searchDropdownValue) =>
                    <option value={searchDropdownValue.value} key={searchDropdownValue.value}>{searchDropdownValue.name}</option>
                )}
            </select>
        </div>
    );
};

export default SearchDropdown;