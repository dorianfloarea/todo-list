module.exports = ({
  itemsService,
}) => {
  const createItem = (req, res, next) => {
    try {
      itemsService.createItem(req.body);
      res.status(201).send();
    } catch (error) {
      next(error);
    }
  };

  const getAllItems = (req, res, next) => {
    res.json(itemsService.getAllItems());
  };

  const getItem = (req, res, next) => {
    try {
      res.json(itemsService.getItem(req.params.id));
    } catch (error) {
      next(error);
    }
  };

  const updateItem = (req, res, next) => {
    try {
      res.json(itemsService.updateItem(
          req.params.id,
          req.body,
      ));
    } catch (error) {
      next(error);
    }
  };

  const deleteItem = (req, res, next) => {
    try {
      itemsService.deleteItem(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };

  return {
    createItem,
    getAllItems,
    getItem,
    updateItem,
    deleteItem,
  };
};
