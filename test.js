import chai from 'chai';
import chaiHttp from 'chai-http';
const expect = chai.expect;
chai.use(chaiHttp);
import app from './index.js';
import nock from 'nock';

describe('API /users/:id', () => {
  beforeEach(() => {
    nock('https://www.bitstamp.net')
      .persist()
      .get(/^(\/api\/v2\/ticker\/btcusd|\/api\/v2\/ticker\/ethusd)$/)
      .reply(200, {
        last: '1000',
      });
  });

  afterEach(() => {
    nock.cleanAll();
  });

  it('returns total user balance in USD', async () => {
    const res = await chai.request(app).get('/users/1');

    expect(res.status).to.equal(200);
    expect(res.body).to.equal(1000);
  });

  it('returns error if user is not found', async () => {
    const res = await chai.request(app).get('/users/0');

    expect(res.status).to.equal(404);
  });
});
