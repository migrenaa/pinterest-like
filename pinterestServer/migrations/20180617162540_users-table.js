exports.up = function (knex) {
    return knex.schema.createTable('users', function (t) {
      t.increments('id').primary()
      t.string('name').notNullable()
      t.string('email').notNullable()
      t.string('password').notNullable()
      t.integer('role').notNullable();
      t.string('token')
      t.timestamps(false, true)
    })
  }
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists('user')
  }