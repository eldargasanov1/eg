import { Sort } from '@/components/sort';
import { router } from '@inertiajs/react';
import { useCallback, useEffect, useState } from 'react';
import { StoreLayout } from '@/layouts/store-layout';
import { GroupMenu } from '@/components/group-menu';
import { ProductsList } from '@/components/products-list';

interface StoreProps {
    groups: Group[];
    products: PaginatedProducts;
}

interface Params {
    page: {
        currentPage: number;
        perPage: number;
    };
    sortBy: 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc';
}

function Store({ groups, products }: StoreProps) {
    const [page, setPage] = useState<Params.page>({
        currentPage: 1,
        perPage: 6,
    });
    const [sortBy, setSortBy] = useState<Params.sortBy>('price-asc');

    const reloadProducts = useCallback(() => {
        router.reload({
            only: ['products'],
            data: {
                page: page.currentPage,
                perPage: page.perPage,
                sortBy: sortBy,
            },
        });
    }, [page, sortBy]);

    useEffect(() => {
        reloadProducts();
    }, [page, sortBy, reloadProducts]);

    useEffect(() => {
        setPage(prev => ({ ...prev, currentPage: 1 }));
    }, [page.perPage, sortBy]);

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSortBy(event.target.value);
    };

    const handleCurrentPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setPage((prev) => ({ ...prev, currentPage: event.selected + 1 }));
    };

    const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setPage(prev => ({ ...prev, perPage: event.target.value }));
    };

    return (
        <div className="flex w-full max-w-[95%] mx-auto flex-col md:flex-row md:mx-none">
            <div className="w-full md:w-[35%] lg:w-3/12 rounded-tr-lg rounded-tl-lg bg-white p-6 pb-12 text-[13px] leading-[20px] shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] lg:rounded-tr-none lg:rounded-tl-lg lg:rounded-bl-lg lg:p-4 dark:bg-[#161615] dark:text-[#EDEDEC] dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d]">
                <GroupMenu groups={groups} />
            </div>
            <div className="flex flex-col gap-6 flex-1 rounded-br-lg rounded-bl-lg bg-white p-6 pb-12 text-[13px] leading-[20px] shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] lg:rounded-bl-none lg:rounded-tr-lg lg:rounded-br-lg lg:p-4 dark:bg-[#161615] dark:text-[#EDEDEC] dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d]">
                <Sort sortBy={sortBy} handleSortChange={handleSortChange} perPage={page.perPage} handlePerPageChange={handlePerPageChange} />
                <div className='flex-1'>
                    <ProductsList products={products} currentPage={page.currentPage} handleCurrentPageChange={handleCurrentPageChange} />
                </div>
            </div>
        </div>
    );
}

Store.layout = (page) => <StoreLayout children={page} />;

export default Store;
