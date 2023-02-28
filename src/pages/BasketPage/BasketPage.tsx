import { FunctionComponent } from 'react';
import styled from 'styled-components';

import { IoRemove, IoAdd, IoTrash } from 'react-icons/io5';
// import {
//   Link,
//   useParams,
// } from 'react-router-dom';
import {
  useAppDispatch,
  useAppSelector,
} from '../../store/hooks';

import {
  addProductToBasket,
  deleteProductInBasket,
  removeProductFromBasket,
  selectBasket,
  selectTotal,
} from '../../store/features/Basket/basketSlice';
import { Button } from '../../UI/Button';
import { Product } from '../../type/Product';

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

export const BasketPage: FunctionComponent = () => {
  // const { id } = useParams();
  const dispatch = useAppDispatch();
  const basket = useAppSelector(selectBasket);
  const total = useAppSelector(selectTotal);

  const addHandler = (product: Product) => {
    dispatch(addProductToBasket({ product, count: 1 }));
  };

  const removeHandler = (product: Product) => {
    dispatch(removeProductFromBasket({ product, count: 1 }));
  };

  const deleteHandler = (product: Product) => {
    dispatch(deleteProductInBasket({ product }));
  };

  return (
    <div>
      {basket.length ? (
        <Basket>
          <BasketList>
            {basket.map(position => (
              <BasketPosition key={position.product.id}>
                <BasketPositionTitle>
                  {position.product.title}
                </BasketPositionTitle>

                <BasketPositionControls>
                  <Button onClick={() => removeHandler(position.product)}>
                    <IoRemove size="2rem" />
                  </Button>

                  {position.countOrdered}

                  <Button onClick={() => addHandler(position.product)}>
                    <IoAdd size="2rem" />
                  </Button>
                  <Button onClick={() => deleteHandler(position.product)}>
                    <IoTrash size="2rem" />
                  </Button>

                  <BasketPositionCost>
                    {`$${Math.round(position.countOrdered * (+position.product.price) * 100) / 100}`}
                  </BasketPositionCost>
                </BasketPositionControls>
              </BasketPosition>
            ))}
          </BasketList>
          <BasketTotal>
            Total:&nbsp;&nbsp;&nbsp;$
            {total}
          </BasketTotal>
        </Basket>
      ) : (
        <Basket>
          <h2>Basket is empty</h2>
        </Basket>
      )}
    </div>
  );
};
