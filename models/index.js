const User = require('./User');
const Track = require('./Track');

User.hasMany(Track, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

module.exports = {
    User, 
    Track
};