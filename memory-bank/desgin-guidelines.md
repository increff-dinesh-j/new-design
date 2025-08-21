# Design Guidelines & UX Standards

## ⚠️ CRITICAL: Design-First Development

### **ALWAYS FOLLOW DESIGN GUIDELINES - MANDATORY RULE**

When implementing any UI changes, you MUST follow these design guidelines to ensure consistency, accessibility, and modern elegance throughout the application.

## **Design Philosophy**

Our design system builds upon **Material Design principles** enhanced with **modern elegance** featuring:
- **Subtle glass-blur effects** for depth and sophistication
- **Colorful accents** for visual hierarchy and user guidance
- **Clean spacing** and typography for readability
- **Smooth animations** for delightful interactions
- **Responsive design** for all devices

## **Color & Theming System**

### **Primary Color Usage**

Use HeroUI's built-in color system with Tailwind CSS for consistent theming:

```tsx
// ✅ Primary Actions - Use for main CTAs, important buttons
<Button color="primary">Submit Order</Button>
<Link color="primary">Learn More</Link>

// ✅ Primary accents - Headers, active states, focus indicators
<Card className="border-l-4 border-primary">...</Card>
<Input color="primary" />
```

### **Secondary Color Usage**

```tsx
// ✅ Secondary Actions - Cancel, back, alternative options
<Button color="secondary" variant="bordered">Cancel</Button>
<Button color="secondary" variant="flat">Skip</Button>

// ✅ Supporting elements - less important actions
<Button color="secondary" size="sm">Edit</Button>
```

### **Semantic Colors**

```tsx
// ✅ Success - Confirmations, positive feedback, completed states
<Alert color="success">Order placed successfully!</Alert>
<Chip color="success">Active</Chip>
<Button color="success">Confirm</Button>

// ✅ Warning - Cautions, pending states, important notices
<Alert color="warning">Please review your information</Alert>
<Chip color="warning">Pending</Chip>

// ✅ Danger - Errors, destructive actions, critical states
<Alert color="danger">Payment failed</Alert>
<Button color="danger">Delete Account</Button>

// ✅ Default/Neutral - Informational, secondary content
<Alert color="default">New features available</Alert>
<Chip color="default">Draft</Chip>
```

### **Color Hierarchy Guidelines**

1. **Primary (Blue)**: Main actions, navigation, brand elements
2. **Secondary (Purple/Gray)**: Supporting actions, alternative options
3. **Success (Green)**: Positive outcomes, confirmations
4. **Warning (Yellow/Orange)**: Cautions, pending states
5. **Danger (Red)**: Errors, destructive actions
6. **Default (Gray)**: Neutral information, disabled states

## **Component-Specific Design Patterns**

### **Modal Design Pattern - Colorful Headers**

**✅ REQUIRED PATTERN**: All modals must use colorful headers with badges/tags

```tsx
// ✅ Standard Modal Pattern
<Modal isOpen={isOpen} onOpenChange={onOpenChange} size="lg">
    <ModalContent>
        {(onClose) => (
            <>
                {/* Colorful Header with Gradient */}
                <ModalHeader className="bg-gradient-to-r from-primary-500 to-primary-600 text-white p-6">
                    <div className="flex items-center gap-3">
                        <h2 className="text-xl font-semibold">Update Application</h2>
                        <Chip size="sm" variant="flat" className="bg-white/20 text-white">
                            assure
                        </Chip>
                    </div>
                </ModalHeader>

                <ModalBody className="p-6">
                    {/* Content with proper spacing */}
                    <div className="space-y-4">
                        {/* Form fields with consistent spacing */}
                    </div>
                </ModalBody>

                <ModalFooter className="p-6 pt-0">
                    <Button color="danger" variant="light" onPress={onClose}>
                        Cancel
                    </Button>
                    <Button color="primary" onPress={handleSubmit}>
                        Update
                    </Button>
                </ModalFooter>
            </>
        )}
    </ModalContent>
</Modal>
```

**Design Elements:**
- **Gradient Headers**: Use primary color gradients (`from-primary-500 to-primary-600`)
- **White Text**: Ensure readability with white text on colored backgrounds
- **Status Chips**: Include relevant status/category chips with `bg-white/20` for transparency
- **Proper Spacing**: Use `p-6` for consistent padding throughout modal sections

### **Card Design Patterns**

```tsx
// ✅ Elevated Card with Subtle Shadow
<Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 backdrop-blur-sm bg-white/95">
    <CardHeader className="border-l-4 border-primary">
        <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Card Title</h3>
            <Chip color="primary" size="sm">New</Chip>
        </div>
    </CardHeader>
    <CardBody>
        <p className="text-default-600">Card content with proper contrast</p>
    </CardBody>
    <CardFooter className="border-t border-default-200">
        <Button color="primary" size="sm">Action</Button>
    </CardFooter>
</Card>

// ✅ Glass-Blur Effect Card
<Card className="backdrop-blur-md bg-white/70 border border-white/20 shadow-xl">
    <CardBody className="p-6">
        <div className="space-y-4">
            {/* Content with glassmorphism effect */}
        </div>
    </CardBody>
</Card>
```

### **Form Design Patterns**

```tsx
// ✅ Comprehensive Form Pattern
<Card className="max-w-md w-full shadow-lg">
    <CardHeader className="bg-gradient-to-r from-primary-500 to-primary-600 text-white">
        <h2 className="text-xl font-semibold">User Registration</h2>
    </CardHeader>
    <CardBody className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Input with proper labeling */}
            <Input
                type="email"
                label="Email Address"
                placeholder="Enter your email"
                variant="bordered"
                isRequired
                description="We'll never share your email"
                classNames={{
                    input: "text-base",
                    label: "text-base font-medium"
                }}
            />

            {/* Input with validation */}
            <Input
                type="password"
                label="Password"
                placeholder="Create a strong password"
                variant="bordered"
                isRequired
                isInvalid={!!errors.password}
                errorMessage={errors.password?.message}
            />

            {/* Select with proper styling */}
            <Select
                label="Country"
                placeholder="Select your country"
                variant="bordered"
                classNames={{
                    trigger: "min-h-unit-12"
                }}
            >
                <SelectItem key="us" value="us">United States</SelectItem>
                <SelectItem key="ca" value="ca">Canada</SelectItem>
            </Select>

            {/* Checkbox with proper spacing */}
            <Checkbox isRequired className="text-sm">
                I agree to the <Link href="/terms" color="primary">Terms of Service</Link>
            </Checkbox>

            {/* Button group with proper alignment */}
            <div className="flex gap-2 pt-4">
                <Button
                    color="danger"
                    variant="light"
                    className="flex-1"
                    onPress={onCancel}
                >
                    Cancel
                </Button>
                <Button
                    color="primary"
                    type="submit"
                    className="flex-1"
                    isLoading={isSubmitting}
                >
                    Register
                </Button>
            </div>
        </form>
    </CardBody>
</Card>
```

### **Navigation Design Patterns**

```tsx
// ✅ Modern Navbar with Glass Effect
<Navbar className="backdrop-blur-md bg-white/80 border-b border-white/20">
    <NavbarBrand>
        <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
            </div>
            <p className="font-bold text-lg">ACME</p>
        </div>
    </NavbarBrand>

    <NavbarContent className="hidden sm:flex gap-6" justify="center">
        <NavbarItem>
            <Link
                href="/dashboard"
                color="foreground"
                className="font-medium hover:text-primary transition-colors"
            >
                Dashboard
            </Link>
        </NavbarItem>
        <NavbarItem isActive>
            <Link
                href="/products"
                color="primary"
                className="font-medium"
                aria-current="page"
            >
                Products
            </Link>
        </NavbarItem>
    </NavbarContent>
</Navbar>

// ✅ Breadcrumbs with Proper Hierarchy
<Breadcrumbs
    size="lg"
    className="mb-6"
    separator="/"
    classNames={{
        list: "bg-white/50 backdrop-blur-sm rounded-lg px-4 py-2"
    }}
>
    <BreadcrumbItem href="/">
        <div className="flex items-center gap-2">
            <HomeIcon className="w-4 h-4" />
            <span>Home</span>
        </div>
    </BreadcrumbItem>
    <BreadcrumbItem href="/products">Products</BreadcrumbItem>
    <BreadcrumbItem>Current Page</BreadcrumbItem>
</Breadcrumbs>
```

### **Table Design Patterns**

```tsx
// ✅ Modern Data Table with Actions
<div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden">
    <div className="p-6 border-b border-default-200">
        <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">User Management</h2>
            <Button color="primary" startContent={<PlusIcon />}>
                Add User
            </Button>
        </div>
    </div>

    <Table
        aria-label="Users table"
        classNames={{
            wrapper: "shadow-none rounded-none",
            th: "bg-default-100 text-default-700 font-semibold",
            td: "border-b border-default-200"
        }}
    >
        <TableHeader>
            <TableColumn>USER</TableColumn>
            <TableColumn>ROLE</TableColumn>
            <TableColumn>STATUS</TableColumn>
            <TableColumn align="center">ACTIONS</TableColumn>
        </TableHeader>
        <TableBody>
            {users.map((user) => (
                <TableRow key={user.id}>
                    <TableCell>
                        <User
                            avatarProps={{ radius: "lg", src: user.avatar }}
                            description={user.email}
                            name={user.name}
                        />
                    </TableCell>
                    <TableCell>
                        <Chip color="default" variant="flat" size="sm">
                            {user.role}
                        </Chip>
                    </TableCell>
                    <TableCell>
                        <Chip
                            color={user.status === 'active' ? 'success' : 'warning'}
                            variant="flat"
                            size="sm"
                        >
                            {user.status}
                        </Chip>
                    </TableCell>
                    <TableCell>
                        <div className="flex items-center gap-1">
                            <Tooltip content="View Details">
                                <Button isIconOnly size="sm" variant="light">
                                    <EyeIcon className="w-4 h-4" />
                                </Button>
                            </Tooltip>
                            <Tooltip content="Edit User">
                                <Button isIconOnly size="sm" variant="light">
                                    <EditIcon className="w-4 h-4" />
                                </Button>
                            </Tooltip>
                        </div>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
</div>
```

## **Animation & Interaction Guidelines**

### **Transition Standards**

```css
/* ✅ Standard Transition Timing */
.transition-standard {
    transition: all 300ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

/* ✅ Transition In (Ease-In-Back) */
.transition-in {
    transition: all 300ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

/* ✅ Transition Out (Ease-Out-Back) */
.transition-out {
    transition: all 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
```

### **Interactive States**

```tsx
// ✅ Button Hover States
<Button
    color="primary"
    className="transform hover:scale-105 transition-all duration-300 hover:shadow-lg"
>
    Interactive Button
</Button>

// ✅ Card Hover Effects
<Card className="hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
    <CardBody>Hoverable Card</CardBody>
</Card>

// ✅ Input Focus States
<Input
    classNames={{
        inputWrapper: "focus-within:ring-2 focus-within:ring-primary/20 transition-all duration-300"
    }}
/>
```

### **Loading States**

```tsx
// ✅ Button Loading
<Button color="primary" isLoading>
    Processing...
</Button>

// ✅ Skeleton Loading for Cards
<Card className="space-y-5 p-4">
    <Skeleton className="rounded-lg">
        <div className="h-24 rounded-lg bg-default-300"></div>
    </Skeleton>
    <div className="space-y-3">
        <Skeleton className="w-3/5 rounded-lg">
            <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-4/5 rounded-lg">
            <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
        </Skeleton>
    </div>
</Card>

// ✅ Page Loading with Spinner
<div className="flex items-center justify-center min-h-[200px]">
    <Spinner size="lg" color="primary" />
</div>
```

## **Layout & Spacing Standards**

### **Container Patterns**

```tsx
// ✅ Page Container
<div className="container mx-auto px-4 py-8 max-w-7xl">
    <div className="space-y-8">
        {/* Page content with consistent spacing */}
    </div>
</div>

// ✅ Section Spacing
<section className="py-12">
    <div className="space-y-6">
        <h2 className="text-2xl font-bold mb-4">Section Title</h2>
        {/* Section content */}
    </div>
</section>

// ✅ Grid Layouts (12-column system)
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {items.map(item => (
        <Card key={item.id}>...</Card>
    ))}
</div>
```

### **Spacing Scale**

Use Tailwind's spacing scale consistently:
- `space-y-2` (8px) - Tight spacing within components
- `space-y-4` (16px) - Standard component spacing
- `space-y-6` (24px) - Section spacing
- `space-y-8` (32px) - Page-level spacing
- `space-y-12` (48px) - Large section breaks

## **Typography Hierarchy**

```tsx
// ✅ Heading Hierarchy
<h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
    Main Page Title
</h1>

<h2 className="text-2xl font-semibold text-foreground mb-4">
    Section Title
</h2>

<h3 className="text-xl font-medium text-foreground mb-3">
    Subsection Title
</h3>

// ✅ Body Text
<p className="text-default-600 leading-relaxed mb-4">
    Regular paragraph text with proper line height and contrast.
</p>

// ✅ Supporting Text
<span className="text-sm text-default-500">
    Helper text, captions, and metadata
</span>

// ✅ Interactive Text
<Link href="#" color="primary" className="font-medium hover:underline">
    Interactive Link
</Link>
```

## **Accessibility Standards**

### **Color Contrast**

- **Primary text**: Minimum 4.5:1 contrast ratio
- **Secondary text**: Minimum 3:1 contrast ratio
- **Interactive elements**: Minimum 3:1 contrast ratio
- **Focus indicators**: Visible and high contrast

### **Interactive Elements**

```tsx
// ✅ Proper Focus States
<Button className="focus:ring-2 focus:ring-primary/50 focus:outline-none">
    Accessible Button
</Button>

// ✅ ARIA Labels
<Button aria-label="Close modal" isIconOnly>
    <CloseIcon />
</Button>

// ✅ Descriptive Labels
<Input
    label="Email Address"
    description="We'll never share your email address"
    placeholder="Enter your email"
    aria-describedby="email-help"
/>
```

### **Keyboard Navigation**

- All interactive elements must be keyboard accessible
- Logical tab order throughout the interface
- Visible focus indicators on all focusable elements
- Escape key closes modals and dropdowns

## **Responsive Design Patterns**

### **Breakpoint Strategy**

```tsx
// ✅ Mobile-First Responsive Design
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
    {/* Responsive grid */}
</div>

// ✅ Responsive Typography
<h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
    Responsive Heading
</h1>

// ✅ Responsive Spacing
<div className="p-4 sm:p-6 lg:p-8">
    {/* Responsive padding */}
</div>

// ✅ Responsive Navigation
<Navbar className="px-4 sm:px-6 lg:px-8">
    <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {/* Desktop navigation */}
    </NavbarContent>
    <NavbarMenuToggle className="sm:hidden" />
</Navbar>
```

### **Mobile Optimization**

- **Touch Targets**: Minimum 44px for touchable elements
- **Thumb-Friendly Navigation**: Bottom navigation for mobile
- **Simplified Layouts**: Single column on mobile
- **Larger Text**: Readable text sizes on small screens

## **Performance Guidelines**

### **Image Optimization**

```tsx
// ✅ Optimized Images
<Image
    src="/hero-image.jpg"
    alt="Descriptive alt text"
    width={800}
    height={400}
    loading="lazy"
    className="object-cover rounded-lg"
/>

// ✅ Avatar with Fallback
<Avatar
    src="/user-avatar.jpg"
    name="John Doe"
    size="lg"
    className="ring-2 ring-primary/20"
/>
```

### **Component Loading**

```tsx
// ✅ Lazy Loading for Heavy Components
const DataTable = lazy(() => import('./DataTable'));

<Suspense fallback={
    <div className="flex justify-center p-8">
        <Spinner size="lg" color="primary" />
    </div>
}>
    <DataTable data={data} />
</Suspense>
```

## **Error Handling & Feedback**

### **Error States**

```tsx
// ✅ Form Validation Errors
<Input
    label="Email"
    isInvalid={!!errors.email}
    errorMessage={errors.email?.message}
    color={errors.email ? "danger" : "default"}
/>

// ✅ Error Alerts
<Alert
    color="danger"
    variant="faded"
    title="Something went wrong"
    description="Please check your connection and try again."
    className="mb-4"
/>

// ✅ Empty States
<div className="flex flex-col items-center justify-center py-12 text-center">
    <div className="w-16 h-16 bg-default-100 rounded-full flex items-center justify-center mb-4">
        <EmptyIcon className="w-8 h-8 text-default-400" />
    </div>
    <h3 className="text-lg font-medium text-default-700 mb-2">No items found</h3>
    <p className="text-default-500 mb-4">Get started by creating your first item.</p>
    <Button color="primary">Create Item</Button>
</div>
```

### **Success Feedback**

```tsx
// ✅ Success Messages
<Alert
    color="success"
    variant="faded"
    title="Success!"
    description="Your changes have been saved successfully."
/>

// ✅ Toast Notifications
import { showToast } from '@/components/Toast';

showToast.success("Order placed successfully!");
```

## **Cross-Reference**

For specific component implementations and technical details, refer to:
- **[HeroUI Component Reference](./04-heroui.md)** - Complete component library usage
- **[Coding Rules](./02-coding-rules.md)** - Technical implementation standards
- **[Architecture Guidelines](./01-architecture.md)** - System design patterns

This design system ensures consistency, accessibility, and modern elegance across all user interfaces while maintaining the sophisticated glass-blur aesthetic and colorful accent patterns.