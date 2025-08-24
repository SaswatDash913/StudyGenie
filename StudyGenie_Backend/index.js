import dotenv from "dotenv";
dotenv.config({ path: "./.env" }); 

import { app } from "./app.js";
import { connectDatabase } from "./db/index.js";

connectDatabase()
  .then(() => {
    app.listen(process.env.PORT || 8080, () => {
      console.log(`Server is LIVE on port ${process.env.PORT || 8080}`);
    });
  })
  .catch((error) => {
    console.log("Database connection error:", error);
  });
