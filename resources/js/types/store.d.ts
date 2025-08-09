interface Group {
    id: number;
    parent_id: number;
    name: string;
    products_count: number;
    tree_products_count: number;
    all_subgroups: Group[] | [];
    created_at: string;
    updated_at: string;
}

interface Product {
    id: number;
    group_id: number;
    name: string;
    price: Price;
    created_at: string;
    updated_at: string;
}

interface Price {
    id: number;
    product_id: number;
    price: number;
    created_at: string;
    updated_at: string;
}

interface PaginatedProducts {
    data: Product[];
    links: PaginateLink[];
    current_page: number;
    per_page: number;
    from: number;
    to: number;
    first_page_url: string;
    last_page_url: string;
    next_page_url: string | null;
    prev_page_url: string | null;
    path: string;
    total: number;
    last_page: number;
}

interface PaginateLink {
    url: string | null;
    label: number | '&laquo; Previous' | 'Next &raquo';
    active: boolean;
}
