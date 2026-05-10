import React from 'react';
import styled from 'styled-components';

const NotifyContainer = styled.div`
  position: fixed;
  top: 10px;
  right: 10px;
  background-color: #4CAF50;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  z-index: 1000;
`;

const NotifyMessage = styled.p`
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`;

function NotifySaveProfile() {
  return (
    <NotifyContainer>
      <NotifyMessage>Profil Anda berhasil diperbarui!</NotifyMessage>
    </NotifyContainer>
  );
}

export default NotifySaveProfile;
