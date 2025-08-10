import { Sort } from '@/components/sort';
import { router } from '@inertiajs/react';
import { useCallback, useEffect, useState } from 'react';
import { StoreLayout } from '@/layouts/store-layout';
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

function Store({ products }: StoreProps) {
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
        <>
            <Sort sortBy={sortBy} handleSortChange={handleSortChange} perPage={page.perPage} handlePerPageChange={handlePerPageChange} />
            <div className='flex-1'>
                <ProductsList products={products} currentPage={page.currentPage} handleCurrentPageChange={handleCurrentPageChange} />
            </div>
        </>
    );
}

Store.layout = (page) => <StoreLayout children={page} groups={page.props.groups} />;

export default Store;
