import connectDB from './db/index.js';
import { PORT } from './constants.js';
import {app} from "./app.js"
connectDB()
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`))
    })
    .catch(error => {
        console.error(`ERROR: ${error}`);
        throw error;
    })