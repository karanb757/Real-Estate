### 🏠 FindMyPG - Property Solutions Made Simple

```bash
A modern full-stack property management platform built with Next.js that connects tenants,
buyers, and property owners across India.  Whether you need a PG room, family apartment,
or investment property,

**FindMyPG** provides verified listings with complete transparency.
```

### ✨ Features
### 🔍 Property Search & Discovery
```bash
- Advanced search by location, type, and amenities  
- Interactive maps with property markers (Google Maps)  
- Smart filters (bedrooms, bathrooms, parking, property type)  
- Real-time dynamic results
```

### 🏡 Property Management
```bash
- Easy listing creation with step-by-step process  
- Multiple image upload for property showcases  
- Comprehensive property detail forms  
- Draft & publish workflow
```

### 👤 User Management
```bash
- Secure authentication with **Clerk** (social login included)  
- User profiles & dashboards  
- Manage, edit, and view property listings  
- Direct owner-tenant contact system
``` 

### 🌓 Modern UI/UX
```bash
- Dark/Light theme toggle (persistent)  
- Mobile-first responsive design  
- **shadcn/ui** components + smooth animations
```

---

### 🛠️ Tech Stack

**Frontend**
```bash
- Next.js 15 (App Router)  
- React 18  
- Tailwind CSS  
- shadcn/ui + Lucide React
```  

**Backend & Database**
```bash
- Supabase (PostgreSQL + real-time subscriptions)  
- Supabase Storage (images)
```

**Authentication**
```bash
- Clerk
```  

**Maps & Location**
```bash
- Google Maps API  
- Google Places API
```

**Other Libraries**
```bash
- Formik (forms)  
- Sonner (toasts)  
- React Google Maps API  
- React Google Places Autocomplete
```

---

### 🚀 Getting Started

### Prerequisites
```bash
- Node.js 18+  
- npm or yarn  
- Supabase account  
- Clerk account  
- Google Cloud Console account
```  

### Installation

```bash
git clone https://github.com/yourusername/FindMyPG.git
cd FindMyPG

# Install dependencies
npm install
# or
yarn install
```


Environment Setup
Create a .env.local file in the root directory:

### Clerk Authentication
```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
```

### Supabase Configuration
```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_API_KEY=your_supabase_anon_key
NEXT_PUBLIC_IMAGE_URL=your_supabase_storage_url
```

### Google Maps API
```bash
NEXT_PUBLIC_GOOGLE_PLACE_API_KEY=your_google_places_api_key
```

### Database Setup
```bash

CREATE TABLE listing (
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

CREATE TABLE listingImages (
  id SERIAL PRIMARY KEY,
  url TEXT,
  listing_id INTEGER REFERENCES listing(id),
  created_by TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## 📁 Project Structure
```bash

FindMyPG/
├── app/
│   ├── (auth)/
│   │   ├── sign-in/
│   │   └── sign-up/
│   ├── (routes)/
│   │   ├── add-new-listing/
│   │   ├── edit-listing/
│   │   ├── rent/
│   │   ├── for-sell/
│   │   ├── user/
│   │   └── view-listing/
│   ├── _components/
│   │   ├── Header.jsx
│   │   ├── GoogleMapSection.jsx
│   │   ├── Listing.jsx
│   │   └── FilterSection.jsx
│   ├── globals.css
│   ├── layout.js
│   └── page.js
├── components/ui/
├── lib/
├── Utils/supabase/
└── public/
pgsql
Copy code
```

🚢 Deployment Vercel (Recommended)

```bash
Connect repo to Vercel
Add environment variables
Deploy on push

npm run build
npm run start
```

### 🤝 Contributing Fork the repo

```bash
Create a feature branch (git checkout -b feature/Name)
Commit changes (git commit -m 'Add feature')
Push (git push origin feature/Name)
Open a Pull Request
```

### 📄 License
```bash
This project is licensed under the MIT License.
```

### 🙏 Acknowledgments

```bash
Next.js
Supabase
Clerk
shadcn/ui
Google Maps
```

💡 Made with ❤️ by Karan757
