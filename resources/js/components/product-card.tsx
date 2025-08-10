import { Product } from '@/types/store';

function ProductCard({ product }: { product: Product }) {
    return (
        <div className='flex flex-col gap-2 justify-end w-full h-full text-xl bg-amber-300 p-4 rounded-md'>
            <span>{ product.name }</span>
            <span>{ product.price.price }</span>
        </div>
    )
}

export { ProductCard }
