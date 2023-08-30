const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Topics API",
            version: "1.0.0",
            description: "A simple Topics API",
        },
        servers: [
            {
                url: "https://localhost:3000",
            },
        ],
    },
    apis: ["./pages/api/**/*.js"], // Files containing the API definitions
};

const specs = swaggerJsdoc(options);

module.exports = specs;
