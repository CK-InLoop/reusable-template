# SaaS Boilerplate

A production-ready SaaS website starter built with Next.js 15+, Cloudflare D1, TailwindCSS, NextAuth.js, and Resend.

## 🚀 Features

- **Next.js 15+** with App Router
- **TailwindCSS** for styling
- **Cloudflare D1** database (SQLite-compatible)
- **NextAuth.js** for authentication
- **Resend** for email delivery
- **User signup** with email verification
- **Role-based access control** (Admin and User roles)
- **TypeScript** support
- **Responsive design**

## 📦 Tech Stack

- **Frontend**: Next.js 15+, React 19, TailwindCSS
- **Backend**: Next.js API Routes
- **Database**: Cloudflare D1 (SQLite-compatible)
- **Authentication**: NextAuth.js
- **Email**: Resend
- **Styling**: TailwindCSS
- **Language**: TypeScript

## 🛠️ Setup Instructions

### 1. Clone and Install Dependencies

```bash
git clone <your-repo-url>
cd reusable-template
npm install
```

### 2. Environment Setup

1. Create a `.env` file in the root directory:

```env
NEXTAUTH_SECRET=your-super-secret-key
NEXTAUTH_URL=http://localhost:3000
RESEND_API_KEY=re_xxxxxxxxxxxxx
RESEND_FROM_EMAIL=noreply@yourdomain.com
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD_HASH=your-hashed-password

# Optional: Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

2. Generate a password hash for the admin user:
```bash
node scripts/generate-password.js your-admin-password
```

### 3. Cloudflare D1 Database Setup

1. Install Cloudflare Wrangler CLI (if not already installed):
```bash
npm install -g wrangler
```

2. Login to Cloudflare:
```bash
wrangler login
```

3. Create a D1 database:
```bash
wrangler d1 create reusable-template-db
```

4. Copy the `database_id` from the output and update `wrangler.toml`:
```toml
[[d1_databases]]
binding = "DB"
database_name = "reusable-template-db"
database_id = "your-database-id-here"
```

5. Run database migrations:
```bash
wrangler d1 execute reusable-template-db --file=./migrations/0001_init.sql
```

6. For local development, you can use local D1:
```bash
wrangler d1 execute reusable-template-db --local --file=./migrations/0001_init.sql
```

### 4. Resend Email Setup

1. Sign up for a Resend account at [resend.com](https://resend.com)
2. Create an API key in your Resend dashboard
3. Add your API key to `.env` as `RESEND_API_KEY`
4. Set up your sending domain or use Resend's test domain (`onboarding@resend.dev`)
5. Add `RESEND_FROM_EMAIL` to your `.env` file

### 5. Run the Development Server

For local development with Cloudflare Pages:
```bash
npm run dev
```

Or if using Wrangler for local D1:
```bash
wrangler pages dev .next
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 🔐 Authentication

### User Signup & Email Verification

1. Users can sign up via the `/login` page (toggle to "Sign up")
2. After signup, a verification email is sent via Resend
3. Users must click the verification link in their email to activate their account
4. Once verified, users can log in

### Admin Login
- Admin user is configured via environment variables
- Admin credentials are stored in `.env`:
  - `ADMIN_EMAIL`: Admin email address
  - `ADMIN_PASSWORD_HASH`: Hashed admin password

### Role-based Access
- Admin users can access `/dashboard`
- Regular users can access the dashboard (if implemented)
- Unauthenticated users are redirected to `/login`

## 📁 Project Structure

```
├── app/
│   ├── api/
│   │   ├── auth/              # NextAuth handlers
│   │   ├── signup/            # User signup endpoint
│   │   └── verify-email/      # Email verification endpoint
│   ├── dashboard/             # Protected dashboard area
│   ├── login/                 # Login/Signup page
│   ├── verify-email/          # Email verification page
│   └── page.tsx               # Home page
├── components/
│   ├── AuthForm.tsx           # Authentication form (login/signup)
│   ├── ImageUploader.tsx      # Image upload component
│   └── Navbar.tsx             # Navigation component
├── lib/
│   ├── auth.ts                # Auth helper functions
│   ├── auth-context.tsx       # Auth context provider
│   ├── db.ts                  # D1 database client
│   ├── email.ts               # Resend email utilities
│   └── azure.ts               # Azure blob storage helpers (optional)
├── migrations/
│   └── 0001_init.sql          # D1 database schema
├── wrangler.toml               # Cloudflare Workers configuration
└── scripts/
    └── generate-password.js    # Password hash generator
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXTAUTH_SECRET` | NextAuth secret key | Yes |
| `NEXTAUTH_URL` | Application URL | Yes |
| `RESEND_API_KEY` | Resend API key | Yes |
| `RESEND_FROM_EMAIL` | Email address to send from | Yes |
| `ADMIN_EMAIL` | Admin user email | Yes |
| `ADMIN_PASSWORD_HASH` | Hashed admin password | Yes |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | No |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret | No |

### Optional Features

#### Google OAuth
To enable Google OAuth:
1. Set up a Google OAuth application
2. Add `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` to your `.env`

## 🚀 Deployment

### Cloudflare Pages (Recommended)

1. Push your code to GitHub
2. Connect your repository to Cloudflare Pages
3. Set build command: `npm run build`
4. Set output directory: `.next`
5. Add environment variables in Cloudflare Pages dashboard:
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL`
   - `RESEND_API_KEY`
   - `RESEND_FROM_EMAIL`
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD_HASH`
6. Link your D1 database in Cloudflare Pages settings
7. Deploy!

### Other Platforms

The application can be deployed to any platform that supports Next.js:
- Vercel (requires external database for D1)
- Netlify (requires external database for D1)
- Railway

**Note**: Cloudflare D1 works best when deployed on Cloudflare Pages/Workers. For other platforms, you may need to use an alternative database solution.

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🔄 Database Migrations

To create and run new migrations:

1. Create a new SQL file in `migrations/` directory
2. Run the migration:
```bash
wrangler d1 execute reusable-template-db --file=./migrations/your_migration.sql
```

For local development:
```bash
wrangler d1 execute reusable-template-db --local --file=./migrations/your_migration.sql
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues or have questions, please open an issue on GitHub.
