import {
  FunctionComponent,
} from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { IoCart, IoCartOutline, IoChevronBack } from 'react-icons/io5';
import { Button } from '../UI/Button';
import { useAppSelector } from '../store/hooks';
import { selectBasket } from '../store/features/Basket/basketSlice';
// import {
//   useAppDispatch,
//   useAppSelector,
// } from '../store/hooks';

const Wrapper = styled.div`
  /* max-width: 1200px; */
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
`;

export const Controls: FunctionComponent = () => {
  // const dispatch = useAppDispatch();
  const basket = useAppSelector(selectBasket);

  // eslint-disable-next-line no-console
  console.log(basket);

  return (
    <Wrapper>
      <Link
        to="/"
        onClick={() => {
          // eslint-disable-next-line no-console
          console.log('click link back');
        }}
      >
        <IoChevronBack />
      </Link>

      <Button>
        <Link
          to="basket"
        >
          {basket.length
            ? <IoCart size="2rem" color="black" />
            : <IoCartOutline size="2rem" color="grey" />}
        </Link>
      </Button>

    </Wrapper>
  );
};
