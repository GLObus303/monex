import styled from 'styled-components';

import { useForexRates } from './clientApi/forex';
import { CurrencyConverter } from './components/CurrencyConverter';
import { COLOR } from './styles/color';
import { BREAKPOINT } from './styles/breakpoint';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Header = styled.header`
  display: flex;
  align-items: flex-end;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid ${COLOR.BORDER};
  background-color: ${COLOR.BACKGROUND_WASH_ME};
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1;
`;

const Subtitle = styled.h2`
  display: none;
  font-size: 1.2rem;
  font-weight: 500;
  color: ${COLOR.TEXT_SECONDARY};

  @media (min-width: ${BREAKPOINT.MOBILE}) {
    display: block;
  }
`;

const Content = styled.main`
  flex: 1 0 auto;
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 1rem;

  @media (min-width: ${BREAKPOINT.MOBILE}) {
    padding: 2rem;
  }
`;

const Footer = styled.footer`
  flex-shrink: 0;
  padding: 1rem;
  text-align: center;
  border-top: 1px solid ${COLOR.BORDER};
  background-color: ${COLOR.BACKGROUND_WASH_ME};
`;

const FooterText = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: ${COLOR.TEXT_SECONDARY};
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
          {isLoading && <p>Loading exchange rates...</p>}
          {error && <p>Error loading exchange rates: {error.message}</p>}
          {!!data && <CurrencyConverter rates={data.rates} />}
        </ContentContainer>
      </Content>

      <Footer>
        <FooterText>Made by Lukas Cizek</FooterText>
      </Footer>
    </Container>
  );
};
