const mongoose = require('mongoose');
const config = require('./app/config/index.js');
const app = require('./app.js');

async function startServer(){
    try {
        await mongoose.connect(config.db.uri);
        console.log("Connected to the database!");
        const PORT = config.app.port;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        })
    }
    catch(error){
        console.error("Failed to connect to the database:", error);
        process.exit();
    }
}
startServer();
