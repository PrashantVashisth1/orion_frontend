# OrionEduverse Component Hierarchy Map

## Application Structure

```
App.tsx (Root)
├── AuthProvider (Context)
├── Router
    ├── Routes
        ├── Route "/" → Navigate to "/prelogin"
        ├── Route "/prelogin" → Prelogin (PublicRoute)
        ├── Route "/postlogin" → HomePage (ProtectedRoute)
        ├── Route "/profile" → ProfilePage (ProtectedRoute)
        ├── Route "/edit-profile" → EditProfile (ProtectedRoute)
        ├── Route "/share-needs" → EnhancedShareNeedsForm (ProtectedRoute)
        ├── Route "/explore" → StartupListing (ProtectedRoute)
        ├── Route "/online-session" → OnlineSessionPage (ProtectedRoute)
        └── Route "/view-session" → ViewSession (ProtectedRoute)
```

## Profile Page Component Hierarchy

```
ProfilePage (/src/pages/profile/index.tsx)
├── Background Elements
│   ├── Custom Scrollbar Styles (CSS-in-JS)
│   └── Animated Background
│       ├── Blue Blur Circle (animate-pulse)
│       ├── Purple Blur Circle (animate-pulse delay-1000)
│       ├── Green Blur Circle (animate-pulse delay-2000)
│       └── Yellow Blur Circle (animate-pulse delay-3000)
│
├── Content Container (relative z-10)
│   ├── Header (/src/components/feed/header/index.tsx)
│   │   ├── Logo Placeholder
│   │   ├── Navigation Menu
│   │   │   ├── Home (active)
│   │   │   ├── Share Needs
│   │   │   ├── Explore
│   │   │   └── Online Sessions
│   │   ├── Notification Bell
│   │   └── User Dropdown Menu
│   │       ├── Profile
│   │       ├── Edit Profile
│   │       ├── My Activities
│   │       ├── Logout
│   │       └── Delete Profile
│   │
│   ├── Main Content (max-w-4xl mx-auto)
│   │   ├── Profile Information Section (Grid Layout)
│   │   │   ├── Left Column (lg:col-span-1)
│   │   │   │   ├── ProfileHeader Card
│   │   │   │   │   └── ProfileHeader (/src/components/feed/profile-header/index.tsx)
│   │   │   │   │       ├── Edit Button (absolute positioned)
│   │   │   │   │       ├── Avatar Placeholder (circular)
│   │   │   │   │       ├── Company Name ("Tech Flow AI Pvt. Lt.")
│   │   │   │   │       ├── Founded Year ("Founded - 2015")
│   │   │   │   │       └── "View full information" Button
│   │   │   │   │
│   │   │   │   └── ProfileInfo Card
│   │   │   │       └── ProfileInfo (/src/components/feed/profile-info/index.tsx)
│   │   │   │           ├── Startup Information Card
│   │   │   │           │   ├── Title ("Startup Information/ Highlights")
│   │   │   │           │   ├── Email (Tech Flow AI1234@gmail.com)
│   │   │   │           │   ├── Phone (+91 7868420255)
│   │   │   │           │   └── Location (Global)
│   │   │   │           │
│   │   │   │           └── Profile Status Card
│   │   │   │               ├── Progress Circle (75%)
│   │   │   │               ├── "Profile Status" Label
│   │   │   │               └── "Complete Your Profile →" Button
│   │   │   │
│   │   │   └── Right Column (lg:col-span-2) - Empty
│   │   │
│   │   └── Company Details Section (Vertical Stack)
│   │       ├── AboutCompany Card
│   │       │   └── AboutCompany (/src/components/feed/about-company/index.tsx)
│   │       │       ├── Title ("About The Company")
│   │       │       ├── Description Text
│   │       │       └── "Read more" Link
│   │       │
│   │       ├── VisionMission Card
│   │       │   └── VisionMission (/src/components/feed/vision-mission/index.tsx)
│   │       │       ├── Vision Section (Grid Left)
│   │       │       │   ├── Eye Icon
│   │       │   │   ├── Title ("Vision of Company")
│   │       │   │   └── Bullet Points List
│   │       │   │       ├── "To enable 100 million small businesses..."
│   │       │   │       ├── "Create a level playing field..."
│   │       │   │       └── "Make digital entrepreneurship accessible..."
│   │       │   │
│   │       │   └── Mission Section (Grid Right)
│   │       │       ├── Target Icon
│   │       │       ├── Title ("Mission of Company")
│   │       │       └── Bullet Points List
│   │       │           ├── "To democratize internet commerce..."
│   │       │           ├── "Empower individuals from all backgrounds..."
│   │       │           └── "Provide a zero-investment platform..."
│   │       │
│   │       ├── Offerings Card
│   │       │   └── Offerings (/src/components/feed/offerings/index.tsx)
│   │       │       ├── Title ("What do we Offer?")
│   │       │       └── Offerings List/Grid
│   │       │
│   │       └── Interests Card
│   │           └── Interests (/src/components/feed/interests/index.tsx)
│   │               ├── Title ("Interests of Company")
│   │               └── Interests Grid/List
│   │
│   └── Footer (/src/components/feed/footer/index.tsx)
│       ├── Footer Links
│       ├── Social Media Icons
│       └── Copyright Information
│
└── Theme Styling
    ├── Dark Gradient Background (from-gray-900 via-gray-800 to-gray-900)
    ├── Glass-morphism Cards (bg-gray-800/50 backdrop-blur-sm)
    ├── Border Styling (border-gray-700/50)
    └── Shadow Effects (shadow-xl)
```

## Related Component Files

### Core Profile Components
- `/src/pages/profile/index.tsx` - Main profile page
- `/src/components/feed/profile-header/index.tsx` - Company header with logo and basic info
- `/src/components/feed/profile-info/index.tsx` - Contact info and profile status
- `/src/components/feed/about-company/index.tsx` - Company description
- `/src/components/feed/vision-mission/index.tsx` - Vision and mission statements
- `/src/components/feed/offerings/index.tsx` - Company offerings/services
- `/src/components/feed/interests/index.tsx` - Company interests/categories

### Navigation & Layout Components
- `/src/components/feed/header/index.tsx` - Main navigation header
- `/src/components/feed/footer/index.tsx` - Footer component
- `/src/components/shared/header.tsx` - Alternative header component
- `/src/components/navigation/index.tsx` - Navigation component with auth modals

### Edit Profile Components
- `/src/pages/edit-profile/index.tsx` - Edit profile page
- `/src/components/edit-profile/index.tsx` - Company profile form
- `/src/components/feed/edit-profile-form/index.tsx` - Profile editing form
- `/src/components/feed/edit-profile-sidebar/index.tsx` - Edit profile sidebar

### UI Components (shadcn/ui)
- `/src/components/ui/button.tsx` - Button component
- `/src/components/ui/card.tsx` - Card component
- `/src/components/ui/dropdown-menu.tsx` - Dropdown menu
- `/src/components/ui/input.tsx` - Input component
- `/src/components/ui/textarea.tsx` - Textarea component
- `/src/components/ui/label.tsx` - Label component

### Context & Hooks
- `/src/contexts/AuthContext.tsx` - Authentication context
- `/src/hooks/use-toast.ts` - Toast notification hook

## Data Flow

1. **ProfilePage** loads and renders the main layout
2. **Header** component handles navigation and user menu
3. **ProfileHeader** displays company information (name, logo, founding year)
4. **ProfileInfo** shows contact details and profile completion status
5. **AboutCompany** displays company description
6. **VisionMission** shows vision and mission in a two-column layout
7. **Offerings** lists company services/products
8. **Interests** displays company interests/categories
9. **Footer** provides additional links and information

## Styling Architecture

- **Dark Theme**: Consistent dark gradient background with glass-morphism effects
- **Responsive Design**: Grid layouts that adapt from mobile to desktop
- **Component Isolation**: Each component has its own styling and state
- **Consistent Spacing**: Using Tailwind CSS spacing system
- **Animation**: Subtle pulse animations on background elements

## State Management

- **Local State**: Each component manages its own local state
- **Context**: AuthContext for user authentication state
- **Props**: Components receive props for configuration and callbacks
- **Event Handling**: Click handlers for navigation and user interactions 