import { pgTable, text, uuid, integer, boolean, timestamp } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"

export const files = pgTable("files", {
    id: uuid("id").defaultRandom().primaryKey(),
    
    // basic file or folder information
    name: text("name").notNull(),
    path: text("path").notNull(),
    size: integer("size").notNull(),
    type: text("type").notNull(),

    //storage information 
    filerUrl: text("file_url").notNull(),      // url to access file
    thumbnailUrl: text("thumnail_url"),

    // Ownership
    userId: text("user_id").notNull(),
    parentId: uuid("parent_id"),        // Parent folder if (null for root items)

    //file or folder flags
    isFolder: boolean("is_folder").default(false).notNull(),
    isStarred: boolean("is_starred").default(false).notNull(),
    isTrash: boolean("is_trash").default(false).notNull(),

    //Timestamps
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),

})

export const filesRelations = relations(files, ({one, many}) => ({
    parent: one(files, {
        fields: [files.parentId],
        references: [files.id]
    }),

    //relationship to child files/folder
    children: many(files)
}))

export const File = typeof files.$inferSelect;
export const NewFile = typeof files.$inferInsert;   