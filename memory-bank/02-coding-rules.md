# Coding Rules and Standards - take inference from it for coding-rules.

## Project-Specific Guidelines (Critical for Development)

### 1. React Component Standards

#### Functional Components (Required)
Always use functional components with hooks instead of class components.

```tsx
// ✅ CORRECT - Functional component with TypeScript
const ProductCard = ({ title, price, onAddToCart }: ProductCardProps) => {
    return (
        <div className="p-4 border rounded-lg">
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-green-600">${price}</p>
            <Button onClick={onAddToCart}>Add to Cart</Button>
        </div>
    );
};

// ❌ INCORRECT - Class components not allowed
class ProductCard extends React.Component {
    render() {
        return <div>Product Content</div>;
    }
}
```

#### Component Naming and Export
- Use PascalCase for component names
- Use default exports for components
- File names should match component names

```tsx
// ✅ CORRECT - ProductCard.tsx
const ProductCard = () => {
    return <div>Content</div>;
};

export default ProductCard;
```

### 2. HeroUI Integration (Project Requirement)

#### Component Usage
- **Always use HeroUI components** for UI elements when available
- Follow HeroUI component documentation: `04-heroui.md` has all documentation links
- Use HeroUI design system patterns consistently

```tsx
// ✅ CORRECT - Using HeroUI components
import { Button, Card, CardBody, Input } from '@heroui/react';

const LoginForm = () => {
    return (
        <Card className="max-w-md mx-auto">
            <CardBody className="space-y-4">
                <Input
                    type="email"
                    label="Email"
                    placeholder="Enter your email"
                    variant="bordered"
                />
                <Button color="primary" fullWidth>
                    Sign In
                </Button>
            </CardBody>
        </Card>
    );
};

// ❌ INCORRECT - Using generic HTML when HeroUI exists
const LoginForm = () => {
    return (
        <div className="border rounded p-4">
            <input type="email" placeholder="Email" />
            <button className="bg-blue-500 text-white px-4 py-2">
                Sign In
            </button>
        </div>
    );
};
```

#### TailwindCSS Integration
- Use TailwindCSS utility classes for styling
- Follow mobile-first responsive design approach
- Maintain consistent spacing and design tokens

```tsx
// ✅ CORRECT - TailwindCSS with HeroUI
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardBody>
                <Button variant="flat" size="sm">
                    Action
                </Button>
            </CardBody>
        </Card>
    </div>
</div>
```

### 3. State Management Patterns

#### Zustand (Global State)
- Use Zustand for global state management
- Create typed stores with clear action patterns
- Keep stores focused and domain-specific

```tsx
// ✅ CORRECT - Zustand store pattern
import { create } from 'zustand';

interface ProductStore {
    products: Product[];
    loading: boolean;
    error: string | null;
    fetchProducts: () => Promise<void>;
    addProduct: (product: Product) => void;
    clearError: () => void;
}

export const useProductStore = create<ProductStore>((set, get) => ({
    products: [],
    loading: false,
    error: null,

    fetchProducts: async () => {
        set({ loading: true, error: null });
        try {
            const products = await getProducts();
            set({ products, loading: false });
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    addProduct: (product) => {
        set((state) => ({
            products: [...state.products, product]
        }));
    },

    clearError: () => set({ error: null })
}));
```

#### Local State (Component-Specific)
- Use useState for component-specific state
- Prefer controlled components for form inputs

```tsx
// ✅ CORRECT - Local state for UI-specific data
const ProductFilter = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="space-y-4">
            <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
                label="Category"
            >
                <SelectItem key="all" value="all">All</SelectItem>
                <SelectItem key="electronics" value="electronics">Electronics</SelectItem>
            </Select>

            <Input
                value={searchTerm}
                onValueChange={setSearchTerm}
                placeholder="Search products..."
            />
        </div>
    );
};
```

### 4. Form Handling Standards

#### React Hook Form + Zod (Project Standard)
- Use React Hook Form for all form management
- Implement Zod schemas for validation
- Follow consistent form patterns

```tsx
// ✅ CORRECT - React Hook Form with Zod validation
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const productSchema = z.object({
    name: z.string().min(1, "Product name is required").max(100),
    price: z.number().min(0.01, "Price must be greater than 0"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    category: z.enum(['electronics', 'clothing', 'books'])
});

type ProductFormData = z.infer<typeof productSchema>;

const ProductForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
    } = useForm<ProductFormData>({
        resolver: zodResolver(productSchema)
    });

    const onSubmit = async (data: ProductFormData) => {
        try {
            await createProduct(data);
            showToast.success('Product created successfully');
            reset();
        } catch (error) {
            showToast.error('Failed to create product');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
                {...register('name')}
                label="Product Name"
                isInvalid={!!errors.name}
                errorMessage={errors.name?.message}
            />

            <Button type="submit" isLoading={isSubmitting} color="primary">
                Create Product
            </Button>
        </form>
    );
};
```

## Code Organization & Standards

### 1. File and Folder Naming Conventions

#### File Naming
- **Components**: PascalCase (e.g., `ProductCard.tsx`, `UserProfile.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useLocalStorage.ts`, `useProductData.ts`)
- **Services**: camelCase with `.service.ts` suffix (e.g., `api.service.ts`, `auth.service.ts`)
- **Stores**: camelCase with `.store.ts` suffix (e.g., `product.store.ts`, `user.store.ts`)
- **Types**: camelCase with `.ts` suffix (e.g., `product.ts`, `api.ts`)
- **Utils**: camelCase with `.ts` suffix (e.g., `formatDate.ts`, `validation.ts`)

#### Folder Structure
```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Generic UI components
│   ├── forms/          # Form-specific components
│   └── layout/         # Layout components
├── pages/              # Page components (route-level)
├── hooks/              # Custom React hooks
├── services/           # API and external services
├── stores/             # Zustand state stores
├── types/              # TypeScript type definitions
├── utils/              # Helper functions
└── assets/             # Static assets
```

### 2. Import and Export Guidelines

#### Import Order and Organization
```tsx
// ✅ CORRECT - Import order
// 1. React and React-related imports
import React, { useState, useEffect } from 'react';

// 2. External library imports
import { Button, Card } from '@heroui/react';
import { useForm } from 'react-hook-form';

// 3. Internal imports (absolute paths with @/ alias)
import { useProductStore } from '@/stores/product.store';
import { Product } from '@/types/product';
import { formatCurrency } from '@/utils/format';

// 4. Relative imports
import './ProductCard.css';
```

#### Export Patterns
```tsx
// ✅ CORRECT - Default export for main component
const ProductCard = () => {
    return <div>Content</div>;
};

export default ProductCard;

// ✅ CORRECT - Named exports for utilities/types
export const formatPrice = (price: number) => `$${price.toFixed(2)}`;
export type ProductCardProps = {
    product: Product;
    onSelect: (id: string) => void;
};
```

### 3. Component Organization

#### Single Responsibility
- One component per file
- Keep components focused and single-purpose
- Extract complex logic into custom hooks

```tsx
// ✅ CORRECT - Focused component
const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
    const { addToCart, isLoading } = useCartActions();

    const handleAddToCart = () => {
        addToCart(product.id);
        onAddToCart?.(product);
    };

    return (
        <Card>
            <CardBody>
                <h3>{product.name}</h3>
                <p>{formatCurrency(product.price)}</p>
                <Button
                    onClick={handleAddToCart}
                    isLoading={isLoading}
                >
                    Add to Cart
                </Button>
            </CardBody>
        </Card>
    );
};
```

## TypeScript Best Practices

### 1. Interface and Type Definitions

#### Interface vs Type
- Use `interface` for object shapes that might be extended
- Use `type` for unions, primitives, and computed types

```tsx
// ✅ CORRECT - Interface for extensible object shapes
interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
}

interface AdminUser extends User {
    permissions: Permission[];
    lastLogin: Date;
}

// ✅ CORRECT - Type for unions and computed types
type UserRole = 'admin' | 'user' | 'guest';
type ApiResponse<T> = {
    data: T;
    status: 'success' | 'error';
    message?: string;
};
```

#### Props Interface Pattern
```tsx
// ✅ CORRECT - Clear props interface
interface ProductCardProps {
    product: Product;
    onSelect?: (product: Product) => void;
    showActions?: boolean;
    className?: string;
}

// ✅ CORRECT - Generic props for reusability
interface ListProps<T> {
    items: T[];
    renderItem: (item: T) => React.ReactNode;
    keyExtractor: (item: T) => string;
    loading?: boolean;
    emptyMessage?: string;
}
```

### 2. Type Safety Guidelines

#### Strict Type Checking
```tsx
// ✅ CORRECT - Strict typing
const formatUserRole = (role: UserRole): string => {
    switch (role) {
        case 'admin':
            return 'Administrator';
        case 'user':
            return 'User';
        case 'guest':
            return 'Guest';
        default:
            // TypeScript ensures exhaustive checking
            const _exhaustive: never = role;
            throw new Error(`Unhandled role: ${_exhaustive}`);
    }
};

// ✅ CORRECT - Type guards for runtime safety
const isUser = (data: unknown): data is User => {
    return (
        typeof data === 'object' &&
        data !== null &&
        'id' in data &&
        'name' in data &&
        'email' in data
    );
};
```

## Performance Optimization

### 1. React Performance Patterns

#### Memoization
```tsx
// ✅ CORRECT - useMemo for expensive calculations
const ProductList = ({ products, filters }: ProductListProps) => {
    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            return (
                (!filters.category || product.category === filters.category) &&
                (!filters.minPrice || product.price >= filters.minPrice) &&
                (!filters.search || product.name.toLowerCase().includes(filters.search.toLowerCase()))
            );
        });
    }, [products, filters]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

// ✅ CORRECT - useCallback for stable function references
const ProductCard = memo(({ product, onAddToCart }: ProductCardProps) => {
    const handleAddToCart = useCallback(() => {
        onAddToCart(product);
    }, [product, onAddToCart]);

    return (
        <Card>
            <Button onClick={handleAddToCart}>
                Add to Cart
            </Button>
        </Card>
    );
});
```

#### Code Splitting
```tsx
// ✅ CORRECT - Lazy loading for route components
const HomePage = lazy(() => import('@/pages/HomePage'));
const ProductsPage = lazy(() => import('@/pages/ProductsPage'));
const CartPage = lazy(() => import('@/pages/CartPage'));

// ✅ CORRECT - Suspense wrapper
const AppRouter = () => {
    return (
        <Suspense fallback={<LoadingSpinner />}>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/cart" element={<CartPage />} />
            </Routes>
        </Suspense>
    );
};
```

## Error Handling

### 1. Error Boundaries (Production Requirement)

```tsx
// ✅ CORRECT - Error boundary implementation
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);
        // Log to error reporting service
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback || (
                <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
                    <h2 className="text-2xl font-bold text-red-600 mb-4">
                        Something went wrong
                    </h2>
                    <Button onClick={() => this.setState({ hasError: false, error: null })}>
                        Try again
                    </Button>
                </div>
            );
        }

        return this.props.children;
    }
}

// Usage
<ErrorBoundary>
    <ProductList />
</ErrorBoundary>
```

### 2. Input Validation and Security

```tsx
// ✅ CORRECT - Input validation and sanitization
const UserCommentForm = () => {
    const commentSchema = z.object({
        comment: z.string()
            .min(1, "Comment is required")
            .max(500, "Comment must be less than 500 characters")
            .refine(
                (value) => !/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi.test(value),
                "Invalid content detected"
            )
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(commentSchema)
    });

    const onSubmit = async (data: any) => {
        await submitComment(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Textarea
                {...register('comment')}
                placeholder="Enter your comment..."
                isInvalid={!!errors.comment}
                errorMessage={errors.comment?.message}
            />
            <Button type="submit">Submit Comment</Button>
        </form>
    );
};
```

## Code Formatting Standards

### 1. Consistent Formatting
- **Indentation**: 4 spaces for TypeScript/JavaScript files
- **Line Length**: 100 characters maximum
- **Semicolons**: Always use semicolons
- **Quotes**: Use single quotes for strings, double quotes for JSX attributes

```tsx
// ✅ CORRECT - Consistent formatting
const UserProfile = ({
    user,
    onEdit,
    showActions = true
}: UserProfileProps) => {
    const [isEditing, setIsEditing] = useState(false);

    const handleSave = async (userData: UserData) => {
        try {
            await updateUser(userData);
            setIsEditing(false);
            showToast.success('Profile updated successfully');
        } catch (error) {
            showToast.error('Failed to update profile');
        }
    };

    return (
        <Card className="max-w-md mx-auto">
            <CardHeader>
                <h2 className="text-xl font-bold">{user.name}</h2>
            </CardHeader>

            <CardBody>
                {isEditing ? (
                    <UserEditForm
                        user={user}
                        onSave={handleSave}
                        onCancel={() => setIsEditing(false)}
                    />
                ) : (
                    <UserDisplayInfo user={user} />
                )}
            </CardBody>

            {showActions && (
                <CardFooter>
                    <Button
                        onClick={() => setIsEditing(!isEditing)}
                        variant="outline"
                    >
                        {isEditing ? 'Cancel' : 'Edit'}
                    </Button>
                </CardFooter>
            )}
        </Card>
    );
};
```

## Code Reusability

### 1. Component Reusability
- Check existing components in `/src/components` before creating new ones
- Utilize HeroUI components from `@heroui/react` when possible
- Reuse existing hooks and utilities from `/src/hooks` and `/src/utils`
- Follow DRY (Don't Repeat Yourself) principle

```tsx
// ✅ CORRECT - Reusable component with proper props
interface DataListProps<T> {
    items: T[];
    renderItem: (item: T, index: number) => React.ReactNode;
    emptyMessage?: string;
    loading?: boolean;
    className?: string;
}

const DataList = <T,>({
    items,
    renderItem,
    emptyMessage = "No items found",
    loading = false,
    className = ""
}: DataListProps<T>) => {
    if (loading) {
        return <Spinner />;
    }

    if (items.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500">
                {emptyMessage}
            </div>
        );
    }

    return (
        <div className={`space-y-4 ${className}`}>
            {items.map((item, index) => (
                <div key={index}>
                    {renderItem(item, index)}
                </div>
            ))}
        </div>
    );
};
```

## Migration Support (Angular to React)

### 1. Angular Lifecycle Migration

#### useLifecycle Hook (Project-Specific)
```tsx
// ✅ CORRECT - Using useLifecycle for Angular migration
import { useLifecycle } from '@/hooks/useLifecycle';

const ProductComponent = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useLifecycle({
        onInit: () => {
            // Equivalent to ngOnInit
            loadProducts();
        },

        onViewInit: () => {
            // Equivalent to ngAfterViewInit
            setupEventListeners();
        },

        onDestroy: () => {
            // Equivalent to ngOnDestroy
            cleanup();
        }
    });

    const loadProducts = async () => {
        const data = await getProducts();
        setProducts(data);
    };

    return (
        <div>
            {products.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};
```

### 2. Service Migration Pattern

```tsx
// ✅ CORRECT - React Service Pattern
import exec from '@/services/abstract.service';
import { rest } from '@/services/rest.service';

export function getProducts(filters?: ProductFilters) {
    const url = rest.baseUrl + '/products';
    return exec(url, 'get', { params: filters });
}

export function createProduct(product: CreateProductData) {
    const url = rest.baseUrl + '/products';
    return exec(url, 'post', product);
}
```

## Best Practices Summary

### 1. Development Guidelines
- Keep components focused and single-responsibility
- Use meaningful variable and function names
- Add comments for complex logic
- Follow the established project architecture
- Maintain consistent file and folder structure
- Use TypeScript features effectively
- Keep components reasonably sized
- Document public APIs and interfaces
- Follow security best practices
- Optimize for performance

### 2. Code Review Standards

#### Review Checklist
- ✅ **Functionality**: Code works as expected and meets requirements
- ✅ **Performance**: No unnecessary re-renders or expensive operations
- ✅ **Security**: Input validation and proper error handling
- ✅ **Accessibility**: Proper ARIA labels and keyboard navigation
- ✅ **Type Safety**: Proper TypeScript usage and type definitions
- ✅ **Design System**: Consistent use of HeroUI components and design tokens
- ✅ **Responsive Design**: Works across different screen sizes
- ✅ **Error Handling**: Graceful handling of edge cases and errors

#### Pull Request Guidelines
- Provide clear description of changes
- Include screenshots for UI changes
- Ensure all tests pass
- Follow coding standards consistently
- Self-review code before submission
- Remove console.log statements in production code

This comprehensive coding standards document serves as the definitive guide for development practices and should be followed consistently across the project. All rules are designed to ensure code quality, maintainability, and optimal performance while leveraging the project's technology stack effectively.