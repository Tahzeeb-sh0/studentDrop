import app from './app.js';
import { initializeDatabase } from './models/index.js';
const port = Number(process.env.PORT || 4000);
async function start() {
    await initializeDatabase();
    app.listen(port, () => {
        console.log(`Backend listening on port ${port}`);
    });
}
start().catch((err) => {
    console.error('Failed to start server', err);
    process.exit(1);
});
