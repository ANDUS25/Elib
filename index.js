/* eslint-disable no-undef */
import app from "./src/app.js";
import { config } from "./src/config/config.js";
import connectToDB from "./src/config/db.js";

(async function () {
  // instead of calling this every where just add it in object file.
  await connectToDB();

  const PORT = config.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
})();
