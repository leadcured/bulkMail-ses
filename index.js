import { app } from "./app.js";
//import { connectDB } from "./data/database.js";



app.listen(process.env.PORT, () => {
  console.log(
    `Server is working on port:${process.env.PORT} in ${process.env.NODE_ENV} Mode`
  );
});