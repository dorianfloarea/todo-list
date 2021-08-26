const {ItemModel} = require('../models');

module.exports = ({
  itemsRepository,
}) => {
  const createItem = (itemData) => {
    const item = new ItemModel(itemData);
    return itemsRepository.createItem(item);
  };

  const getAllItems = () => {
    return itemsRepository.getAllItems();
  };

  const getItem = (id) => {
    return itemsRepository.getItem(id);
  };

  const updateItem = (id, itemData) => {
    const item = new ItemModel(itemData);
    return itemsRepository.updateItem(id, item);
  };

  const deleteItem = (id) => {
    return itemsRepository.deleteItem(id);
  };

  const deleteAllItems = () => {
    return itemsRepository.deleteAllItems();
  };

  return {
    createItem,
    getAllItems,
    getItem,
    updateItem,
    deleteItem,
    deleteAllItems,
  };
};
