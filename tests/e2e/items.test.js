const app = require('../../src/app');
const supertest = require('supertest');

const items = [
  {title: 'Some string title'},
  {title: 'Some other string title'},
];

const {itemsService} = require('../../src/container');

describe('POST /items', () => {
  test('creates an item correctly', async () => {
    await supertest(app).post('/items')
        .send(items[0])
        .expect(201)
        .then((response) => {
          expect(response.body).toEqual({});
        });

    const allItems = itemsService.getAllItems();
    expect(allItems.length).toBe(1);
    expect(allItems[0]).toHaveProperty('id');
    expect(allItems[0].data).toEqual(items[0]);

    itemsService.deleteAllItems();
  });

  test('item must have a title', async () => {
    await supertest(app).post('/items')
        .send({notTitle: 'not the title'})
        .expect(422)
        .then((response) => {
          expect(response.body).toEqual({error: 'Item must have a title'});
        });
  });

  test('item title must be a string', async () => {
    await supertest(app).post('/items')
        .send({title: {not: 'a string'}})
        .expect(422)
        .then((response) => {
          expect(response.body).toEqual({error: 'Item title must be a string'});
        });
  });

  test('item payload is sanitized', async () => {
    await supertest(app).post('/items')
        .send({...items[0], somethingElse: 'some string'})
        .expect(201)
        .then((response) => {
          expect(response.body).toEqual({});
        });

    const allItems = itemsService.getAllItems();
    expect(allItems.length).toBe(1);
    expect(allItems[0]).toHaveProperty('id');
    expect(allItems[0].data).toEqual(items[0]);

    itemsService.deleteAllItems();
  });
});

describe('GET /items', () => {
  test('retrieves empty items', async () => {
    await supertest(app).get('/items')
        .expect(200)
        .then((response) => {
          expect(response.body).toEqual([]);
        });
  });

  test('retrieves all items', async () => {
    itemsService.createItem(items[0]);
    itemsService.createItem(items[1]);

    await supertest(app).get('/items')
        .expect(200)
        .then((response) => {
          expect(response.body[0].data).toEqual(items[0]);
          expect(response.body[1].data).toEqual(items[1]);
        });

    itemsService.deleteAllItems();
  });
});
describe('GET /item', () => {
  test('retrieves item that does not exist', async () => {
    await supertest(app).get('/items/0')
        .expect(404)
        .then((response) => {
          expect(response.body).toEqual({error: 'Item not found'});
        });
  });

  test('retrieves item that does exist', async () => {
    itemsService.createItem(items[0]);
    itemsService.createItem(items[1]);

    const allItems = itemsService.getAllItems();

    await supertest(app).get('/items/' + allItems[0].id)
        .expect(200)
        .then((response) => {
          expect(response.body).toHaveProperty('id');
          expect(response.body.data).toEqual(items[0]);
        });

    await supertest(app).get('/items/' + allItems[1].id)
        .expect(200)
        .then((response) => {
          expect(response.body).toHaveProperty('id');
          expect(response.body.data).toEqual(items[1]);
        });

    await supertest(app).get('/items/2')
        .expect(404)
        .then((response) => {
          expect(response.body).toEqual({error: 'Item not found'});
        });

    itemsService.deleteAllItems();
  });
});

describe('PUT /item', () => {
  test('updates an item that does not exist', async () => {
    await supertest(app).put('/items/0')
        .send(items[0])
        .expect(404)
        .then((response) => {
          expect(response.body).toEqual({error: 'Item not found'});
        });
  });

  test('item must have a title', async () => {
    itemsService.createItem(items[0]);

    const allItems = itemsService.getAllItems();

    await supertest(app).put('/items/' + allItems[0].id)
        .send({notTitle: 'not the title'})
        .expect(422)
        .then((response) => {
          expect(response.body).toEqual({error: 'Item must have a title'});
        });

    itemsService.deleteAllItems();
  });

  test('item title must be a string', async () => {
    itemsService.createItem(items[0]);

    const allItems = itemsService.getAllItems();

    await supertest(app).put('/items/' + allItems[0].id)
        .send({title: {not: 'a string'}})
        .expect(422)
        .then((response) => {
          expect(response.body).toEqual({error: 'Item title must be a string'});
        });

    itemsService.deleteAllItems();
  });

  test('item payload is sanitized', async () => {
    itemsService.createItem(items[0]);

    const allItems = itemsService.getAllItems();

    await supertest(app).put('/items/' + allItems[0].id)
        .send({...items[0], somethingElse: 'some string'})
        .expect(200)
        .then((response) => {
          expect(response.body).toHaveProperty('id');
          expect(response.body.data).toEqual(items[0]);
        });

    const allItemsAgain = itemsService.getAllItems();
    expect(allItemsAgain.length).toBe(1);
    expect(allItemsAgain[0]).toHaveProperty('id');
    expect(allItemsAgain[0].data).toEqual(items[0]);

    itemsService.deleteAllItems();
  });

  test('updates an item that does exist', async () => {
    itemsService.createItem(items[0]);
    itemsService.createItem(items[1]);

    const allItems = itemsService.getAllItems();

    await supertest(app).put('/items/' + allItems[0].id)
        .send(items[1])
        .expect(200)
        .then((response) => {
          expect(response.body).toHaveProperty('id');
          expect(response.body.data).toEqual(items[1]);
        });


    const allItemsAgain = itemsService.getAllItems();

    expect(allItemsAgain[0]).toHaveProperty('id');
    expect(allItemsAgain[0].data).toEqual(items[1]);
    expect(allItemsAgain[1]).toHaveProperty('id');
    expect(allItemsAgain[1].data).toEqual(items[1]);

    itemsService.deleteAllItems();
  });
});

describe('DELETE /item', () => {
  test('deletes an item that does not exist', async () => {
    await supertest(app).delete('/items/0')
        .send(items[0])
        .expect(404)
        .then((response) => {
          expect(response.body).toEqual({error: 'Item not found'});
        });
  });

  test('deletes an item that does exist', async () => {
    itemsService.createItem(items[0]);
    itemsService.createItem(items[1]);

    const allItems = itemsService.getAllItems();

    expect(allItems.length).toBe(2);
    expect(allItems[0]).toHaveProperty('id');
    expect(allItems[0].data).toEqual(items[0]);
    expect(allItems[1]).toHaveProperty('id');
    expect(allItems[1].data).toEqual(items[1]);

    await supertest(app).delete('/items/' + allItems[0].id)
        .expect(204)
        .then((response) => {
          expect(response.body).toEqual({});
        });

    const allItems2 = itemsService.getAllItems();

    expect(allItems2.length).toBe(1);
    expect(allItems2[0]).toHaveProperty('id');
    expect(allItems2[0].data).toEqual(items[1]);

    await supertest(app).delete('/items/' + allItems2[0].id)
        .expect(204)
        .then((response) => {
          expect(response.body).toEqual({});
        });

    expect(itemsService.getAllItems()).toEqual([]);

    await supertest(app).delete('/items/0')
        .expect(404)
        .then((response) => {
          expect(response.body).toEqual({error: 'Item not found'});
        });
  });
});
