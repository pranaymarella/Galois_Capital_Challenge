// Actions

const SET_CRYPTO_LIST = "SET_CRYPTO_LIST";
const SET_ORDER_BOOK = "SET_ORDER_BOOK";

// Action Creators

function setCryptoList(crypto_list) {
  return {
    type: SET_CRYPTO_LIST,
    crypto_list
  };
}

function setOrderBook(order_book) {
  return {
    type: SET_ORDER_BOOK,
    order_book
  };
}

// API
function getAPI(endpoint) {
  return fetch(`${endpoint}`)
    .then(response => {
      if (response.status !== 200) {
        return response.status;
      }
      return response.json();
    })
    .then(json => json);
}

function getCryptoList() {
  return async (dispatch, getState) => {
    const crypto_list = await getAPI('/api/symbols');

    // console.log(crypto_list);
    if (crypto_list) {
      dispatch(setCryptoList(crypto_list));
    }
  };
}

function getOrderBook(symbol) {
  return async (dispatch, getState) => {
    const order_book = await getAPI('/api/' + symbol);

    console.log(order_book, symbol);
    if (order_book) {
      dispatch(setOrderBook(order_book));
    }
  }
}

// Initial State
const initialState = {};

// Reducer

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_CRYPTO_LIST:
      return applySetCryptoList(state, action);
    case SET_ORDER_BOOK:
      return applySetOrderBook(state, action);
    default:
      return state;
  }
}

// Reducer Functions

function applySetCryptoList(state, action) {
  const { crypto_list } = action;
  return {
    ...state,
    crypto_list
  };
}

function applySetOrderBook(state, action) {
  const { order_book } = action;
  return {
    ...state,
    order_book
  };
}

// Exports

const actionCreators = {
  getCryptoList,
  getOrderBook,
};

export { actionCreators };

export default reducer;
