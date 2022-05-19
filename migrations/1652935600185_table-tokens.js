exports.up = (pgm) => {
  pgm.createTable('tokens', {
    token: {
      type: 'TEXT',
      unique: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('tokens');
};
