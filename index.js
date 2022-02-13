import express from 'express';
const app = express();
const port = 3000;
import userBalances from './data.js';
import superagent from 'superagent';

app.use(express.json());

// looks for user that matches given id, returns null if not found
const findUserDetails = (id) => {
  const userIds = Object.keys(userBalances);
  const foundUser = userIds.find((userId) => userId === `user-${id}`);
  if (!foundUser) {
    return null;
  }
  return foundUser;
};

// converts and sums up user's total balance in USD
const convertTallyAssets = (userBalance, btcUsdRate, ethUsdRate) => {
  const values = Object.values(userBalance);

  let counter = 0;
  return Object.keys(userBalance).reduce((previous, key) => {
    if (key === 'BTC') {
      return previous + values[counter] * btcUsdRate;
    } else if (key === 'ETH') {
      return previous + values[counter] * ethUsdRate;
    }
    counter++;
  }, 0);
};

app.get('/', async (req, res) => {
  res.send('Balance API Interview Task 1');
});

app.get('/users/:id', async (req, res) => {
  // fetch currency rates
  const btcUsdRes = await superagent.get(
    'https://www.bitstamp.net/api/v2/ticker/btcusd'
  );

  const ethUsdRes = await superagent.get(
    'https://www.bitstamp.net/api/v2/ticker/ethusd'
  );

  const btcUsdRate = btcUsdRes._body.last;
  const ethUsdRate = ethUsdRes._body.last;

  // find user in memory
  const result = findUserDetails(req.params.id);

  if (!result) {
    res.status(404).json('Error: Person provided does not exist');
  }

  // convert user balances
  const userBalance = userBalances[result];
  const userTotalAssets = convertTallyAssets(
    userBalance,
    btcUsdRate,
    ethUsdRate
  );

  res.json(userTotalAssets);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

export default app;
