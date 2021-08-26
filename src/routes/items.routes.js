module.exports = ({itemsController}) => {
  const express = require('express');
  /* eslint-disable */
  const router = express.Router();
  /* eslint-enable */

  router.post('/', itemsController.createItem);
  router.get('/', itemsController.getAllItems);
  router.get('/:id', itemsController.getItem);
  router.put('/:id', itemsController.updateItem);
  router.delete('/:id', itemsController.deleteItem);

  return router;
};
