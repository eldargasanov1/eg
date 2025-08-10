import { Pagination } from '@/components/pagination';
import { PaginatedProducts } from '@/types/store';
import { ProductCard } from '@/components/product-card';

interface ProductsListProps {
    products: PaginatedProducts;
    currentPage: number;
    handleCurrentPageChange: (page: number) => void;
}

function ProductsList({ products, currentPage, handleCurrentPageChange }: ProductsListProps) {
    return (
        <div className="flex h-full w-full flex-col gap-4">
            <ul className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.data.map((product) => (
                    <li key={product.id} className='h-[280px] sm:h-[250px] md:h-[200px] lg:h-[250px]    '>
                        <ProductCard product={product} />
                    </li>
                ))}
            </ul>
            <div className='mx-auto'>
                <Pagination
                    pageCount={products.last_page}
                    currentPage={currentPage}
                    handleCurrentPageChange={handleCurrentPageChange}
                />
            </div>
        </div>
    );
}

export { ProductsList };
