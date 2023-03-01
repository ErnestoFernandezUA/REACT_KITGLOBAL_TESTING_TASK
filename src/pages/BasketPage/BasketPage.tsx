import { FunctionComponent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { IoRemove, IoAdd, IoTrash } from 'react-icons/io5';
import {
  useAppDispatch,
  useAppSelector,
} from '../../store/hooks';

import {
  addProductToBasket,
  clearBasket,
  deleteProductInBasket,
  removeProductFromBasket,
  selectBasket,
  selectBasketError,
  selectShowSusses,
  selectStatusPosting,
  selectTotalSum,
  sendOrderToServer,
} from '../../store/features/Basket/basketSlice';
import { Button } from '../../UI/Button';
import { Product } from '../../type/Product';
import { TitleMessage } from '../../components/TitleMassage';
import { Loader } from '../../components/Loader';

const Basket = styled.div`
  & h2 {
    text-align: center;
  }
`;

const BasketList = styled.div`
  border-bottom: 1px solid black;
`;

const BasketTotal = styled.div`
  padding: 10px 0;
  border-bottom: 1px solid black;
  text-align: right;
`;

const BasketPosition = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const BasketPositionTitle = styled.div`
  width: 500px;

  & > button {
    text-align: left;
  }
`;

const BasketPositionControls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const BasketPositionCost = styled.div`
  margin-left: 30px;
  width: 100px;
  text-align: right;
`;

const OrderButton = styled(Button)`
  margin: 100px auto;
  font-size: 30px;
`;

export const BasketPage: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const basket = useAppSelector(selectBasket);
  const total = useAppSelector(selectTotalSum);
  const isLoading = useAppSelector(selectStatusPosting) === 'posting';
  const error = useAppSelector(selectBasketError);
  const showSuccess = useAppSelector(selectShowSusses);
  const navigate = useNavigate();

  // there we watch for showSuccess from state.basket
  // if response of order to server is success
  // we show success message
  // and after 3s clear basket and redirect to route homepage
  useEffect(() => {
    if (showSuccess) {
      setTimeout(() => {
        dispatch(clearBasket());
        navigate('/');
      }, 3000);
    }
  }, [showSuccess]);

  const addHandler = (product: Product) => {
    dispatch(addProductToBasket({ product, count: 1 }));
  };

  const removeHandler = (product: Product, count: number) => {
    // delete position for the only one
    if (count === 1) {
      dispatch(deleteProductInBasket({ product }));

      return;
    }

    dispatch(removeProductFromBasket({ product, count: 1 }));
  };

  const deleteHandler = (product: Product) => {
    dispatch(deleteProductInBasket({ product }));
  };

  if (error) {
    return <TitleMessage message={error} status="error" />;
  }

  if (isLoading) {
    return <Loader />;
  }

  if (showSuccess) {
    return <TitleMessage message="Order sent" status="casual" />;
  }

  return (
    <div>
      {basket.length ? (
        <Basket>
          <BasketList>
            {basket.map(pos => (
              <BasketPosition key={pos.product.id}>
                <BasketPositionTitle>
                  <Button onClick={() => navigate(`/product/${pos.product.id}`)}>
                    {pos.product.title}
                  </Button>
                </BasketPositionTitle>

                <BasketPositionControls>
                  <Button
                    onClick={() => removeHandler(pos.product, pos.countOrdered)}
                  >
                    <IoRemove size="2rem" />
                  </Button>

                  {pos.countOrdered}

                  <Button onClick={() => addHandler(pos.product)}>
                    <IoAdd size="2rem" />
                  </Button>
                  <Button onClick={() => deleteHandler(pos.product)}>
                    <IoTrash size="2rem" />
                  </Button>

                  <BasketPositionCost>
                    {`$${Math.round(pos.countOrdered * (+pos.product.price) * 100) / 100}`}
                  </BasketPositionCost>
                </BasketPositionControls>
              </BasketPosition>
            ))}
          </BasketList>
          <BasketTotal>
            Total:&nbsp;&nbsp;&nbsp;$
            {total}
          </BasketTotal>

          <OrderButton onClick={() => dispatch(sendOrderToServer())}>
            Order
          </OrderButton>
        </Basket>
      ) : (
        <TitleMessage message="Basket is empty" status={undefined} />
      )}
    </div>
  );
};
