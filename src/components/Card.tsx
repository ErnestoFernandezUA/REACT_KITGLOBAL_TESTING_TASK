import { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { Product } from '../type/Product';
import StarIcon from '../assets/star-icon.svg';
import { Button } from '../UI/Button';
import { useAppDispatch } from '../store/hooks';
import { addProductToBasket } from '../store/features/Basket/basketSlice';

const CardContainer = styled.div<{ format?: string }>`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 280px;
  height: 400px;
  border-radius: 10px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  margin: 10px;
  box-sizing: border-box;
  padding: 0 0 20px;

  &:hover {
    cursor: pointer;
    ${({ format }) => (format === 'page') && css`
    cursor: auto;
  `}
  }

  ${({ format }) => (format === 'page') && css`
    display: flex;
    width: 100%;
    height: 100%;
    border-radius: none;
    box-shadow: none;
    overflow: visible;
    margin: 0;
    padding: 0;
  `}
`;

const CardImage = styled.img<{ format?: string }>`
  width: 100%;
  height: 250px;
  object-fit: cover;
  overflow: hidden;

  ${({ format }) => (format === 'page') && css`
    width: 300px;
    height: 400px;
    object-fit: cover;
    overflow: visible;
    margin: 0 auto;
  `}
`;

const CardContent = styled.div<{ format?: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;

  ${({ format }) => (format === 'page') && css`
    padding: 50px;
  `}
`;

const CardCategory = styled.div<{ format?: string }>`
  font-size: 12px;
  padding: 0;

  ${({ format }) => (format === 'page') && css`
    font-size: 20px;
    padding: 10px;
  `}
`;

const CardTitle = styled.h2<{ format?: string }>`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  max-width: 250px;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-direction: normal;
  -webkit-box-orient: vertical;
  overflow-wrap: normal;
  height: 48px;

  ${({ format }) => (format === 'page') && css`
    font-size: 50px;
    margin-top: 20px;
    margin-bottom: 40px;
    max-width: none;
    -webkit-line-clamp: inherit;
    text-align: center;
    overflow: visible;
    text-overflow: none;
    height: auto;
  `}
`;

const CardDescription = styled.p<{ format?: string }>`
  font-size: 14px;
  text-align: center;
  max-height: 50px;
  text-overflow: ellipsis;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-direction: normal;
  -webkit-box-orient: vertical;
  overflow-wrap: break-word;

  ${({ format }) => (format === 'page') && css`
    font-size: 24px;
    text-align: center;
    max-height: min-content;
    text-overflow: clip;
    overflow: visible;
    -webkit-line-clamp: inherit;
  `}
`;

const CardPrice = styled.h3<{ format?: string }>`
  font-size: 24px;
  font-weight: bold;
  margin-top: 10px;

  ${({ format }) => (format === 'page') && css`
    font-size: 34px;
    font-weight: bold;
    margin-top: 20px;
  `}
`;

const CardRating = styled.div<{ format?: string }>`
  display: flex;
  align-items: center;
  margin-top: 10px;

  ${({ format }) => (format === 'page') && css`
  `}
`;

const CardRatingCount = styled.span<{ format?: string }>`
  font-size: 14px;
  margin-left: 5px;
`;

const CardButtonBuy = styled(Button)<{ format?: string }>`
  ${({ format }) => (format === 'page') && css`
    font-size: 30px;
    margin: 20px auto;
  `}
`;

interface CardProps {
  product: Product;
  // eslint-disable-next-line react/require-default-props
  format?: 'card' | 'page';
}

export const Card: FunctionComponent<CardProps> = ({
  product,
  format = 'card',
}) => {
  const {
    category, description, image, price, rating, title, id,
  } = product;
  const { count } = rating;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const buyHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();

    dispatch(addProductToBasket({
      product,
      count: 1,
    }));
  };

  const cardToggle = () => {
    if (format === 'card') {
      navigate(`product/${id}`);
    }
  };

  return (
    <CardContainer
      onClick={cardToggle}
      format={format}
    >
      <CardImage src={image} alt={description} format={format} />
      <CardContent format={format}>
        <CardCategory format={format}>{category}</CardCategory>
        <CardTitle format={format}>{title}</CardTitle>
        <CardDescription format={format}>{description}</CardDescription>
        <CardPrice format={format}>
          $
          {price}
        </CardPrice>
        <CardRating format={format}>
          <img src={StarIcon} alt="star icon" />
          <CardRatingCount format={format}>{`${count} available`}</CardRatingCount>
        </CardRating>

      </CardContent>
      <CardButtonBuy onClick={e => buyHandler(e)} format={format}>
        Add
      </CardButtonBuy>
    </CardContainer>
  );
};
