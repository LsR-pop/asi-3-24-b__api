export const up = async (knex) => {
    await knex.schema.createTable("products", (table) => {
      table.increments("id")
      table.text("content").notNullable()
      table.integer("userId").notNullable().references("id").inTable("users")
      table.datetime("createdAt").notNullable()
      table.datetime("updatedAt").notNullable()
      table.timestamps(true, true, true)
    })
  }
  
  export const down = async (knex) => {
    await knex.schema.dropTable("comments")
  }