import { StoreLayout } from '@/layouts/store-layout';
import { Product } from '@/types/store';

interface StoreProps {
    groups: Group[];
    product: Product;
}

function StoreDetail({ product }: StoreProps) {
    return (
        <>
            <span className='text-6xl'>{product.name}</span>
            <p className='text-4xl'>Цена: {Math.round(product.price.price)} руб.</p>
        </>
    );
}

StoreDetail.layout = (page) => <StoreLayout children={page} groups={page.props.groups} />;

export default StoreDetail;
