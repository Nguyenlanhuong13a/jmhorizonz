export type Category = 'OUTERWEAR' | 'BOTTOMS' | 'FOOTWEAR' | 'ACCESSORIES' | 'All';

export interface Product {
    id: string;
    slug: string;
    name: string;
    price: number;
    category: Category;
    description: string;
    technicalSpecs: string[];
    images: string[];
    stockCount: number;
    published: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface CartItem extends Product {
    quantity: number;
}

export interface NavLink {
    label: string;
    href: string;
}

export interface SocialHandle {
    platform: string;
    handle: string;
    url: string;
}
