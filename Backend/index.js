const express = require("express");
const port = process.env.PORT || 3000;
const app = express();
const cors = require("cors");
const connectDb = require("./src/db/connect");
const ApiError = require("./src/utils/apiError");
const morgan = require("morgan");
const globalError = require("./src/middlewares/errorMiddleware");
const authRoute = require("./src/routes/authRoute");

app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
	console.log(`mode: ${process.env.NODE_ENV}`);
}
app.get("/", (req, res) => {
	res.send("Hello, World!");
});
app.use("/api/auth", authRoute);

app.all("*", (req, res, next) => {
	next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});

// Global error handling middleware for express
app.use(globalError);
async function main() {
	try {
		await connectDb.authenticate();
		const server = app.listen(port, () => {
			console.log(`Server Is listening on port ${port}`);
		});
		// Event => list =>callback(err)
		// Handle rejection outside express
		process.on("unhandledRejection", (err) => {
			console.error(`UnhandledRejection Errors: ${err.name} | ${err.message}`);
			// just in case of the current request
			server.close(() => {
				console.error(`Shutting down....`);
				process.exit(1);
			});
		});
	} catch (error) {
		console.error(`There is problem while running this app ${error}`);
		process.exit(1);
	}
}

main();
