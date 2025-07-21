import React from 'react';
import { styled } from 'styled-components';
import { ProfileForm } from '../features/forms/ProfileForm';
import { ProfileFormData } from '../components/picklematch/types';

const PageContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const PageTitle = styled.h1`
  color: ${(props) => props.theme.colorTextPrimary};
  margin-bottom: 20px;
  text-align: center;
`;

const ProfilePage: React.FC = () => {
  const handleProfileSubmit = (values: ProfileFormData) => {
    console.log('[DEBUG_LOG] Profile updated:', values);
    // Here you would typically save to backend
  };

  return (
    <PageContainer>
      <PageTitle>Profile</PageTitle>
      <ProfileForm onSubmit={handleProfileSubmit} initialValues={{ name: '', about: '' }} />
    </PageContainer>
  );
};

export default ProfilePage;
