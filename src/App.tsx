import styled from 'styled-components';

import { useForexRates } from './clientApi/forex';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Header = styled.header`
  padding: 2rem;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
`;

const Subtitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 300;
  margin: 0;
  opacity: 0.9;
`;

const Content = styled.main`
  flex: 1 0 auto;
`;

const ContentContainer = styled.div`
  padding: 2rem;
  text-align: center;
`;

const Footer = styled.footer`
  flex-shrink: 0;
  padding: 1rem;
  text-align: center;
  border-top: 1px solid #eee;
  background-color: #f8f9fa;
`;

const FooterText = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: #666;
`;

export const App = () => {
  const { data, isLoading, error } = useForexRates();

  return (
    <Container>
      <Header>
        <Title>Monex</Title>
        <Subtitle>The Currency Converter</Subtitle>
      </Header>

      <Content>
        <ContentContainer>
          <p>Check the console for the data output.</p>
          {isLoading && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}
          {data && <p>Data loaded! Check console.</p>}
          {data && <p>Date: {data.date}</p>}
        </ContentContainer>
      </Content>

      <Footer>
        <FooterText>Made by Lukas Cizek</FooterText>
      </Footer>
    </Container>
  );
};
