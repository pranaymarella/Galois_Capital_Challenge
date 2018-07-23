const express = require('express');
var rp = require('request-promise');

const app = express();
const port = process.env.PORT || 5000;

const base_url = 'https://admin.galois.capital';
var access_token = '';

rp({
  method: 'POST',
  uri: base_url + '/mfa/oauth2/token/',
  form: {
    grant_type: 'password',
    username: 'candidate1',
    password: 'VWs99M3mgXtPMRQe',
    scope: 'read write groups',
    client_id: 'A5PPXeV8GyYDnjlvMvgnyl1c6HxSetADpgNX2zFj',
    client_secret: 'OUa0kftm8rvi6YfGrHfnnkXBUaQUugUZhtH5qfhATpztgu3Vqz48OLpOBc81wwsWQmSu2j1OuxczaI4BouMsI7YZjgTdLMjgoIEoSrZpNEc98DkgTwmXwWp7VXhMiWfz'
  },
}).then(function (parsedBody) {
  const result = JSON.parse(parsedBody);
  access_token = result.access_token;
}).catch(function (err) {
  console.log('ERROR: ACCESS TOKEN NOT FOUND');
});

// Fetches the Currency Pairs. ex. BTC/USD
app.get('/api/symbols', (req, res) => {
  let options = {
    method: 'POST',
    uri: base_url + '/desk_exchange_accounts/krakenEA/ccxt/',
    form: {
      action: 'fetch_symbols'
    },
    headers: {
      'Authorization': 'Bearer ' + access_token
    }
  };

  rp(options).then(function (parsedBody) {
    let result = JSON.parse(parsedBody);
    res.send(result);
  }).catch(function (err) {
    res.send({ express: 'failed' });
  });
});

// Fetches the Order Book of the Given Currency Pair
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
      'Authorization': 'Bearer ' + access_token
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
