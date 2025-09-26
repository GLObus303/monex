import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Content = styled.main`
  flex: 1 0 auto;
  padding: 2rem;
  text-align: center;
`;

const Footer = styled.footer`
  flex-shrink: 0;
  padding: 1rem;
  text-align: center;
  border-top: 1px solid #eee;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #2c3e50;
`;

const Subtitle = styled.h2`
  font-size: 1rem;
  color: #666;
  font-weight: normal;
`;

const FooterText = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: #666;
`;

export const App = () => (
  <Container>
    <Content>
      <Title>Monex</Title>
      <Subtitle>The Currency Converter</Subtitle>
    </Content>

    <Footer>
      <FooterText>Made by Lukas Cizek</FooterText>
    </Footer>
  </Container>
);
