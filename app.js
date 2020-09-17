const Team = require("./lib/Team"); // Team class

 function init() {
    try {
        // Initialize a new Team object
        const team = new Team();

        // Start creating team to be rendered
        team.start();
        
    }
    catch (err) {
        console.error(err);
    }
};

init();