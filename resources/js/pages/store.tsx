import { Head, router } from '@inertiajs/react';
import { useState, useEffect, useCallback } from 'react';

interface StoreProps {
    groups: Group[];
    products: PaginatedProducts;
}

interface Params {
    page: {
        currentPage: number;
        perPage: number;
    },
    sortBy: 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc'
}

export default function Store({ groups, products }: StoreProps) {
    const [page, setPage] = useState<Params.page>({
        currentPage: 1,
        perPage: 6,
    });
    const [sortBy, setSortBy] = useState<Params.sortBy>('price-asc');

    const reloadProducts = useCallback(
        () => {
            router.reload({
                only: [
                    'products',
                ],
                data: {
                    page: page.currentPage,
                    perPage: page.perPage,
                    sortBy: sortBy,
                }
            });
        }, [page, sortBy]
    )

    useEffect(() => {
        reloadProducts();
    }, [page, sortBy, reloadProducts]);

    const handleSortByChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSortBy(event.target.value);
    }

    const handlePageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setPage((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    }

    return (
        <>
            <Head title="Store">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <main className="flex w-full max-w-[335px] flex-col-reverse lg:max-w-4xl lg:flex-row">
                        <div className="flex-1 rounded-br-lg rounded-bl-lg bg-white p-6 pb-12 text-[13px] leading-[20px] shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] lg:rounded-tl-lg lg:rounded-br-none lg:p-20 dark:bg-[#161615] dark:text-[#EDEDEC] dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d]">
                            <ul>
                                {groups.map((group) => (
                                    <li key={group.id}>{group.name}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="relative -mb-px aspect-[335/376] w-full shrink-0 overflow-hidden rounded-t-lg bg-[#fff2f2] lg:mb-0 lg:-ml-px lg:aspect-auto lg:w-[438px] lg:rounded-t-none lg:rounded-r-lg dark:bg-[#1D0002]">
                            <div className='flex flex-col gap-2'>
                                <div className='flex items-center gap-2'>
                                    <div>
                                        <label htmlFor="sort">Сортировка:</label>
                                        <select name="sort" id="sort" defaultValue={sortBy} onChange={handleSortByChange}>
                                            <option value="price-asc">Сначала недорогие</option>
                                            <option value="price-desc">Сначала дорогие</option>
                                            <option value="name-asc">А-z</option>
                                            <option value="name-desc">z-А</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <div>
                                        <label htmlFor="perPage">Товаров на странице:</label>
                                        <select name="perPage" id="perPage" defaultValue={page.perPage} onChange={handlePageChange}>
                                            <option value="6">6</option>
                                            <option value="12">12</option>
                                            <option value="18">18</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="currentPage">Текущая страница:</label>
                                        <select name="currentPage" id="currentPage" defaultValue={page.currentPage} onChange={handlePageChange}>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <ul>
                                {products.data.map((product) => (
                                    <li key={product.id}>
                                        {product.name} - {product.price.price}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}
