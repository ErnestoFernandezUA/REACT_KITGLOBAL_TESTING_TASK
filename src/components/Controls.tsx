import {
  FunctionComponent,
} from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { IoCart, IoCartOutline, IoChevronBack } from 'react-icons/io5';
import {
  clearBasket,
  selectBasket,
  selectTotalCount,
} from '../store/features/Basket/basketSlice';
import { Button } from '../UI/Button';
import {
  useAppDispatch,
  useAppSelector,
} from '../store/hooks';
import {
  selectProducts,
} from '../store/features/Products/productsSlice';
import { loadProducts } from '../store/sagas/sagaActions';

const Wrapper = styled.div`
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
`;

export const Controls: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const basket = useAppSelector(selectBasket);
  const products = useAppSelector(selectProducts);
  const count = useAppSelector(selectTotalCount);

  return (
    <Wrapper>
      <Link to="/">
        <IoChevronBack />
      </Link>

      {!products.length && (
        <Button
          onClick={() => dispatch(loadProducts())}
        >
          Load products
        </Button>
      )}

      {!!basket.length && (
        <>
          <Button
            onClick={() => dispatch(clearBasket())}
          >
            Clear basket
          </Button>

          Total:
          {count}
        </>
      )}

      <Link
        to="basket"
      >
        {basket.length
          ? <IoCart size="2rem" color="black" />
          : <IoCartOutline size="2rem" color="grey" />}
      </Link>

    </Wrapper>
  );
};
