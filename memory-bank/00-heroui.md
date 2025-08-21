# HeroUI Component Reference & Usage Guidelines

## ⚠️ CRITICAL: AI Development Guidelines

### **ALWAYS USE HEROUI COMPONENTS - MANDATORY RULE**

When writing React code, you MUST prioritize HeroUI components over native HTML elements. This is a **PROJECT REQUIREMENT**.

#### **Component Decision Matrix**
```typescript
// ✅ ALWAYS DO THIS - Use HeroUI components
import { Button, Input, Card, Modal } from '@heroui/react';

<Button>Click me</Button>           // Instead of <button>
<Input />                          // Instead of <input>
<Card>...</Card>                   // Instead of <div className="card">
<Modal>...</Modal>                 // Instead of <dialog>
```

#### **Component Mapping Reference**
| Native HTML | HeroUI Component | Import |
|-------------|------------------|---------|
| `<button>` | `<Button>` | `import { Button } from '@heroui/react'` |
| `<input>` | `<Input>` | `import { Input } from '@heroui/react'` |
| `<select>` | `<Select>` | `import { Select, SelectItem } from '@heroui/react'` |
| `<textarea>` | `<Textarea>` | `import { Textarea } from '@heroui/react'` |
| `<table>` | `<Table>` | `import { Table, TableHeader, TableBody, TableRow, TableCell } from '@heroui/react'` |
| `<img>` | `<Image>` | `import { Image } from '@heroui/react'` |
| `<a>` | `<Link>` | `import { Link } from '@heroui/react'` |

## Essential HeroUI Components

### **Form Components**

#### **Button** - Primary action element
```tsx
import { Button, ButtonGroup } from '@heroui/react';

<Button color="primary" variant="solid">Submit</Button>
<Button color="secondary" variant="bordered">Cancel</Button>
<Button isLoading color="primary">Processing...</Button>

<ButtonGroup>
    <Button>One</Button>
    <Button>Two</Button>
    <Button>Three</Button>
</ButtonGroup>
```

#### **Input** - Text input fields
```tsx
import { Input } from '@heroui/react';

<Input label="Email" placeholder="Enter your email" />
<Input
    label="Password"
    type="password"
    isRequired
    isInvalid={hasError}
    errorMessage="Password is required"
/>
<Input
    label="Website"
    startContent="https://"
    endContent={<Icon />}
/>
```

#### **Select** - Dropdown selection
```tsx
import { Select, SelectItem, SelectSection } from '@heroui/react';

<Select label="Choose a fruit">
    <SelectItem key="apple" value="apple">Apple</SelectItem>
    <SelectItem key="banana" value="banana">Banana</SelectItem>
</Select>

<Select label="Language">
    <SelectSection title="Popular">
        <SelectItem key="js">JavaScript</SelectItem>
        <SelectItem key="py">Python</SelectItem>
    </SelectSection>
</Select>
```

#### **Textarea** - Multi-line text input
```tsx
import { Textarea } from '@heroui/react';

<Textarea
    label="Description"
    placeholder="Enter your description"
    maxRows={3}
/>
```

#### **Checkbox & CheckboxGroup**
```tsx
import { Checkbox, CheckboxGroup } from '@heroui/react';

<Checkbox isSelected={isSelected} onValueChange={setSelected}>
    I agree to the terms
</Checkbox>

<CheckboxGroup label="Interests" value={selected} onValueChange={setSelected}>
    <Checkbox value="sports">Sports</Checkbox>
    <Checkbox value="music">Music</Checkbox>
</CheckboxGroup>
```

#### **Switch** - Toggle control
```tsx
import { Switch } from '@heroui/react';

<Switch isSelected={isEnabled} onValueChange={setEnabled}>
    Enable notifications
</Switch>
```

### **Navigation Components**

#### **Navbar** - Navigation header
```tsx
import {
    Navbar, NavbarBrand, NavbarContent, NavbarItem,
    NavbarMenuToggle, NavbarMenu, NavbarMenuItem
} from '@heroui/react';

<Navbar>
    <NavbarBrand>
        <p className="font-bold text-inherit">ACME</p>
    </NavbarBrand>
    <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
            <Link href="/features">Features</Link>
        </NavbarItem>
        <NavbarItem isActive>
            <Link href="/integrations">Integrations</Link>
        </NavbarItem>
    </NavbarContent>
    <NavbarContent justify="end">
        <NavbarItem>
            <Button as={Link} color="primary" href="/login">Login</Button>
        </NavbarItem>
    </NavbarContent>
</Navbar>
```

#### **Breadcrumbs** - Navigation path
```tsx
import { Breadcrumbs, BreadcrumbItem } from '@heroui/react';

<Breadcrumbs>
    <BreadcrumbItem href="/">Home</BreadcrumbItem>
    <BreadcrumbItem href="/products">Products</BreadcrumbItem>
    <BreadcrumbItem>Current Page</BreadcrumbItem>
</Breadcrumbs>
```

#### **Tabs** - Tab navigation
```tsx
import { Tabs, Tab } from '@heroui/react';

<Tabs aria-label="Options">
    <Tab key="photos" title="Photos">
        <Card>Photos content</Card>
    </Tab>
    <Tab key="music" title="Music">
        <Card>Music content</Card>
    </Tab>
</Tabs>
```

#### **Link** - Navigation links
```tsx
import { Link } from '@heroui/react';

<Link href="/home" color="primary">Home</Link>
<Link href="/about" isExternal showAnchorIcon>About Us</Link>
```

### **Data Display Components**

#### **Table** - Data tables
```tsx
import {
    Table, TableHeader, TableColumn, TableBody,
    TableRow, TableCell, getKeyValue
} from '@heroui/react';

const columns = [
    { key: "name", label: "NAME" },
    { key: "role", label: "ROLE" },
    { key: "status", label: "STATUS" }
];

const rows = [
    { key: "1", name: "Tony Reichert", role: "CEO", status: "Active" }
];

<Table aria-label="Example table">
    <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
    </TableHeader>
    <TableBody items={rows}>
        {(item) => (
            <TableRow key={item.key}>
                {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
            </TableRow>
        )}
    </TableBody>
</Table>
```

#### **Card** - Content containers
```tsx
import { Card, CardHeader, CardBody, CardFooter } from '@heroui/react';

<Card className="max-w-[400px]">
    <CardHeader>
        <h4>Card Title</h4>
    </CardHeader>
    <CardBody>
        <p>Card content goes here</p>
    </CardBody>
    <CardFooter>
        <Button color="primary">Action</Button>
    </CardFooter>
</Card>
```

#### **Avatar** - User avatars
```tsx
import { Avatar, AvatarGroup } from '@heroui/react';

<Avatar src="/avatars/avatar-1.png" />
<Avatar name="John Doe" />

<AvatarGroup isBordered>
    <Avatar src="/avatars/avatar-1.png" />
    <Avatar src="/avatars/avatar-2.png" />
    <Avatar name="+5" />
</AvatarGroup>
```

#### **Image** - Optimized images
```tsx
import { Image } from '@heroui/react';

<Image
    width={300}
    alt="Description"
    src="/hero-image.png"
/>
```

#### **Chip** - Status badges
```tsx
import { Chip } from '@heroui/react';

<Chip color="primary">Primary</Chip>
<Chip color="success" variant="flat">Success</Chip>
<Chip color="warning" onClose={() => {}}>Closable</Chip>
```

### **Feedback Components**

#### **Modal** - Dialog boxes
```tsx
import {
    Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,
    useDisclosure
} from '@heroui/react';

const {isOpen, onOpen, onOpenChange} = useDisclosure();

<>
    <Button onPress={onOpen}>Open Modal</Button>
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
            {(onClose) => (
                <>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalBody>
                        <p>Modal content goes here</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={onClose}>
                            Close
                        </Button>
                        <Button color="primary" onPress={onClose}>
                            Action
                        </Button>
                    </ModalFooter>
                </>
            )}
        </ModalContent>
    </Modal>
</>
```

#### **Toast** - Notification toasts
```tsx
import { Button, addToast } from '@heroui/react';

<Button onPress={() => addToast("Success message!")}>
    Show Toast
</Button>

<Button onPress={() => addToast({
    title: "Success!",
    description: "Your changes have been saved.",
    status: "success"
})}>
    Show Success Toast
</Button>
```

#### **Alert** - Alert messages
```tsx
import { Alert } from '@heroui/react';

<Alert
    color="success"
    variant="faded"
    title="Success!"
    description="Your account has been created successfully."
/>
```

#### **Tooltip** - Hover information
```tsx
import { Tooltip } from '@heroui/react';

<Tooltip content="This is a tooltip">
    <Button>Hover me</Button>
</Tooltip>
```

#### **Popover** - Contextual overlays
```tsx
import { Popover, PopoverTrigger, PopoverContent } from '@heroui/react';

<Popover placement="bottom" showArrow={true}>
    <PopoverTrigger>
        <Button>Open Popover</Button>
    </PopoverTrigger>
    <PopoverContent>
        <div className="px-1 py-2">
            <div className="text-small font-bold">Popover Content</div>
        </div>
    </PopoverContent>
</Popover>
```

### **Layout Components**

#### **Spacer** - Spacing utility
```tsx
import { Spacer } from '@heroui/react';

<div>
    <p>First paragraph</p>
    <Spacer y={4} />
    <p>Second paragraph with spacing</p>
</div>
```

#### **Divider** - Visual separator
```tsx
import { Divider } from '@heroui/react';

<div className="max-w-md">
    <div className="space-y-1">
        <h4>HeroUI Components</h4>
        <p className="text-small">Beautiful, fast and modern React UI library.</p>
    </div>
    <Divider className="my-4" />
    <div className="flex h-5 items-center space-x-4 text-small">
        <div>Blog</div>
        <Divider orientation="vertical" />
        <div>Docs</div>
    </div>
</div>
```

### **Additional Components**

#### **Spinner** - Loading indicators
```tsx
import { Spinner } from '@heroui/react';

<Spinner />
<Spinner color="primary" />
<Spinner size="lg" />
<Spinner label="Loading..." />
```

#### **Progress** - Progress indicators
```tsx
import { Progress, CircularProgress } from '@heroui/react';

<Progress value={70} className="max-w-md" />
<CircularProgress value={70} />
```

#### **Dropdown** - Action menus
```tsx
import {
    Dropdown, DropdownTrigger, DropdownMenu, DropdownItem
} from '@heroui/react';

<Dropdown>
    <DropdownTrigger>
        <Button variant="bordered">Open Menu</Button>
    </DropdownTrigger>
    <DropdownMenu aria-label="Actions">
        <DropdownItem key="new">New file</DropdownItem>
        <DropdownItem key="copy">Copy link</DropdownItem>
        <DropdownItem key="delete" color="danger">Delete file</DropdownItem>
    </DropdownMenu>
</Dropdown>
```

#### **Autocomplete** - Search with suggestions
```tsx
import { Autocomplete, AutocompleteItem } from '@heroui/react';

const items = [
    { key: "1", label: "Apple" },
    { key: "2", label: "Banana" }
];

<Autocomplete
    label="Search fruits"
    placeholder="Type to search..."
    defaultItems={items}
>
    {(item) => <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>}
</Autocomplete>
```

## Project Setup & Configuration

### **1. HeroUIProvider Setup (REQUIRED)**

```tsx
// app/providers.tsx
import { HeroUIProvider } from '@heroui/react';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <HeroUIProvider>
            {children}
        </HeroUIProvider>
    );
}

// app/layout.tsx or main.tsx
import { Providers } from './providers';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className="dark">
            <body>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
}
```

### **2. TailwindCSS Configuration**

```javascript
// tailwind.config.js
const { heroui } = require("@heroui/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        // ... your content paths
        "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },
    darkMode: "class",
    plugins: [heroui()],
};
```

## Real-World Implementation Patterns

### **Authentication Form Example**

```tsx
import { Card, CardHeader, CardBody, Input, Button, Link } from '@heroui/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export const LoginForm = () => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(loginSchema)
    });

    return (
        <Card className="max-w-md w-full">
            <CardHeader>
                <h1 className="text-2xl font-bold">Sign In</h1>
            </CardHeader>
            <CardBody>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <Input
                        {...register('email')}
                        type="email"
                        label="Email"
                        variant="bordered"
                        isInvalid={!!errors.email}
                        errorMessage={errors.email?.message}
                    />
                    <Input
                        {...register('password')}
                        type="password"
                        label="Password"
                        variant="bordered"
                        isInvalid={!!errors.password}
                        errorMessage={errors.password?.message}
                    />
                    <Button
                        type="submit"
                        color="primary"
                        className="w-full"
                        isLoading={isSubmitting}
                    >
                        Sign In
                    </Button>
                    <div className="text-center">
                        <Link href="/register" size="sm">
                            Don't have an account? Sign up
                        </Link>
                    </div>
                </form>
            </CardBody>
        </Card>
    );
};
```

### **Product Card Example**

```tsx
import { Card, CardBody, CardFooter, Image, Button, Chip } from '@heroui/react';

export const ProductCard = ({ product }) => {
    return (
        <Card shadow="sm" isPressable onPress={() => console.log("item pressed")}>
            <CardBody className="overflow-visible p-0">
                <Image
                    shadow="sm"
                    radius="lg"
                    width="100%"
                    alt={product.title}
                    className="w-full object-cover h-[140px]"
                    src={product.img}
                />
            </CardBody>
            <CardFooter className="text-small justify-between">
                <div>
                    <b>{product.title}</b>
                    <p className="text-default-500">{product.price}</p>
                </div>
                <div className="flex gap-2">
                    <Chip color="success" size="sm">Available</Chip>
                    <Button color="primary" size="sm">
                        Add to Cart
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
};
```

### **Data Table with User Actions**

```tsx
import {
    Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
    Chip, User, Tooltip, Button
} from '@heroui/react';

export const UsersTable = () => {
    const statusColorMap = {
        active: "success",
        paused: "danger",
        vacation: "warning",
    };

    const renderCell = (user, columnKey) => {
        switch (columnKey) {
            case "user":
                return (
                    <User
                        avatarProps={{ radius: "lg", src: user.avatar }}
                        description={user.email}
                        name={user.name}
                    />
                );
            case "status":
                return (
                    <Chip
                        className="capitalize"
                        color={statusColorMap[user.status]}
                        size="sm"
                        variant="flat"
                    >
                        {user.status}
                    </Chip>
                );
            case "actions":
                return (
                    <div className="relative flex items-center gap-2">
                        <Tooltip content="Details">
                            <Button isIconOnly size="sm" variant="light">
                                <EyeIcon />
                            </Button>
                        </Tooltip>
                        <Tooltip content="Edit user">
                            <Button isIconOnly size="sm" variant="light">
                                <EditIcon />
                            </Button>
                        </Tooltip>
                    </div>
                );
            default:
                return user[columnKey];
        }
    };

    return (
        <Table aria-label="Users table">
            <TableHeader columns={columns}>
                {(column) => (
                    <TableColumn key={column.uid}>
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody items={users}>
                {(item) => (
                    <TableRow key={item.id}>
                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
};
```

## Best Practices

### **Performance**
- Use `React.lazy` for large components
- Implement table virtualization for large datasets
- Use memoization for complex components

### **Accessibility**
- Always provide labels and descriptions
- Use semantic HTML structure
- Implement proper focus management

### **Responsive Design**
- Use responsive variants
- Implement responsive tables
- Consider mobile-first approach

## Complete Component Documentation Links

- **accordion** - https://www.heroui.com/docs/components/accordion
- **alert** - https://www.heroui.com/docs/components/alert
- **autocomplete** - https://www.heroui.com/docs/components/autocomplete
- **avatar** - https://www.heroui.com/docs/components/avatar
- **badge** - https://www.heroui.com/docs/components/badge
- **breadcrumbs** - https://www.heroui.com/docs/components/breadcrumbs
- **button** - https://www.heroui.com/docs/components/button
- **calendar** - https://www.heroui.com/docs/components/calendar
- **card** - https://www.heroui.com/docs/components/card
- **checkbox** - https://www.heroui.com/docs/components/checkbox
- **checkbox-group** - https://www.heroui.com/docs/components/checkbox-group
- **chip** - https://www.heroui.com/docs/components/chip
- **circular-progress** - https://www.heroui.com/docs/components/circular-progress
- **code** - https://www.heroui.com/docs/components/code
- **date-input** - https://www.heroui.com/docs/components/date-input
- **date-picker** - https://www.heroui.com/docs/components/date-picker
- **date-range-picker** - https://www.heroui.com/docs/components/date-range-picker
- **divider** - https://www.heroui.com/docs/components/divider
- **drawer** - https://www.heroui.com/docs/components/drawer
- **dropdown** - https://www.heroui.com/docs/components/dropdown
- **form** - https://www.heroui.com/docs/components/form
- **image** - https://www.heroui.com/docs/components/image
- **input** - https://www.heroui.com/docs/components/input
- **input-otp** - https://www.heroui.com/docs/components/input-otp
- **kbd** - https://www.heroui.com/docs/components/kbd
- **link** - https://www.heroui.com/docs/components/link
- **listbox** - https://www.heroui.com/docs/components/listbox
- **modal** - https://www.heroui.com/docs/components/modal
- **navbar** - https://www.heroui.com/docs/components/navbar
- **number-input** - https://www.heroui.com/docs/components/number-input
- **pagination** - https://www.heroui.com/docs/components/pagination
- **popover** - https://www.heroui.com/docs/components/popover
- **progress** - https://www.heroui.com/docs/components/progress
- **radio-group** - https://www.heroui.com/docs/components/radio-group
- **range-calendar** - https://www.heroui.com/docs/components/range-calendar
- **scroll-shadow** - https://www.heroui.com/docs/components/scroll-shadow
- **select** - https://www.heroui.com/docs/components/select
- **skeleton** - https://www.heroui.com/docs/components/skeleton
- **slider** - https://www.heroui.com/docs/components/slider
- **snippet** - https://www.heroui.com/docs/components/snippet
- **spacer** - https://www.heroui.com/docs/components/spacer
- **spinner** - https://www.heroui.com/docs/components/spinner
- **switch** - https://www.heroui.com/docs/components/switch
- **table** - https://www.heroui.com/docs/components/table
- **tabs** - https://www.heroui.com/docs/components/tabs
- **textarea** - https://www.heroui.com/docs/components/textarea
- **time-input** - https://www.heroui.com/docs/components/time-input
- **toast** - https://www.heroui.com/docs/components/toast
- **tooltip** - https://www.heroui.com/docs/components/tooltip
- **user** - https://www.heroui.com/docs/components/user

This comprehensive reference ensures HeroUI components are used consistently throughout the project, providing superior user experience with accessible, performant, and beautifully designed interface elements.