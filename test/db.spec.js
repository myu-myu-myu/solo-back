const { expect, assert } = require('chai');
const knex = require('../knex');
const model = {
  getAll(table, _limit = 100) {
    return knex(table).select().limit(_limit);
  },
  getById(table, _id) {
    return knex(table).select().where('id', _id);
  },
}; // DB SQL model

describe('1. PostgreSQLのテスト', () => {
  it('1-1 データベースに接続できるか', () => {
    knex.raw('select 1 as result').catch(() => {
      assert.fail('データベースに接続できません');
    });
  });
  it('1-2 マイグレーションによりテーブルが作成されているか', () => {
    knex('table1')
      .select()
      .catch(() => assert.fail('table1が見つかりません'));
  });
  it('1-3 getAll >>> 配列データを返すか', async () => {
    const result = await model.getAll('table1');
    expect(result).to.be.an.instanceOf(Array);
  });
  it('1-4 getAll >>> 取得上限を設定できるか', async () => {
    const result = await model.getAll('table1', 3);
    expect(result.length).to.be.at.most(3);
  });
  it('1-5 getById >>> 指定IDのデータを取得できるか', async () => {
    const result = await model.getById('table1', 3);
    expect(result[0].id).to.eq(3);
  });
});
