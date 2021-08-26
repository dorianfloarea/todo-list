const {DataInvalidError} = require('../errors/types');
const BaseModel = require('./base.model');

class ItemModel extends BaseModel {
  constructor(data) {
    super(data);
  }

  static get storageSpace() {
    return 'items';
  }

  sanitize(data) {
    if (!data.hasOwnProperty('title')) {
      throw new DataInvalidError('Item must have a title');
    }

    if ((typeof data.title) !== 'string') {
      throw new DataInvalidError('Item title must be a string');
    }

    const {title} = data;

    return {title};
  };
}

module.exports = ItemModel;
