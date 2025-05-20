const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
    name: 'Expense',
    columns: {
        id: { primary: true, type: 'int', generated: true},
        description: { type: 'varchar'},
        amount: { type: 'decimal', precision: 10, scale: 2},
        category: { type: 'varchar', default: 'Otros'},
        createdAt: { type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'}
    }
});