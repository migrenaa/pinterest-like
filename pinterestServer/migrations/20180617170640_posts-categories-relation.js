
exports.up = function(knex, Promise) {
    return knex.schema.createTable('postCategories', function (t) {
            t.integer('postId').notNullable().unsigned().references('id').inTable('posts');
            t.integer('categoryId').notNullable().unsigned().references('id').inTable('categories');
        });
};

exports.down = function(knex, Promise) {
      return knex.schema.dropTableIfExists('postCategories')
};
