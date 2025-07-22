import { styled } from 'styled-components';

export const ModalDemoContainer = styled.div<{ className?: string }>`
  padding: 20px;
  max-width: 500px;
  margin: 0 auto;
`;

export const ModalDemoInputSection = styled.div`
  margin-bottom: 20px;
`;

export const ModalDemoLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: ${(props) => props.theme.colorTextPrimary};
`;

export const ModalDemoInput = styled.input`
  width: 100%;
  padding: 12px;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.2s ease;
  border: 2px solid;

  border-color: ${(props) => props.theme.colorBorder};
  background-color: ${(props) => props.theme.colorBgPrimary};
  color: ${(props) => props.theme.colorTextPrimary};

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
    border-color: ${(props) => props.theme.colorPrimary};
  }
`;

export const ModalDemoButton = styled.button`
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  background-color: ${(props) => props.theme.colorPrimary};

  &:hover {
    background-color: ${(props) => props.theme.colorPrimaryHover};
  }

  &:active {
    background-color: ${(props) => props.theme.colorPrimaryActive};
  }
`;

export const ModalDemoContent = styled.div`
  text-align: center;

  h2 {
    margin-top: 0;
    margin-bottom: 16px;
    color: ${(props) => props.theme.colorTextPrimary};
  }

  p {
    font-size: 16px;
    line-height: 1.5;
    margin: 0;
    color: ${(props) => props.theme.colorTextSecondary};
  }
`;
