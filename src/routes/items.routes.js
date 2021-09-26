module.exports = ({itemsController}) => {
  const express = require('express');
  /* eslint-disable */
  const router = express.Router();
  /* eslint-enable */

  router.route('/')
      .post(itemsController.createItem)
      .get(itemsController.getAllItems);

  router.route('/:id')
      .get(itemsController.getItem)
      .put(itemsController.updateItem)
      .delete(itemsController.deleteItem);

  return router;
};
