import React from 'react';
import s from './ContentLayout.module.scss';

type ContentLayoutProps = {
  children: React.ReactNode[];
};

const ContentLayout: React.FC<ContentLayoutProps> = ({ children }) => {
  const [firstChild, secondChild] = children;
  return <div>ContentLayout</div>;
};

export default ContentLayout;
