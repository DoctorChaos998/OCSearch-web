import {useAppSelector} from "@/lib/hooks";
import {useMemo} from "react";
import {
    sortingFileSystemItemsByFilesNumberAscending,
    sortingFileSystemItemsByNameAscending,
    sortingFileSystemItemsBySizeAscending,
    sortingFileSystemItemsByUploadDateAscending
} from "@/helpers/fileSystemHelper";
import {IFile, IFolder} from "@/types/fileSystem";

export const useFilteredAndSortedItems = () => {
    const fileSystemItems = useAppSelector(state => state.fileSystemReducer.fileSystemItems);
    const sortingType = useAppSelector(state => state.fileSystemReducer.sorter.target);
    const sortingOrder = useAppSelector(state => state.fileSystemReducer.sorter.order);
    const searchQuery = useAppSelector(state => state.fileSystemReducer.searchQuery);

    const filteredItems = useMemo(() => {
        return fileSystemItems.filter((value) => value.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }, [searchQuery, fileSystemItems.length]);

    return useMemo(() => {
        let resultArray: (IFolder | IFile)[] = []
        switch (sortingType) {
            case 'name': {
                resultArray = [...filteredItems].sort(sortingFileSystemItemsByNameAscending);
                break;
            }
            case 'uploadDate': {
                resultArray = [...filteredItems].sort(sortingFileSystemItemsByUploadDateAscending);
                break;
            }
            case 'filesNumber': {
                resultArray = [...filteredItems].sort(sortingFileSystemItemsByFilesNumberAscending);
                break;
            }
            case 'size': {
                resultArray = [...filteredItems].sort(sortingFileSystemItemsBySizeAscending);
                break;
            }
        }
        return {
            sortedAndFilteredItemIds: sortingOrder === 'byAscending' ? resultArray.map(item => item.id) : resultArray.map(item => item.id).reverse(),
            sortedAndFilteredItems: sortingOrder === 'byAscending' ? resultArray : resultArray.reverse()
        };
    }, [sortingOrder, sortingType, filteredItems]);
}