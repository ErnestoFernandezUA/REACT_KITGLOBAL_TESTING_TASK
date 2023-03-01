import { createHashRouter, Outlet } from 'react-router-dom';
import styled from 'styled-components';

import { NotFound } from './pages/NotFound';
import { HomePage } from './pages/HomePage/HomePage';
import { Controls } from './components/Controls';
import { BasketPage } from './pages/BasketPage';
import { ProductPage } from './pages/ProductPage';

const Wrapper = styled.div`
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100vh;
  `;

const Header = styled.header`
  max-width: 1270px;
  margin: 0 auto;
  text-align: center;
  margin-bottom: 1rem;
  padding-top: 1rem;
`;

const Main = styled.main`
  max-width: 1270px;
  margin: 0 auto;
`;

function App() {
  return (
    <Wrapper>
      <Header>
        <h1>Shop with React Saga</h1>
        <Controls />
      </Header>

      <Main>
        <Outlet />
      </Main>
    </Wrapper>
  );
}

export const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    id: 'root',
    children: [
      {
        path: '/',
        element: <HomePage />,
        id: 'homePage',
        errorElement: <>Error on HomePage</>,
      },
      {
        path: '/basket',
        element: <BasketPage />,
        id: 'basketPage',
        errorElement: <>Error on BasketPage</>,
      },
      // there we can add page for each product
      {
        path: '/product/:id',
        element: <ProductPage />,
        errorElement: <>Error on ProductPage</>,
      },
    ],
  },
]);
