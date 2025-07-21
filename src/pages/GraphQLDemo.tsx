import React from 'react';
import { styled } from 'styled-components';
import { GraphQLAuth } from '../features/graphql/GraphQLAuth/GraphQLAuth';
import { ProductManagement } from '../features/graphql/ProductManagement/ProductManagement';
import { OperationManagement } from '../features/graphql/OperationManagement/OperationManagement';
import { OrderCreation } from '../features/graphql/OrderCreation/OrderCreation';
import { DynamicLoading } from '../features/graphql/DynamicLoading/DynamicLoading';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 40px 20px;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const Title = styled.h1`
  color: white;
  font-size: 36px;
  font-weight: 700;
  margin: 0 0 16px 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const Subtitle = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 18px;
  margin: 0 0 24px 0;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`;

const InfoBox = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 20px;
  margin: 0 auto 40px auto;
  max-width: 800px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const InfoTitle = styled.h3`
  color: white;
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 12px 0;
`;

const InfoText = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
  margin: 0 0 8px 0;
  line-height: 1.5;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const ComponentWrapper = styled.div`
  position: relative;
`;

const ComponentLabel = styled.div`
  background: rgba(255, 255, 255, 0.9);
  color: #2c3e50;
  padding: 8px 16px;
  border-radius: 8px 8px 0 0;
  font-weight: 600;
  font-size: 14px;
  text-align: center;
  margin-bottom: -12px;
  position: relative;
  z-index: 1;
`;

const CodeSnippet = styled.code`
  background: rgba(0, 0, 0, 0.3);
  color: #ffd700;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 13px;
`;

const TestingInstructions = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 20px;
  margin: 40px auto 0 auto;
  max-width: 800px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const TestList = styled.ul`
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
  line-height: 1.6;
  margin: 12px 0 0 20px;
`;

const TestItem = styled.li`
  margin-bottom: 8px;
`;

export const GraphQLDemo: React.FC = () => {
  return (
    <Container>
      <Header>
        <Title>GraphQL Demo Application</Title>
        <Subtitle>
          Полнофункциональное приложение с авторизацией, управлением товарами/операциями, созданием заказов и
          динамической подгрузкой данных
        </Subtitle>
      </Header>

      <InfoBox>
        <InfoTitle>API Information</InfoTitle>
        <InfoText>
          <strong>GraphQL Endpoint:</strong> <CodeSnippet>http://cea3c11a3f62.vps.myjino.ru/graphql</CodeSnippet>
        </InfoText>
        <InfoText>
          <strong>File Upload:</strong> <CodeSnippet>POST /api/upload</CodeSnippet>
        </InfoText>
        <InfoText>
          <strong>Authentication:</strong> Bearer token в заголовке Authorization
        </InfoText>
        <InfoText>
          <strong>Features:</strong> Авторизация, CRUD операции, создание заказов, динамическая подгрузка
        </InfoText>
      </InfoBox>

      <Grid>
        <ComponentWrapper>
          <ComponentLabel>1. Authentication</ComponentLabel>
          <GraphQLAuth />
        </ComponentWrapper>

        <ComponentWrapper>
          <ComponentLabel>2. Product Management</ComponentLabel>
          <ProductManagement />
        </ComponentWrapper>

        <ComponentWrapper>
          <ComponentLabel>3. Operation Management</ComponentLabel>
          <OperationManagement />
        </ComponentWrapper>

        <ComponentWrapper>
          <ComponentLabel>4. Order Creation</ComponentLabel>
          <OrderCreation />
        </ComponentWrapper>

        <ComponentWrapper>
          <ComponentLabel>5. Dynamic Product Loading</ComponentLabel>
          <DynamicLoading />
        </ComponentWrapper>
      </Grid>

      <TestingInstructions>
        <InfoTitle>Testing Instructions</InfoTitle>
        <InfoText>Для тестирования функциональности попробуйте следующие сценарии:</InfoText>
        <TestList>
          <TestItem>
            <strong>Авторизация:</strong> Войдите в систему для получения токена доступа
          </TestItem>
          <TestItem>
            <strong>Управление товарами:</strong> Добавьте, отредактируйте или удалите товары
          </TestItem>
          <TestItem>
            <strong>Управление операциями:</strong> Создайте операции доходов и расходов
          </TestItem>
          <TestItem>
            <strong>Создание заказов:</strong> Оформите заказ с выбранными товарами
          </TestItem>
          <TestItem>
            <strong>Динамическая подгрузка:</strong> Прокрутите список для загрузки дополнительных данных
          </TestItem>
          <TestItem>
            <strong>Debug логи:</strong> Откройте Developer Tools (F12) → Console для просмотра debug сообщений с
            префиксом <CodeSnippet>[DEBUG_LOG]</CodeSnippet>
          </TestItem>
        </TestList>
      </TestingInstructions>
    </Container>
  );
};

GraphQLDemo.displayName = 'GraphQLDemo';