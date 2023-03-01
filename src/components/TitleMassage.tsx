import { FunctionComponent } from 'react';
import styled, { css } from 'styled-components';

export const Wrapper = styled.div<{ status: string }>`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;

  ${({ status }) => (status === 'error') && css`
    color: red;
  `}
`;

interface Props {
  message: string;
  status: 'error' | 'casual' | undefined;
}

export const TitleMessage: FunctionComponent<Props> = ({
  message,
  status = 'casual',
}) => {
  return (
    <Wrapper status={status}>
      <h2>{message}</h2>
    </Wrapper>
  );
};
