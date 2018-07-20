const express = require('express');
var rp = require('request-promise');

const app = express();
const port = process.env.PORT || 5000;

const base_url = 'https://admin.galois.capital';

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.get('/api/symbols', (req, res) => {
  let options = {
    method: 'POST',
    uri: base_url + '/desk_exchange_accounts/krakenEA/ccxt/',
    form: {
      action: 'fetch_symbols'
    },
    headers: {
      'Authorization': 'Bearer p5jQ7ORqiihmX5MoEuoi2fvUsyg0yD'
    }
  };

  rp(options).then(function (parsedBody) {
    let result = JSON.parse(parsedBody);
    res.send(result);
  }).catch(function (err) {
    res.send({ express: 'failed' });
  });
});

app.get('/api/:currency_pair', (req, res) => {
  const pair = req.params.currency_pair.replace('_', '/');
  let options = {
    method: 'POST',
    uri: base_url + '/companies/CC1/get_aggregated_book/',
    form: {
      account_type: 'desk',
      symbol: pair,
      exchange_list: ['krakenEA', 'binanceEA', 'bittrexEA', 'kucoinEA']
    },
    headers: {
      'Authorization': 'Bearer p5jQ7ORqiihmX5MoEuoi2fvUsyg0yD'
    }
  };

  rp(options).then(function (parsedBody) {
    let result = JSON.parse(parsedBody);
    res.send(result);
    // res.send({ express: pair });
  }).catch(function (err) {
    res.send({ express: 'failed' });
  });
});


app.listen(port, () => console.log(`Listening on port ${port}`));
