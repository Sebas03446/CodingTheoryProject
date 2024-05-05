import Db from "../prisma.js";

export default defineNitroPlugin(nuxtApp => {
  new Db(); 
  console.log("Database initialized!");
});
