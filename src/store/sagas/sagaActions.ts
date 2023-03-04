// create saga actions ONLY
export const sagaActions = {
  FETCH_PRODUCTS_DATA: 'saga/FETCH_PRODUCTS_DATA',
  FETCH_ORDER_TO_SERVER: 'saga/FETCH_ORDER_TO_SERVER',
};

const sagaActionsCreator = {
  loadProducts: () => ({ type: sagaActions.FETCH_PRODUCTS_DATA }),
  sendOrder: () => ({ type: sagaActions.FETCH_ORDER_TO_SERVER }),
};

export const {
  loadProducts,
  sendOrder,
} = sagaActionsCreator;
