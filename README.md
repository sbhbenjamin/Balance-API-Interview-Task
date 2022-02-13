# Hodlnaut Coding Challenge

Thanks for taking the time to do our coding test!

**The reason we are using replit is so you don't have to go through the trouble of setting up a node.js environment. If you'd prefer to develop locally and upload your code to a git repo then feel free to do this and share the link.**

On the Hodlnaut website, users can have balances in various cryptocurrency assets including BTC and ETH. Users also want to view their total balance in another asset such as USD. To be able to do this, we need to fetch prices for pairs such as BTC/USD and ETH/USD to convert between assets.

To give an example, let’s say the user’s balance is 0.5 BTC and 2 ETH. If the current BTC/USD price is 60000 and the ETH/USD price is 3000, then the user’s total balance in USD would be 60000 \* 0.5 + 3000 \* 2 = 36000 USD.

### Submission

Please fork the repl.it, and share the link with us. You can add the answers to the question directly in the document.

---

## Task

Create **one API endpoint using Node and Express that takes in a user id and returns the user's total balance in USD**.

Keep the user’s balances stored in memory. An example of the data to be stored is provided at the end of this section. Feel free to add more entries or change the way the data is stored if you want, but this is not necessary.

You will need to fetch the current prices from a third party public API. You can use the price from any cryptocurrency exchange but it is recommended that you use Bitstamp.

Here is a link to their API docs: https://www.bitstamp.net/api/#ticker

Assume that the only assets that the user’s balance can contain are **BTC and ETH**.

Ensure the API endpoint works correctly by writing at least one test case using the **Mocha and Chai** frameworks.

There is a test scaffold `test.js` that you can use and `package.json` has been changed so that `npm run test` will run the unit tests.

It’s expected that this task should take less than 2-3 hours to complete. If you find yourself spending too much time on this task, then just give a short explanation about what aspects were particularly time consuming and what steps you would’ve done in order to complete the task.

Aim to write clear and concise code.

```
const userBalances = {
  "user-1": {
    "BTC": "0.5",
    "ETH": "2"
  },
  "user-2": {
    "BTC": "0.1",
  },
  "user-3": {
    "ETH": "5",
  },
}
```

## Questions

**1. (Optional) If you didn’t have time to complete your intended design, what else would you have done?**

> ANSWER

**2. Which took the most time? What did you find most difficult?**

> For the tests, mocking requests to the external API took the most time as there were issues with the mocking library I was using and the HTTP client I was using. I also took some time to learn the syntax of mocha and chai, as I have never used those libraries before but it was relatively quick as it is similar to other testing tools and paradigms. Other than that, the assignment was doable.

**3. If we wanted the balance to update on the frontend more often (10 times per second), how would you improve the current system to handle this?**

> Since we want the balance to update on the frontend more often, this means that we would need to call the external api more often.

It might be a good idea for our user balance API to be separated from the external API. As we need the data 10 times per second, I would use Bitstamp's websocket api instead of the HTTP api. This would provide real-time updates on the currency rates, which could be better suited for the requirements of the app.

Due to the huge number of requests per second, I would ping the websocket api in the frontend instead of the backend as that is the data that would change more than the user's balance. This way, we would not have to ping the backend 10 times per second, and we only make a request to the backend when necessary (e.g. when the user's balance changes).

**4. How did you find the test overall? If you have any suggestions on how we can improve the test, we'd love to hear them!**

> I found the test overall okay. I was especially intrigued by question 3 actually, the question was really fun and interesting to think about! I did not like using replit for the assessment though, as I could not test the individual resource (/users/:id). Also, I think the starter repo does not run, as index.js is written in commonJS but the package.json defines the project to use es modules for mocha instead.
