# Assistant IA Base

Initial repository.

## Deployment (Vercel)

- Backend: The `backend/vercel.json` file pins the deployment to Vercel serverless functions using the Node.js 18 runtime for handlers placed under `backend/api/` (create as needed). No custom routes are defined so routing follows Vercel defaults.
- Frontend: When a frontend is added, deploy it as a Vercel project rooted at `frontend/` (static site or framework auto-detection). No environment variables are required for this setup.
