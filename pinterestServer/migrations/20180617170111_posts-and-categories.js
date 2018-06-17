exports.up = function (knex) {
    return knex.schema.createTable('posts', function (t) {
        t.increments('id').primary()
        t.string('content').notNullable()
        t.string('photoUrl')
        t.integer('authorId').unsigned().references('id').inTable('users')
        t.timestamps(false, true)
    });
}
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists('posts')
  }