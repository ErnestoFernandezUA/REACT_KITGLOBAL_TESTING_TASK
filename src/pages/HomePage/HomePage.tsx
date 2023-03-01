import { FunctionComponent, useEffect } from 'react';
import styled from 'styled-components';

import {
  // useAppDispatch,
  useAppSelector,
} from '../../store/hooks';
import {
  // getProductsAsync,
  selectProducts, selectProductsError, selectProductsStatusLoading,
} from '../../store/features/Products/productsSlice';
import { Card } from '../../components/Card';
import { Product } from '../../type/Product';
import { Loader } from '../../components/Loader';
import { TitleMessage } from '../../components/TitleMassage';

const Wrapper = styled.div`
  margin: 0 auto;
  grid-template-columns: repeat(4, minmax(400px, 1fr));
  gap: 20px;
  margin: 0 auto;
  padding: 20px;
`;

export const HomePage: FunctionComponent = () => {
  // const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const isLoading = useAppSelector(selectProductsStatusLoading) === 'loading';
  const error = useAppSelector(selectProductsError);

  // eslint-disable-next-line no-console
  console.log('isLoading', isLoading);

  useEffect(() => {
    // if (!products.length) {
    //   dispatch(getProductsAsync());
    // }
  }, []);

  if (error) {
    return <TitleMessage message={error} status="error" />;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Wrapper>
      {products.length > 0 && products.map((product: Product) => (
        <Card
          key={product.id}
          product={product}
        />
      ))}
    </Wrapper>
  );
};
