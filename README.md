🏠 FindMyPG - Property Solutions Made Simple
A modern, full-stack property management platform built with Next.js that connects tenants, buyers, and property owners across India. Whether you need a PG room, family apartment, or investment property, FindMyPG provides verified listings with complete transparency.
✨ Features
🔍 Property Search & Discovery

Advanced Search: Search properties by location, type, and amenities
Interactive Maps: Google Maps integration with property markers
Smart Filters: Filter by bedrooms, bathrooms, parking, and property type
Real-time Results: Dynamic property listings with instant updates

🏡 Property Management

Easy Listing Creation: Step-by-step property listing process
Image Upload: Multiple image support for property showcases
Property Details: Comprehensive property information forms
Draft & Publish: Save drafts and publish when ready

👤 User Management

Secure Authentication: Clerk authentication with social login
User Profiles: Comprehensive user dashboard
Listing Management: View, edit, and manage your properties
Contact System: Direct communication between owners and tenants

🌓 Modern UI/UX

Dark/Light Theme: Toggle between themes with persistent preferences
Responsive Design: Mobile-first responsive design
Modern Components: shadcn/ui component library
Smooth Animations: Enhanced user experience with transitions

🛠️ Tech Stack
Frontend

Next.js 15 - React framework with App Router
React 18 - UI library
Tailwind CSS - Utility-first CSS framework
shadcn/ui - Modern component library
Lucide React - Beautiful icons

Backend & Database

Supabase - PostgreSQL database with real-time subscriptions
Supabase Storage - File storage for property images

Authentication & User Management

Clerk - Complete authentication solution
User profiles - Integrated user management

Maps & Location

Google Maps API - Interactive maps and location services
Google Places API - Address autocomplete and geocoding

Additional Libraries

Formik - Form handling and validation
Sonner - Toast notifications
React Google Maps API - Google Maps integration
React Google Places Autocomplete - Address search

🚀 Getting Started
Prerequisites

Node.js 18+
npm or yarn
Supabase account
Clerk account
Google Cloud Console account (for Maps API)

Installation

Clone the repository

bashgit clone https://github.com/yourusername/FindMyPG.git
cd FindMyPG

Install dependencies

bashnpm install
# or
yarn install

Environment Setup
Create a .env.local file in the root directory and add the following variables:

env# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_API_KEY=your_supabase_anon_key
NEXT_PUBLIC_IMAGE_URL=your_supabase_storage_url

# Google Maps API
NEXT_PUBLIC_GOOGLE_PLACE_API_KEY=your_google_places_api_key

# Email Service (Optional)
RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL=your_verified_sender_email

Database Setup
Set up your Supabase database with the following tables:

listing table:
sqlCREATE TABLE listing (
  id SERIAL PRIMARY KEY,
  address TEXT,
  coordinates JSONB,
  type VARCHAR(50),
  propertyType VARCHAR(100),
  bedroom INTEGER,
  bathroom INTEGER,
  builtIn INTEGER,
  parking INTEGER,
  lotSize INTEGER,
  area INTEGER,
  sellingPrice INTEGER,
  hoa INTEGER,
  description TEXT,
  active BOOLEAN DEFAULT FALSE,
  profileImage TEXT,
  fullName TEXT,
  createdBy TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
listingImages table:
sqlCREATE TABLE listingImages (
  id SERIAL PRIMARY KEY,
  url TEXT,
  listing_id INTEGER REFERENCES listing(id),
  created_by TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

Storage Setup
Create a storage bucket named listingImages in your Supabase dashboard.
Run the development server

bashnpm run dev
# or
yarn dev
Open http://localhost:3000 to view the application.
📁 Project Structure
FindMyPG/
├── app/                          # Next.js 13+ App Router
│   ├── (auth)/                   # Authentication routes
│   │   ├── sign-in/              # Sign in page
│   │   └── sign-up/              # Sign up page
│   ├── (routes)/                 # Main application routes
│   │   ├── add-new-listing/      # Create new property listing
│   │   ├── edit-listing/         # Edit existing listings
│   │   ├── for-sell/            # Properties for sale
│   │   ├── rent/                # Rental properties
│   │   ├── user/                # User dashboard
│   │   └── view-listing/        # Individual property view
│   ├── _components/             # Reusable components
│   │   ├── Header.jsx           # Navigation header
│   │   ├── GoogleMapSection.jsx # Maps integration
│   │   ├── Listing.jsx          # Property listing cards
│   │   └── FilterSection.jsx    # Search filters
│   ├── globals.css              # Global styles
│   ├── layout.js               # Root layout
│   └── page.js                 # Homepage
├── components/ui/               # shadcn/ui components
├── lib/                        # Utility functions
├── Utils/supabase/             # Supabase client configuration
└── public/                     # Static assets
🔧 Key Features Implementation
Authentication Flow

Clerk handles all authentication flows
Protected routes using Clerk middleware
User profile integration with property listings

Property Listing Process

Address Selection: Google Places API for address autocomplete
Property Details: Comprehensive form with validation
Image Upload: Multiple image support with Supabase storage
Publishing: Draft/publish workflow

Search & Filter System

Location-based search with Google Maps
Advanced filtering by property attributes
Real-time results with database queries

Map Integration

Interactive Google Maps with property markers
Popup property cards on marker click
Responsive map design

🚢 Deployment
Vercel Deployment (Recommended)

Connect your GitHub repository to Vercel
Add all environment variables in Vercel dashboard
Deploy automatically on push to main branch

Manual Deployment
bashnpm run build
npm run start
📱 Mobile Responsiveness
The application is fully responsive and optimized for:

Mobile devices (320px+)
Tablets (768px+)
Desktop (1024px+)

🤝 Contributing

Fork the repository
Create a feature branch (git checkout -b feature/AmazingFeature)
Commit your changes (git commit -m 'Add some AmazingFeature')
Push to the branch (git push origin feature/AmazingFeature)
Open a Pull Request

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
🙏 Acknowledgments

Next.js for the amazing React framework
Supabase for the backend infrastructure
Clerk for authentication services
shadcn/ui for the beautiful UI components
Google Maps for location services

📞 Support
If you have any questions or need help with setup, please:

Create an issue in this repository
Check existing issues for solutions
Contact the development team


Made with ❤️ by Karan757
