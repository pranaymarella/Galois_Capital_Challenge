import React from 'react';
import './styles.css';

import Select from 'react-select';
import ChartistGraph from 'react-chartist';
import ReactLoading from 'react-loading';

const Empty = () => {
  return (
    <div className="Search">
      <div className="box">
        <ReactLoading className="loader" type={'spin'} color={'black'} height={50} width={50} />
      </div>
    </div>
  );
}

const Home = props => {
  return (
    <div className="Home">
      {props.loading ? <Empty /> : <Search {...props} />}
      <Graphs {...props} />
      <Legend />
    </div>
  );
};

const Graphs = props => {
  return (
    <div className="Graphs">
    {console.log(props)}
    { props.bids && props.bids.length !== 0 ? <BidChart data={props.bids} exchanges={props.selectedExchange} /> : <Empty />}
    { props.asks && props.asks.length !== 0 ? <AskChart data={props.asks} exchanges={props.selectedExchange} /> : ''}
    </div>
  );
}

const Legend = () => {
  return (
    <div className="Search">
      <div className="box">
        <h3>Legend</h3>
        <div className="legendItems">
          <div className="item">
            <div className="legendBox binance"></div>
            <p>Binance</p>
          </div>
          <div className="item">
            <div className="legendBox kraken"></div>
            <p>Kraken</p>
          </div>
          <div className="item">
            <div className="legendBox bittrex"></div>
            <p>Bittrex</p>
          </div>
          <div className="item">
            <div className="legendBox kucoin"></div>
            <p>Kucoin</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const Search = props => {
  const Exchanges = [
    { label: 'Kraken', value: 'krakenEA' },
    { label: 'Binance', value: 'binanceEA' },
    { label: 'Bittrex', value: 'bittrexEA' },
    { label: 'Kucoin', value: 'kucoinEA' },
  ];

  return (
    <div className="Search">
      <div className="box">
        <div className="dropdown">
          <h3>Currency Pair</h3>
          <Select
              id="crypto-select"
              ref={(ref) => { this.select = ref; }}
              defaultValue={ {label: 'BTC/USD', value: 'BTC_USD'} }
              onBlurResetsInput={false}
              onSelectResetsInput={false}
              autoFocus
              options={props.dropdown}
              simpleValue
              name="selected-crypto"
              onChange={props.updateValue}
              searchable={true}
              className="text"
          />
        </div>

        <div className="dropdown">
          <h3>Exchanges</h3>
          <Select
            defaultValue={Exchanges}
            isMulti
            name="colors"
            options={Exchanges}
            onChange={props.updateExchanges}
            className="basic-multi-select text"
            classNamePrefix="select"
          />
        </div>
      </div>
    </div>
  );
};


const BidChart = props => {
  var prices = props.data.total.map(x => x[0]);
  var total = props.data.total.map(y => y[1]);
  let binance = [];
  let bittrex = [];
  let kraken = [];
  let kucoin = [];

  binance = props.data.binance && props.exchanges.includes("binanceEA") ? props.data.binance.map(b => b[1]) : [0];
  bittrex = props.data.bittrex && props.exchanges.includes("bittrexEA") ? props.data.bittrex.map(b => b[1]) : [0];
  kraken = props.data.kraken && props.exchanges.includes("krakenEA") ? props.data.kraken.map(b => b[1]) : [0];
  kucoin = props.data.kucoin && props.exchanges.includes("kucoinEA") ? props.data.kucoin.map(b => b[1]) : [0];

  var data = {
    labels: prices.reverse(),
    series: [
      binance.reverse(),
      bittrex.reverse(),
      kraken.reverse(),
      kucoin.reverse()
    ]
  };

  var options = {
    width: '100%',
    height: '300px',
    reverseData: false,
    high: 1000,
    axisX: {
      labelInterpolationFnc: function(value, index) {
        return index % 41 === 0 ? value.toExponential(2) : null;
      }
    },
    axisY: {
      labelInterpolationFnc: function(value, index) {
        return index % 2 === 0 ? value : null;
      }
    },
    chartPadding: {
      top: 0,
      right: 35,
      bottom: 0,
      left: 10
    },
  }

  var type = 'Bar';

  return (
    <div className="Chart">
      <h3>Bids</h3>
      <ChartistGraph data={data} options={options} type={type} />
    </div>
  );
};

const AskChart = props => {
  var prices = props.data.total.map(x => x[0]);
  let total = props.data.total.map(y => y[1]);
  let binance = [];
  let bittrex = [];
  let kraken = [];
  let kucoin = [];

  binance = props.data.binance && props.exchanges.includes("binanceEA") ? props.data.binance.map(b => b[1]) : [0];
  bittrex = props.data.bittrex && props.exchanges.includes("bittrexEA") ? props.data.bittrex.map(b => b[1]) : [0];
  kraken = props.data.kraken && props.exchanges.includes("krakenEA") ? props.data.kraken.map(b => b[1]) : [0];
  kucoin = props.data.kucoin && props.exchanges.includes("kucoinEA") ? props.data.kucoin.map(b => b[1]) : [0];

  var data = {
    labels: prices,
    series: [
      binance,
      bittrex,
      kraken,
      kucoin
    ]
  };

  var options = {
    width: '100%',
    height: '300px',
    stackBars: 'true',
    high: 1000,
    axisX: {
      labelInterpolationFnc: function(value, index) {
        return index % 41 === 0 ? value.toExponential(2) : null;
      }
    },
    axisY: {
      position: 'end',
      labelInterpolationFnc: function(value, index) {
        return index % 2 === 0 ? value : null;
      }
    },
    chartPadding: {
      top: 0,
      right: 10,
      bottom: 0,
      left: 35
    },
  }

  var type = 'Bar';

  return (
    <div className="Chart">
      <h3>Asks</h3>
      <ChartistGraph data={data} options={options} type={type} />
    </div>
  );
};

export default Home;
