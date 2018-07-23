import React, { Component } from 'react';
import Home from './presenter.js';

class Container extends Component {
  state = {
    loading: true,
    crypto_list: [],
    bids: [],
    asks: [],
    selectedCrypto: { label: 'BTC/USD', value: 'BTC_USD'},
    exchangeOptions: ["krakenEA", "binanceEA", "bittrexEA", "kucoinEA"],
    selectedExchange: ["krakenEA", "binanceEA", "bittrexEA", "kucoinEA"]
  };

  componentDidMount() {
    const { crypto, getCryptoList, getOrderBook } = this.props;

    if (!crypto) {
      getCryptoList();
      getOrderBook('BTC_USD');
    } else {
      this.updateDropdown(this.props.crypto_list);
      this.setState({
        crypto_list: this.props.crypto_list,
        order_book: this.props.order_book,
        loading: false,
        getOrderBook: this.props.getOrderBook
      });
    }

    setInterval(() => getOrderBook(this.state.selectedCrypto.value), 7000);
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.crypto_list) {
      this.updateDropdown(nextProps.crypto_list);
      this.setState({
        crypto_list: nextProps.crypto_list,
        loading: false,
      });
    }

    if (nextProps.order_book) {
      this.setState({
        order_book: nextProps.order_book,
        bids: nextProps.order_book.bids,
        asks: nextProps.order_book.asks,
      });
    }
  }

  updateDropdown = list => {
    let res = [];

    if (list.length > 0) {
      list.map(x => res.push({value: x.replace('/', '_'), label: x}));
    }

    this.setState({ dropdown: res });
  }

  updateExchanges = selectedValues => {
    this.setState({ selectedExchange: selectedValues.map(x => x.value) });
  }

  updateValue = selectedValue => {
    this.setState({ selectedCrypto: selectedValue });
    this.props.getOrderBook(selectedValue.value);
  }

  render() {
    return (
      <Home {...this.props} {...this.state}
        updateValue={this.updateValue}
        updateExchanges={this.updateExchanges}
      />
    );
  }
}

export default Container;
