import { actionCreators } from './../../redux/modules/crypto.js';
import { connect } from 'react-redux';
import Container from './container';

const mapStateToProps = (state, ownProps) => {
  const {
    crypto: { crypto_list, order_book }
  } = state;

  return {
    crypto_list,
    order_book
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getCryptoList: () => {
      dispatch(actionCreators.getCryptoList());
    },
    getOrderBook: symbol => {
      dispatch(actionCreators.getOrderBook(symbol));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
