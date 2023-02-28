import { FunctionComponent } from 'react';
import styled from 'styled-components';
import { Product } from '../type/Product';
import StarIcon from '../assets/star-icon.svg';
import { Button } from '../UI/Button';
import { useAppDispatch } from '../store/hooks';
import { addProductToBasket } from '../store/features/Basket/basketSlice';

const CardContainer = styled.div`
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
`;

const CardImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  overflow: hidden;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const CardCategory = styled.div`
  font-size: 12px;
  padding: 0;
`;

const CardTitle = styled.h2`
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
`;

const CardDescription = styled.p`
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
`;

const CardPrice = styled.h3`
  font-size: 24px;
  font-weight: bold;
  margin-top: 10px;
`;

const CardRating = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const CardRatingCount = styled.span`
  font-size: 14px;
  margin-left: 5px;
`;

interface CardProps {
  product: Product;
}

export const Card: FunctionComponent<CardProps> = ({
  product,
}) => {
  const {
    category, description, image, price, rating, title,
  } = product;
  const { count } = rating;
  const dispatch = useAppDispatch();

  const buyHandler = () => {
    dispatch(addProductToBasket({
      product,
      count: 1,
    }));
  };

  const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('text/plain', JSON.stringify(product));
  };

  return (
    <CardContainer
      onDragStart={onDragStart}
    >
      <CardImage src={image} alt={description} />
      <CardContent>
        <CardCategory>{category}</CardCategory>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <CardPrice>
          $
          {price}
        </CardPrice>
        <CardRating>
          <img src={StarIcon} alt="star icon" />
          <CardRatingCount>{`${count} available`}</CardRatingCount>
        </CardRating>
      </CardContent>

      <Button onClick={buyHandler}>Buy</Button>
    </CardContainer>
  );
};
