exports.up = function(knex) {
    return knex.schema.createTable('attendance', function(table) {
        table.increments('id').primary();
        table
            .integer('user_id')
            .unsigned()
            .notNullable();
        table.foreign('user_id').references('user.id');
        table.date('date').notNullable();
        table.time('arrival').notNullable();
        table.time('departure').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('attendance');
};
