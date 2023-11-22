const setupServer = () => {
  const knex = require('./src/db/knex');
  const express = require('express');
  const app = express();
  require('dotenv').config();

  // app.use((req, res, next) => {
  //   const origin = req.headers.origin;
  //   console.log('origin : ', origin);
  //   if (origin === process.env.FRONTEND_ORIGIN || 'http://localhost:3000') {
  //     res.header('Access-Control-Allow-Origin', origin);
  //     res.header(
  //       'Access-Control-Allow-Headers',
  //       'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept'
  //     );
  //     res.header('Access-Control-Allow-Methods', 'PUT, DELETE, OPTIONS');
  //     res.header('Access-Control-Allow-Credentials', true);
  //   }
  //   if ('OPTIONS' == req.method) {
  //     res.send(204); // 204: No Content
  //   } else {
  //     next();
  //   }
  // });
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  // app.use('/', express.static(__dirname + '/browser/index'));
  app.get('/', (req, res) => {
    // res.setHeader('Access-Control-Allow-Origin', origin);
    res.send('API is running..');
  });

  app.get('/api/:tid', async (req, res) => {
    const _tid = req.params.tid;
    const result = await knex(`table${_tid}`).select().orderBy('id');
    console.log('GET result : ', _tid, result);
    res.status(200).send(result);
  });

  app.post('/api/:tid', async (req, res) => {
    const _tid = req.params.tid;
    const result = await knex(`table${_tid}`)
      .insert(req.body)
      .returning(['id', 'title', 'description']);
    console.log('POST result : ', _tid, result);
    res.status(200).send(result);
  });

  // なぜかPATCHだけできない。。。
  // app.patch('/api/:tid/:id', async (req, res) => {
  //   const _tid = req.params.tid;
  //   const _id = req.params.id;
  //   const key = Object.keys(req.body);
  //   const val = Object.values(req.body);
  //   console.log('_tid, _id, key, val : ', _tid, _id, key, val);
  //   const result = await knex(`table${_tid}`)
  //     .where('id', _id)
  //     .update(key, val)
  //     .returning(['id', key]);
  //   console.log('PATCH result : ', result);
  //   res.status(200).send(result);
  // });

  app.delete('/api/:tid/:id', async (req, res) => {
    console.log('req.params : ', req.params);
    const _tid = req.params.tid;
    const _id = req.params.id;
    const result = await knex(`table${_tid}`)
      .where('id', _id)
      .del()
      .returning('id');
    console.log('DELETE result : ', _tid, result);
    res.status(200).send(result);
  });

  return app;
};
module.exports = { setupServer };

require('dotenv').config();
const PORT = process.env.PORT || 8000;
const server = setupServer();
server.listen(PORT, () => {
  console.log(`listening... http://localhost:${PORT}`);
});
