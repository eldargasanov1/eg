interface SortProps {
    sortBy: string;
    handleSortChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    perPage: number;
    handlePerPageChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

function Sort({ sortBy, handleSortChange, perPage, handlePerPageChange }: SortProps) {
    return (
        <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2">
                <label htmlFor="sort" className='font-semibold'>Сортировка:</label>
                <select
                    name="sort"
                    id="sort"
                    className="h-8 rounded-lg border-gray-300 px-2 text-sm leading-none shadow-sm transition duration-75 outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 focus:ring-inset dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-yellow-500"
                    defaultValue={sortBy}
                    onChange={handleSortChange}
                >
                    <option value="price-asc">Сначала недорогие</option>
                    <option value="price-desc">Сначала дорогие</option>
                    <option value="name-asc">А-z</option>
                    <option value="name-desc">z-А</option>
                </select>
            </div>
            <div>
                <label htmlFor="perPage" className='font-semibold'>Товаров на странице:</label>
                <select
                    name="perPage"
                    id="perPage"
                    className="h-8 rounded-lg border-gray-300 px-2 text-sm leading-none shadow-sm transition duration-75 outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 focus:ring-inset dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-yellow-500"
                    defaultValue={perPage}
                    onChange={handlePerPageChange}
                >
                    <option value="6">6</option>
                    <option value="12">12</option>
                    <option value="18">18</option>
                </select>
            </div>
        </div>
    );
}

export { Sort };
