const mongoose = require('mongoose');
const config = require('./app/config/index.js');
const app = require('./app.js');

async function startServer(){
    try {
        await mogoose.connect(config.db.uri);
        console.log("Connected to the database!");
        const port = config.db.port;
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        })
    }
    catch(error){
        console.error("Failed to connect to the database:", error);
        process.exit();
    }
}
