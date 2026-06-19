# Portfolio Build Sprints

Here is your daily sprint plan, tailored specifically for your SvelteKit + FastAPI + Neon + Sanity stack. We will work through these one at a time.

## Sprint 1: Project Scaffolding
* **Goal**: By the end of this sprint, I will have the file structure for the frontend, backend, and CMS initialized.
* **Tasks**:
  * `[ ]` Initialize SvelteKit app in `/frontend`.
  * `[ ]` Set up Python virtual environment and FastAPI app in `/backend`.
  * `[ ]` Initialize Sanity Studio in `/sanity-studio`.
  * `[ ]` Configure root Git repository.
* **Key Concepts**: Virtual environments, package managers (npm/pip), and monorepo structure.
* **Checkpoint**: `npm run dev` shows SvelteKit UI, `uvicorn` serves FastAPI docs at `localhost:8000/docs`, and Sanity Studio runs locally.

## Sprint 2: Frontend Shell
* **Goal**: By the end of this sprint, I will have the basic pages and navigation working in SvelteKit.
* **Tasks**:
  * `[ ]` Setup global layout (`+layout.svelte`) and Navigation bar.
  * `[ ]` Create static pages: Home, About, Projects, Blog, Contact.
* **Key Concepts**: SvelteKit file-based routing, layouts, and standard web accessibility.
* **Checkpoint**: You can click through all the navigation links without the page reloading (client-side routing).

## Sprint 3: Database & ORM Setup
* **Goal**: By the end of this sprint, I will have PostgreSQL running on Neon and my FastAPI backend connected to it.
* **Tasks**:
  * `[ ]` Create a Neon project and get the database connection string.
  * `[ ]` Install SQLAlchemy and Alembic in FastAPI.
  * `[ ]` Define `User`, `Project`, and `Message` models.
  * `[ ]` Run Alembic migrations to create tables in Neon.
* **Key Concepts**: Object-Relational Mapping (ORM), environment variables, database migrations.
* **Checkpoint**: You can view the newly created tables inside the Neon dashboard.

## Sprint 4: Backend API (Projects & Messages)
* **Goal**: By the end of this sprint, I will have functional REST endpoints for reading and writing data.
* **Tasks**:
  * `[ ]` Build CRUD routes for Projects (`GET /projects`, `POST /projects`, etc.).
  * `[ ]` Build routes for Messages (`POST /messages`, `GET /messages`).
  * `[ ]` Set up Pydantic schemas for data validation.
* **Key Concepts**: RESTful design, data serialization/deserialization, Pydantic type validation.
* **Checkpoint**: You can use FastAPI's built-in Swagger UI to create a project and retrieve it, all saving to Neon.

## Sprint 5: Authentication (FastAPI + JWT)
* **Goal**: By the end of this sprint, I will have a secure login flow protecting my API.
* **Tasks**:
  * `[ ]` Implement password hashing (Passlib/Bcrypt).
  * `[ ]` Build `/auth/token` endpoint to generate JWTs.
  * `[ ]` Add middleware/dependency to FastAPI to protect routes.
  * `[ ]` Protect `POST /projects` and `GET /messages` so only admins can access them.
* **Key Concepts**: Cryptography (Hashing vs Encryption), JSON Web Tokens (JWT), OAuth2 Password flow.
* **Checkpoint**: Attempting to create a project without logging in returns a `401 Unauthorized` error.

## Sprint 6: Frontend Auth Integration
* **Goal**: By the end of this sprint, my SvelteKit frontend will be able to log in and access protected API routes.
* **Tasks**:
  * `[ ]` Create a login form in SvelteKit.
  * `[ ]` Write SvelteKit server action to call FastAPI `/auth/token` and store JWT in an HttpOnly cookie.
  * `[ ]` Create an `/admin/projects/new` page that attaches the cookie to requests.
* **Key Concepts**: HttpOnly Cookies, Cross-Site Scripting (XSS) prevention, Server-Side vs Client-Side API calls.
* **Checkpoint**: You can log in via the SvelteKit UI and successfully create a new portfolio project that saves to the DB.

## Sprint 7: CMS Integration
* **Goal**: By the end of this sprint, my SvelteKit blog will render real posts from Sanity.
* **Tasks**:
  * `[ ]` Define a `Post` schema in Sanity Studio and publish a test post.
  * `[ ]` Install `@sanity/client` in SvelteKit.
  * `[ ]` Write a GROQ query to fetch all posts on the `/blog` page.
  * `[ ]` Create dynamic route `/blog/[slug]` to render individual posts.
* **Key Concepts**: Headless CMS, GROQ (Graph-Relational Object Queries), Server-Side Rendering (SSR).
* **Checkpoint**: Editing a post title in Sanity instantly updates the SvelteKit frontend on refresh.

## Sprint 8: Styling & Polish
* **Goal**: By the end of this sprint, the site will be beautiful and responsive.
* **Tasks**:
  * `[ ]` Add CSS framework (e.g., Tailwind) or write custom CSS for layout components.
  * `[ ]` Style the project cards, blog post layouts, and contact form.
  * `[ ]` Add responsive media queries for mobile devices.
* **Key Concepts**: CSS Grid/Flexbox, Mobile-first design, component styling.
* **Checkpoint**: The site looks professional on both a laptop and a mobile phone.

## Sprint 9: CI/CD Pipeline
* **Goal**: By the end of this sprint, pushing code to GitHub will automatically run checks.
* **Tasks**:
  * `[ ]` Write a `.github/workflows/backend.yml` to test FastAPI.
  * `[ ]` Write a `.github/workflows/frontend.yml` to lint/build SvelteKit.
* **Key Concepts**: Continuous Integration, YAML workflows, automated testing.
* **Checkpoint**: Opening a Pull Request in GitHub shows passing green checks for both frontend and backend.

## Sprint 10: Production Deployment
* **Goal**: By the end of this sprint, both the frontend and backend will be live on the internet.
* **Tasks**:
  * `[ ]` Deploy FastAPI to Railway. Update CORS settings to allow production domain.
  * `[ ]` Deploy SvelteKit to Vercel. Set production environment variables.
  * `[ ]` Deploy Sanity Studio to Sanity Cloud (or Vercel).
* **Key Concepts**: Platform-as-a-Service (PaaS), Environment Variables in Production, CORS setup.
* **Checkpoint**: You can visit your Vercel URL and the site works exactly as it did locally.

## Sprint 11: Domain & Launch
* **Goal**: By the end of this sprint, the site will be on a custom domain with HTTPS.
* **Tasks**:
  * `[ ]` Configure DNS (A/CNAME records) to point custom domain to Vercel.
  * `[ ]` Run through a pre-launch checklist (testing contact form, mobile layout, checking console errors).
* **Key Concepts**: DNS Management (A records, CNAMEs), SSL Certificates.
* **Checkpoint**: Your website is live at `https://yourname.com`!
