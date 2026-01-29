# Senabrata Platform - AI Coding Agent Instructions

## Project Overview
**Senabrata Capital** is a Next.js 16 full-stack platform for agricultural investment and marketplace operations, with PostgreSQL backend via Prisma ORM. The platform serves three primary user roles: regular Users (investors), Mitras (farmers/partners), and Admins.

## Architecture & Data Flow

### Stack
- **Framework**: Next.js 16.1.4 (App Router, React 19, TypeScript)
- **Database**: PostgreSQL with Prisma 7.3.0 (using `@prisma/adapter-pg`)
- **Styling**: Tailwind CSS v4, PostCSS
- **Key Dependencies**: pg (native PostgreSQL), prisma CLI

### Core Domain Models (see `prisma/schema.prisma`)
1. **User** - Account management with roles: USER, MITRA, ADMIN
2. **Product** - Inventory with `isPriority` flag for paid promotions ("FITUR SULTAN")
3. **ProductInventory** - Audit trail for stock changes (IN/OUT/RETURN types)
4. **Mitra** - Partner profiles with verification status and rating system
5. **Order** - Order lifecycle with `status` (PENDING→CONFIRMED→SHIPPED→DELIVERED) and `resiNumber` for tracking
6. **Transaction** - Payment records with optional Order relationship
7. **Investment** - User investments with ROI tracking (`expectedReturn`, `actualReturn`, `roi`)
8. **Story** - YouTube-embedded content with views/likes counters
9. **CharityDonation** - Charitable giving records
10. **Setting** - Global config (singleton pattern: `id="global-config"`)

### Critical Data Relationships
- **User → Investments/Orders/Transactions** (cascade delete on user removal)
- **Product → ProductInventory** (audit tracking)
- **Order → Product + User + Transactions** (payment workflow)
- **All user-related records cascade delete** when user is removed

## Development Workflows

### Database Operations
```bash
# Database synchronization (creates tables from schema)
npx db push

# Generate Prisma client after schema changes
npx prisma generate

# Seed database with initial data
npm run prisma:seed
# or directly:
node prisma/seed.js

# Database GUI browser (useful for development)
npx prisma studio
```

### Running the Application
```bash
npm run dev      # Start dev server (port 3000 with HMR)
npm run build    # Production build
npm start        # Production server
npm run lint     # Run ESLint check
```

### Prisma Client Setup (see `lib/prisma.ts`)
- Uses **singleton pattern** to prevent multiple PrismaClient instances during HMR
- PostgreSQL connection via `Pool` + `PrismaPg` adapter (not direct URL)
- Always import from `@/lib/prisma` for client access: `import { prisma } from "@/lib/prisma"`
- Connection logging masks password in console output

## App Structure & Routing Conventions

### Pages & Route Organization
```
/marketplace      - Product browsing (public)
/dashboard        - Admin control panel (private)
/finance          - Investment & transaction tracking (private)
/mitra-directory  - Partner lookup (private)
/mitra-directory/[id] - Individual mitra profiles
/products         - Product management
/products/[id]    - Product detail page
/story            - YouTube story content
/login            - Authentication (public)
/register         - User registration (public)
/komoditas        - Commodity listings
/market-price     - Market pricing data
/profile          - User profile (private)
/admin/settings   - Admin configuration
/admin/api/checkout - Checkout API endpoint
```

### Route Protection Pattern (see `app/components/Navbar.tsx`)
- Client-side guards via `"use client"` directive with `isLoggedIn` state
- Protected routes redirect to `/login` if user not authenticated
- Navigation items marked with `private: boolean` flag
- Example:
```tsx
const handleNavigation = (item) => {
  if (item.private && !isLoggedIn) {
    alert("Maaf Boss, area ini rahasia! Silakan login dulu ya.");
    window.location.href = '/login';
  }
};
```

## Project-Specific Conventions

### Naming & Code Style
- **Component Comments**: Use inline explanations in Indonesian (e.g., "NAVBAR DI ATAS: Melayang di semua halaman")
- **Variable Names**: Mix of camelCase and snake_case (match DB naming)
- **Model Names**: Map to lowercase plural table names (see `@@map()` directives)

### UI/Layout Patterns
- **Navbar**: Fixed position (`fixed top-0 z-[1000]`), glassmorphism effect (`backdrop-blur-xl`)
- **Main Content**: Wrapped in `<main>` with `pt-0 min-h-screen` (accounting for fixed navbar)
- **Global Styles**: Tailwind in `app/globals.css`, fonts via `next/font`
- **Color**: Neutral palette with `bg--50` base (double-dash class suggests customization)

### Database Column Types
- **IDs**: UUID strings (`@default(uuid())`)
- **Timestamps**: `createdAt DateTime @default(now())`, `updatedAt DateTime @updatedAt`
- **Enums**: Stored as strings in schema (no Enum type used), examples: role, status, type fields
- **Financial**: Float fields for amounts and prices
- **Status Fields**: Always include sensible default values

### Order & Transaction Workflows
- **Order Status**: PENDING → CONFIRMED → SHIPPED → DELIVERED
- **Payment Status**: UNPAID (default) - implies payment not yet collected
- **Resi (Tracking)**: Unique field, optional until shipment; default note: "Pesanan sedang diproses"
- **Transaction Types**: Not strictly defined in schema (string field), infer from context

### Investment Tracking
- **Status**: ACTIVE (default state)
- **ROI Fields**: `expectedReturn`, `actualReturn` (defaults to 0), `roi` (calculated field)
- **Dates**: `startDate` required, `endDate` optional (null for ongoing)

## API Development

### Route Handlers (Next.js App Router)
- Located in `app/[section]/api/[route]/route.ts`
- Pattern: Destructure JSON from request, validate with Prisma queries, return NextResponse
- Example checkout flow (`app/admin/api/checkout/route.ts`):
  1. Extract productId, customerName, customerWa
  2. Verify product exists
  3. Create Order with `status: "PENDING"`, `paymentStatus: "UNPAID"`
  4. Return success or error

### Error Handling
- Wrap try-catch around async Prisma operations
- Return appropriate HTTP status codes (404 for not found, 500 for server errors)
- Log errors with context for debugging

## Common Patterns & Gotchas

### Prisma Usage
- Always check field existence before using (many optional fields in schema)
- Use `upsert` for idempotent seed operations (see `prisma/seed.js`)
- Remember cascade deletes will remove related Orders/Transactions when User deleted
- `@unique` fields: email, username, resiNumber, referenceNo

### Next.js Specifics
- Path alias `@/` points to project root (configured in `tsconfig.json`)
- Client components use `"use client"` directive for interactivity
- HMR-safe: Global Prisma instance prevents reconnection on file saves
- Images from `public/` folder (e.g., `/Logo.png`)

### TypeScript Configuration
- Strict mode enabled: `"strict": true`
- ES2017 target with ESNext modules
- Auto-generated Next.js types in `.next/types/`
- Include all `.ts`, `.tsx`, `.mts` files

## External Integrations
- **YouTube**: Story model stores `youtubeUrl` and parsed `youtubeVideoId` separately
- **WhatsApp**: Customer contact via `customerWa` field in orders (integration point not yet implemented)
- **Banking**: Transaction payment methods placeholder (not fully implemented)

## Testing & Quality
- **Linting**: ESLint with Next.js core-web-vitals and TypeScript configs
- **Type Safety**: Full TypeScript coverage with `noEmit: true` (type-check only)
- **No Test Framework**: Current setup has no Jest/Vitest configuration

---

## Quick Reference: When Adding Features

✅ **Adding New Database Model**
1. Define in `schema.prisma` with proper relations
2. Use `@@map()` for table naming convention
3. Include timestamps, IDs, defaults
4. Run `npx db push` then `npx prisma generate`

✅ **Adding New Page**
1. Create folder in `app/[feature]/page.tsx`
2. Mark as `"use client"` if interactive
3. Import Navbar/Footer at root layout (already done)
4. Add to Navbar navItems if public-facing

✅ **Adding API Route**
1. Create `app/admin/api/[resource]/route.ts`
2. Import and use `prisma` from `@/lib/prisma`
3. Handle both success (NextResponse.json) and error cases
4. Validate inputs before database operations

✅ **Modifying Order Workflow**
1. Update order status constants in relevant handlers
2. Remember cascade delete implications
3. Update related Transaction records
4. Consider resiNumber tracking implications
