import { useState, useEffect } from 'react';
import { getProducts } from '@/lib/actions/product';
import { Product, Category } from '@/types';

export const useProducts = (options?: {
    category?: Category | 'All';
    page?: number;
    limit?: number;
    homepage?: boolean;
}) => {
    const [data, setData] = useState<Product[]>([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItems = async () => {
            setLoading(true);
            const { products, total: count } = await getProducts({
                category: options?.category,
                limit: options?.limit || (options?.homepage ? 4 : 12),
                page: options?.page,
                homepage: options?.homepage,
            });
            setData(products);
            setTotal(count);
            setLoading(false);
        };

        fetchItems();
    }, [options?.category, options?.limit, options?.page, options?.homepage]);

    return { products: data, total, loading };
};

export const useProduct = (id: string) => {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const { products } = await getProducts({ limit: 1000, publishedOnly: false });
                const found = products.find(p => p.id === id);
                setProduct(found || null);
            } catch (_err) {
                setProduct(null);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchProduct();
    }, [id]);

    return { product, loading };
};
