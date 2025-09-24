import http from "http";
import app from "./app";
import db from "./libs/db";
import { error } from "console";

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);



db().then(()=>{server.listen(PORT, () => {
  console.log(` Server is running at http://localhost:${PORT}`);
})}).catch(error)

