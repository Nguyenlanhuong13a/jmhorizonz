import { PrismaClient, ProductCategory } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { Pool } from '@neondatabase/serverless';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    throw new Error('DATABASE_URL is not defined');
}

const pool = new Pool({ connectionString });
const adapter = new PrismaNeon(pool);

const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('🌱 Starting database seed...');

    const products = [
        {
            name: 'MONOLITH SHELL G-01',
            slug: 'monolith-shell-g-01',
            price: 1250,
            category: ProductCategory.OUTERWEAR,
            description: 'A technical avant-garde shell designed for extreme atmospheric conditions. Features modular structural reinforcements and zero-compromise weather protection.',
            stockCount: 8,
            images: ['https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=2070&auto=format&fit=crop'],
            technicalSpecs: ['3-Layer GORE-TEX Pro', 'Laser-cut ventilation', 'Magnetic closures', 'Modular attachment points'],
            published: true,
        },
        {
            name: 'ARCHIVE CARGO PANTS',
            slug: 'archive-cargo-pants',
            price: 720,
            category: ProductCategory.BOTTOMS,
            description: 'Wide-leg technical trousers with adjustable hem geometry. Constructed from high-density technical nylon for maximum utility without compromising the brutalist silhouette.',
            stockCount: 15,
            images: ['https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=2080&auto=format&fit=crop'],
            technicalSpecs: ['Dryskin® technology', '8-Pocket modular layout', 'Taper-ready ankle zips', 'Water-resistant finish'],
            published: true,
        },
        {
            name: 'INFRARED OVERCOAT',
            slug: 'infrared-overcoat',
            price: 1850,
            category: ProductCategory.OUTERWEAR,
            description: 'The ultimate weather protection system. Full-length silhouette with multi-point adjustment and thermal regulation technology.',
            stockCount: 5,
            images: ['https://images.unsplash.com/photo-1539533377285-341270445dbd?q=80&w=1974&auto=format&fit=crop'],
            technicalSpecs: ['GORE-TEX Pro 70D', 'Fully taped seams', 'Thermal lining system', 'Adjustable cuffs'],
            published: true,
        },
        {
            name: 'QUANTUM BOOT TYPE-A',
            slug: 'quantum-boot-type-a',
            price: 950,
            category: ProductCategory.FOOTWEAR,
            description: 'Brutalist footwear designed for urban navigation. Features a Vibram® Megagrip sole and tactical mesh lining for maximum performance.',
            stockCount: 12,
            images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop'],
            technicalSpecs: ['Vibram® Megagrip Outsole', 'YKK Aquaguard Zippers', 'Tactical mesh lining', 'Quick-lace system'],
            published: true,
        },
        {
            name: 'NEURAL VEST V2',
            slug: 'neural-vest-v2',
            price: 680,
            category: ProductCategory.OUTERWEAR,
            description: 'Modular layering system with rapid-access storage and integrated hydration routing. Engineered for high-mobility environments.',
            stockCount: 18,
            images: ['https://images.unsplash.com/photo-1601008070239-c1737e1c9d91?q=80&w=1974&auto=format&fit=crop'],
            technicalSpecs: ['Laser-cut Molle system', 'Lightweight ripstop', 'Modular attachment points', 'Ventilation zones'],
            published: true,
        },
        {
            name: 'AXIS GLOVES [TOUCH]',
            slug: 'axis-gloves-touch',
            price: 320,
            category: ProductCategory.ACCESSORIES,
            description: 'Tactical gloves engineered for precision and screen compatibility. Zero-compromise design for high-velocity operations.',
            stockCount: 25,
            images: ['https://images.unsplash.com/photo-1549439602-43ebca2327af?q=80&w=2070&auto=format&fit=crop'],
            technicalSpecs: ['Leather palm reinforcement', 'Conductive fingertips', 'Touch-screen compatible', 'Reinforced knuckles'],
            published: true,
        },
        {
            name: 'HYPER-PACK 30L',
            slug: 'hyper-pack-30l',
            price: 550,
            category: ProductCategory.ACCESSORIES,
            description: 'Maximum capacity carry system with adaptive internal organization. Weather-sealed access and modular compression system.',
            stockCount: 20,
            images: ['https://images.unsplash.com/photo-1553062407-98eebec4c271?q=80&w=1974&auto=format&fit=crop'],
            technicalSpecs: ['X-Pac® VX21 fabric', 'Weather-sealed access', 'Modular compression', 'Hydration compatible'],
            published: true,
        },
        {
            name: 'VOID TROUSERS',
            slug: 'void-trousers',
            price: 720,
            category: ProductCategory.BOTTOMS,
            description: 'Minimalist wide-leg technical trousers with adjustable hem geometry. Designed for maximum range of motion and structural integrity.',
            stockCount: 10,
            images: ['https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1974&auto=format&fit=crop'],
            technicalSpecs: ['Dryskin® technology', 'Taper-ready ankle zips', 'Reinforced seams', '4-Way stretch'],
            published: true,
        },
    ];

    console.log(`📦 Seeding ${products.length} products...`);

    for (const product of products) {
        await prisma.product.upsert({
            where: { slug: product.slug },
            update: product,
            create: product,
        });
        console.log(`✅ Seeded: ${product.name}`);
    }

    console.log('✨ Seed completed successfully!');
}

main()
    .catch((e) => {
        console.error('❌ Seed failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
