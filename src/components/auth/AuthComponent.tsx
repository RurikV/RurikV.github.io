import React, { useState } from 'react';
import { styled } from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { login, logout } from '../../store/slices/authSlice';

const AuthContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const AuthButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  background: ${(props) => props.theme.colorPrimary};
  color: white;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s ease;

  &:hover {
    background: ${(props) => props.theme.colorPrimaryHover || props.theme.colorPrimary};
    opacity: 0.9;
  }

  &.logout {
    background: #dc3545;
  }

  &.logout:hover {
    background: #c82333;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: ${(props) => props.theme.colorTextPrimary};
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid ${(props) => props.theme.colorBorder};
`;

const RoleBadge = styled.span<{ role: 'admin' | 'user' }>`
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
  background: ${(props) => (props.role === 'admin' ? '#28a745' : '#6c757d')};
  color: white;
`;

// Generate a random token for fake authentication
const generateFakeToken = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

const AuthComponent: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, profile } = useAppSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const fakeToken = generateFakeToken();
    dispatch(login(fakeToken));

    setIsLoading(false);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  if (isAuthenticated && profile) {
    return (
      <AuthContainer>
        <UserInfo>
          <Avatar src={profile.avatar} alt={profile.name} />
          <div>
            <div>{profile.name}</div>
            <RoleBadge role={profile.role}>{profile.role.toUpperCase()}</RoleBadge>
          </div>
        </UserInfo>
        <AuthButton className="logout" onClick={handleLogout}>
          Logout
        </AuthButton>
      </AuthContainer>
    );
  }

  return (
    <AuthContainer>
      <AuthButton onClick={handleLogin} disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </AuthButton>
    </AuthContainer>
  );
};

export default AuthComponent;
