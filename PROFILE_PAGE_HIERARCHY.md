# Profile Page Component & Container Hierarchy

## Page Structure Overview

```
ProfilePage (/src/pages/profile/index.tsx)
├── Root Container (min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900)
│   ├── Custom Scrollbar Styles (CSS-in-JS)
│   ├── Animated Background Container (absolute inset-0)
│   │   ├── Blue Blur Circle (-top-40 -right-40)
│   │   ├── Purple Blur Circle (-bottom-40 -left-40)
│   │   ├── Green Blur Circle (top-1/3 left-1/4)
│   │   └── Yellow Blur Circle (bottom-1/4 right-1/4)
│   │
│   └── Content Container (relative z-10)
│       ├── Header Component
│       ├── Main Content Container
│       └── Footer Component
```

## Detailed Component Hierarchy

### 1. Header Section
```
Header (/src/components/feed/header/index.tsx)
├── Header Container (bg-white border-b border-gray-200)
│   ├── Inner Container (max-w-7xl mx-auto px-4)
│   │   ├── Flex Container (flex items-center justify-between h-16)
│   │   │   ├── Left Section (flex items-center space-x-4)
│   │   │   │   ├── Logo Placeholder (w-10 h-10 bg-gray-300 rounded-full)
│   │   │   │   └── Mobile Menu Button (lg:hidden)
│   │   │   │
│   │   │   ├── Navigation Menu (hidden md:flex items-center space-x-8)
│   │   │   │   ├── Home Link (active - border-b-2 border-black)
│   │   │   │   ├── Share Needs Link
│   │   │   │   ├── Explore Link
│   │   │   │   └── Online Sessions Link
│   │   │   │
│   │   │   └── Right Section (flex items-center space-x-4)
│   │   │       ├── Notification Bell Button
│   │   │       └── User Dropdown Menu
│   │   │           ├── User Avatar Button
│   │   │           └── Dropdown Content
│   │   │               ├── Profile Menu Item
│   │   │               ├── Edit Profile Menu Item
│   │   │               ├── My Activities Menu Item
│   │   │               ├── Logout Menu Item
│   │   │               └── Delete Profile Menu Item
```

### 2. Main Content Section
```
Main Container (max-w-4xl mx-auto px-4 py-8)
├── Profile Information Section (grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8)
│   ├── Left Column Container (lg:col-span-1 space-y-6)
│   │   ├── ProfileHeader Card Container (bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 shadow-xl)
│   │   │   └── ProfileHeader Component
│   │   │       ├── Edit Button Container (absolute top-4 right-4)
│   │   │       ├── Content Container (flex items-center space-x-8 pr-16)
│   │   │       │   ├── Avatar Container (w-20 h-20 bg-gray-700 rounded-full)
│   │   │       │   │   └── Inner Circle (w-12 h-12 bg-gray-600 rounded-full)
│   │   │       │   └── Text Container (flex-1 min-w-0)
│   │   │       │       ├── Company Name (text-2xl font-bold text-white)
│   │   │       │       ├── Founded Year (text-gray-400 text-base)
│   │   │       │       └── View Info Button
│   │   │
│   │   └── ProfileInfo Card Container (bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 shadow-xl)
│   │       └── ProfileInfo Component
│   │           ├── Startup Information Card (bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 shadow-xl)
│   │           │   ├── Title Container
│   │           │   └── Contact Info Container (space-y-4)
│   │           │       ├── Email Row (flex items-center space-x-3)
│   │           │       ├── Phone Row (flex items-center space-x-3)
│   │           │       └── Location Row (flex items-center space-x-3)
│   │           │
│   │           └── Profile Status Card (bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 shadow-xl)
│   │               ├── Progress Circle Container (relative w-20 h-20 mx-auto)
│   │               │   ├── SVG Progress Circle
│   │               │   └── Percentage Text (absolute inset-0 flex items-center justify-center)
│   │               ├── Status Label
│   │               └── Complete Profile Button
│   │
│   └── Right Column Container (lg:col-span-2) - Empty
│
└── Company Details Section (space-y-6)
    ├── AboutCompany Card Container (bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 shadow-xl)
    │   └── AboutCompany Component
    │       ├── Title Container
    │       ├── Description Container
    │       └── Read More Link
    │
    ├── VisionMission Card Container (bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 shadow-xl)
    │   └── VisionMission Component
    │       ├── Grid Container (grid grid-cols-1 lg:grid-cols-2 gap-6)
    │       │   ├── Vision Section Container (bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 shadow-xl)
    │       │   │   ├── Title Row (flex items-center space-x-2)
    │       │   │   │   ├── Eye Icon
    │       │   │   │   └── Vision Title
    │       │   │   └── Vision List Container (space-y-3)
    │       │   │       ├── Vision Point 1 (flex items-start)
    │       │   │       ├── Vision Point 2 (flex items-start)
    │       │   │       └── Vision Point 3 (flex items-start)
    │       │   │
    │       │   └── Mission Section Container (bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 shadow-xl)
    │       │       ├── Title Row (flex items-center space-x-2)
    │       │       │   ├── Target Icon
    │       │       │   └── Mission Title
    │       │       └── Mission List Container (space-y-3)
    │       │           ├── Mission Point 1 (flex items-start)
    │       │           ├── Mission Point 2 (flex items-start)
    │       │           └── Mission Point 3 (flex items-start)
    │
    ├── Offerings Card Container (bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 shadow-xl)
    │   └── Offerings Component
    │       ├── Title Container
    │       └── Offerings Grid/List Container
    │
    └── Interests Card Container (bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 shadow-xl)
        └── Interests Component
            ├── Title Container
            └── Interests Grid/List Container
```

### 3. Footer Section
```
Footer (/src/components/feed/footer/index.tsx)
├── Footer Container
│   ├── Footer Links Container
│   ├── Social Media Icons Container
│   └── Copyright Information Container
```

## Container Types & Styling

### Background Containers
- **Root Container**: `min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden`
- **Animated Background**: `absolute inset-0 overflow-hidden pointer-events-none`
- **Content Container**: `relative z-10`

### Card Containers
- **Glass-morphism Cards**: `bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 shadow-xl`
- **Profile Cards**: Same as glass-morphism with specific content
- **Section Cards**: Same styling for consistent appearance

### Layout Containers
- **Grid Containers**: `grid grid-cols-1 lg:grid-cols-3 gap-8`
- **Flex Containers**: `flex items-center space-x-8`
- **Stack Containers**: `space-y-6` for vertical spacing

### Content Containers
- **Text Containers**: `flex-1 min-w-0` for text overflow handling
- **Icon Containers**: `flex-shrink-0` for fixed-size icons
- **Button Containers**: Various button wrapper styles

## Component Relationships

### Parent-Child Relationships
1. **ProfilePage** → **Header** (navigation and user menu)
2. **ProfilePage** → **Main Content** (profile and company information)
3. **ProfilePage** → **Footer** (additional links and info)

### Sibling Relationships
1. **ProfileHeader** ↔ **ProfileInfo** (side-by-side in left column)
2. **AboutCompany** ↔ **VisionMission** ↔ **Offerings** ↔ **Interests** (vertical stack)

### Data Flow
1. **Header** → Navigation state and user actions
2. **ProfileHeader** → Company basic information display
3. **ProfileInfo** → Contact details and profile status
4. **Company Details** → Comprehensive company information display

## Responsive Behavior

### Mobile Layout (default)
- Single column layout
- Stacked components
- Full-width cards

### Desktop Layout (lg: breakpoint)
- Grid layout for profile section (1/3 + 2/3)
- Side-by-side vision and mission
- Optimized spacing and sizing

## State Management

### Local State
- `isFilterOpen` in ProfilePage for mobile menu
- Component-specific state in each child component

### Props Flow
- `onToggleFilter` passed from ProfilePage to Header
- Component-specific props for configuration

## Styling Architecture

### Theme Consistency
- Dark gradient background throughout
- Glass-morphism effect on all cards
- Consistent border and shadow styling
- Unified color palette (grays, blues, whites)

### Animation Elements
- Pulsing background circles with different delays
- Smooth transitions on hover states
- Responsive animations based on screen size 