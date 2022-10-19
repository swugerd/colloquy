import React from 'react';
import useSetPageTitle from '../../hooks/useSetPageTitle';
import s from './Messages.module.scss';

const Messages: React.FC = () => {
  useSetPageTitle('Сообщения');
  return <div>Messages</div>;
};

export default Messages;
