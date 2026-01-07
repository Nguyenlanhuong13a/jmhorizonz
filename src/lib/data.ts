import { Product } from '@/types';

// NO MOCK DATA ALLOWED - ALL DATA FETCHED FROM DB
// THIS FILE REMAINS FOR TYPES AND HELPER LOGIC ONLY

export const getHomepageProducts = async (_limit: number = 4): Promise<Product[]> => {
    // This will be handled by Server Actions or direct DB calls in components
    return [];
};

export const getPaginatedProducts = async (
    _page: number = 1,
    _limit: number = 12,
    _category?: string
): Promise<{ products: Product[]; total: number }> => {
    // This will be handled by Server Actions or direct DB calls in components
    return { products: [], total: 0 };
};
