import { FunctionComponent } from 'react';
import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const LoaderWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const LoaderInner = styled.div`
  border-radius: 50%;
  width: 2em;
  height: 2em;
  margin: 1em auto;
  border: 0.3em solid #ddd;
  border-left-color: #000;
  animation: ${rotate} 1.2s infinite linear;
`;

export const Loader: FunctionComponent = () => {
  // eslint-disable-next-line no-console
  console.log('Loader ....');

  return (
    <LoaderWrapper>
      <LoaderInner />
    </LoaderWrapper>
  );
};
