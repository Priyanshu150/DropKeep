import {drizzle} from "drizzle-orm/neon-http"
import {migrate} from "drizzle-orm/neon-http/migrator"
import {neon} from "@neondatabase/serverless"
import * as dotenv from "dotenv"

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" })

// Validate environment variables 
if (!process.env.DATABASE_URL) {
    throw new Error("Database url is not set in .env.local");
}

// Main migration function
async function runMigration() {
    console.log("Starting databases migration....");

    try{
        //Create a neon SQL connection
        const sql = neon(process.env.DATABASE_URL!);
        
        // Initialization Drizzle with the connection
        const db = drizzle(sql);

        //Run migration from the drizzle folder 
        console.log("Running migration from ./drizzle folder");
        await migrate(db, {migrationsFolder: "./drizzle"});
        console.log("Database migration completed successfully!");
    }
    catch(error){
        console.error("Migration failed:", error);
        process.exit(1);
    }
} 

runMigration();