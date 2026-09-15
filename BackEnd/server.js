// Local dev entry point. Vercel doesn't use this file - it calls the
// exported app directly through api/index.js - this just keeps
// `npm run start-dev` behaving the way it always has.
import app from './index.js';

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
