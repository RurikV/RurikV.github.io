import React from 'react';
import { styled } from 'styled-components';
import { ProfileForm } from '../features/forms/ProfileForm';
import { ProfileFormData } from '../components/picklematch/types';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { updateProfile } from '../store/slices/authSlice';

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
  const dispatch = useAppDispatch();
  const { profile } = useAppSelector((state) => state.auth);

  const handleProfileSubmit = (values: ProfileFormData) => {
    console.log('[DEBUG_LOG] Profile updated:', values);
    dispatch(updateProfile(values));
  };

  // Get initial values from current profile or use defaults
  const initialValues: ProfileFormData = {
    name: profile?.name || '',
    about: '', // We don't have about field in profile yet
    isAdmin: profile?.role === 'admin',
  };

  return (
    <PageContainer>
      <PageTitle>Profile</PageTitle>
      <ProfileForm onSubmit={handleProfileSubmit} initialValues={initialValues} />
    </PageContainer>
  );
};

export default ProfilePage;
