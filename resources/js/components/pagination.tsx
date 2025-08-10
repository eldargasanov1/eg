import { PaginatedProducts } from '@/types/store';
import ReactPaginate from 'react-paginate';
import { cn } from '@/lib/utils';

interface PaginationProps {
    pageCount: PaginatedProducts.total;
    currentPage: number;
    handleCurrentPageChange: (currentPage: number) => void;
}

function Pagination({ pageCount, currentPage, handleCurrentPageChange }: PaginationProps) {
    const baseLinkClasses = 'cursor-pointer select-none flex items-center justify-center font-medium px-1.5 w-full h-full rounded-md outline-none ';
    const nonActiveLinkClasses = 'hover:bg-gray-500/5 focus:bg-yellow-500/10 focus:ring-2 focus:ring-yellow-500 dark:hover:bg-gray-400/5 transition ';
    const activeLinkClasses = 'transition text-yellow-600 filament-tables-pagination-item-active focus:underline bg-yellow-500/10 ring-2 ring-yellow-500';

    return (
        <>
            <ReactPaginate
                containerClassName="flex items-center text-sm text-gray-500 divide-x rtl:divide-x-reverse divide-gray-300 dark:text-gray-400 dark:divide-gray-600"
                pageCount={pageCount == 1 ? 0 : pageCount}
                onPageChange={handleCurrentPageChange}
                forcePage={currentPage - 1}
                renderOnZeroPageCount={null}
                pageClassName='min-w-[2rem] h-8'
                breakClassName='min-w-[2rem] h-8'
                previousClassName='min-w-[2rem] h-8'
                nextClassName='min-w-[2rem] h-8'
                pageLinkClassName={cn(baseLinkClasses, nonActiveLinkClasses, 'focus:text-yellow-600')}
                activeLinkClassName={cn(baseLinkClasses, activeLinkClasses, 'transition text-yellow-600 filament-tables-pagination-item-active focus:underline bg-yellow-500/10 ring-2 ring-yellow-500')}
                previousLinkClassName={cn(baseLinkClasses, nonActiveLinkClasses, 'text-yellow-600')}
                nextLinkClassName={cn(baseLinkClasses, nonActiveLinkClasses, 'text-yellow-600')}
                breakLinkClassName={cn(baseLinkClasses, '!cursor-default !px-2')}
                disabledLinkClassName='opacity-50 !cursor-not-allowed'
                pageRangeDisplayed={3}
            />
        </>
    );
}

export { Pagination };
