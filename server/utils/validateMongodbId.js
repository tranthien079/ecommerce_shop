const mongoose = require('mongoose');

const validateMongoDbId = (id) => {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new Error('This is not a valid MongoDB ID.');
}

module.exports = validateMongoDbId;
