import { FunctionComponent } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import {
  useAppSelector,
} from '../../store/hooks';
import {
  selectProducts,
} from '../../store/features/Products/productsSlice';
import { Card } from '../../components/Card';

const Wrapper = styled.div`
  margin: 0 auto;
  grid-template-columns: repeat(4, minmax(400px, 1fr));
  gap: 20px;
  margin: 0 auto;
  padding: 20px;
`;

export const ProductPage: FunctionComponent = () => {
  const { id } = useParams();
  const products = useAppSelector(selectProducts);
  const product = products.find(p => String(p.id) === id);

  return (
    <Wrapper>
      {product && <Card product={product} format="page" />}
    </Wrapper>
  );
};
