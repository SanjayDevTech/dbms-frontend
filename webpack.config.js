const path = require("path");

module.exports = {
    resolve: {
        alias: {
            "@pages": path.resolve(__dirname, "src/pages/"),
            "@utils": path.resolve(__dirname, "src/utils/"),
            "@components": path.resolve(__dirname, "src/components/"),
            "@images": path.resolve(__dirname, "src/images/"),
        }
    }
}