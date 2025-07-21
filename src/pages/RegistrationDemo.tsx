import React from 'react';
import { styled } from 'styled-components';
import { FetchRegistration } from '../features/registration/FetchRegistration/FetchRegistration';
import { RTKQueryRegistration } from '../features/registration/RTKQueryRegistration/RTKQueryRegistration';
import { ThunkRegistration } from '../features/registration/ThunkRegistration/ThunkRegistration';
import { SagaRegistration } from '../features/registration/SagaRegistration/SagaRegistration';

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

const CodeSnippet = styled.code`
  background: rgba(0, 0, 0, 0.3);
  color: #ffd700;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 13px;
`;

export const RegistrationDemo: React.FC = () => {
  return (
    <Container>
      <Header>
        <Title>Registration Component Variants</Title>
        <Subtitle>
          Демонстрация 4 различных подходов к реализации регистрации пользователя с обработкой ошибок сервера
        </Subtitle>
      </Header>

      <InfoBox>
        <InfoTitle>API Information</InfoTitle>
        <InfoText>
          <strong>Base URL:</strong> <CodeSnippet>http://19429ba06ff2.vps.myjino.ru/api</CodeSnippet>
        </InfoText>
        <InfoText>
          <strong>Endpoint:</strong> <CodeSnippet>POST /signup</CodeSnippet>
        </InfoText>
        <InfoText>
          <strong>Command ID:</strong> <CodeSnippet>registration-demo-2025</CodeSnippet>
        </InfoText>
        <InfoText>
          <strong>Error Handling:</strong> Все компоненты обрабатывают ошибки сервера, включая валидацию email и
          существующие аккаунты.
        </InfoText>
      </InfoBox>

      <Grid>
        <ComponentWrapper>
          <ComponentLabel>1. Functional Component + Fetch API</ComponentLabel>
          <FetchRegistration />
        </ComponentWrapper>

        <ComponentWrapper>
          <ComponentLabel>2. Redux Toolkit Query</ComponentLabel>
          <RTKQueryRegistration />
        </ComponentWrapper>

        <ComponentWrapper>
          <ComponentLabel>3. Redux Thunk</ComponentLabel>
          <ThunkRegistration />
        </ComponentWrapper>

        <ComponentWrapper>
          <ComponentLabel>4. Redux Saga</ComponentLabel>
          <SagaRegistration />
        </ComponentWrapper>
      </Grid>

      <TestingInstructions>
        <InfoTitle>Testing Instructions</InfoTitle>
        <InfoText>Для тестирования обработки ошибок попробуйте следующие сценарии:</InfoText>
        <TestList>
          <TestItem>
            <strong>Невалидный email:</strong> Введите <CodeSnippet>invalid-email</CodeSnippet> для проверки обработки
            ошибки валидации
          </TestItem>
          <TestItem>
            <strong>Существующий аккаунт:</strong> Используйте уже зарегистрированный email для проверки обработки
            дублирования
          </TestItem>
          <TestItem>
            <strong>Пустые поля:</strong> Попробуйте отправить форму с пустыми полями
          </TestItem>
          <TestItem>
            <strong>Успешная регистрация:</strong> Используйте валидный email и пароль для успешной регистрации
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

RegistrationDemo.displayName = 'RegistrationDemo';
