import { PrismaClient } from '@prisma/client';

class Db {
    static instance = new PrismaClient(); 

    constructor() {
        if (!Db.instance) {
            Db.instance = new PrismaClient();
            Db.instance.$connect().then(() => {
                console.log("Database connected!");
            });
        }
        return Db.instance;
    }
}

export default Db;
