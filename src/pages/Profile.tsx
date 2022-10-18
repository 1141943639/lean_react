import React from 'react';
import { Link } from 'react-router-dom';
import { Trans } from 'react-i18next';
import { selectUser } from 'store/slice/auth';
import { useAppSelector } from 'hooks/useAppState';

const Profile: React.FC = () => {
  const { user } = useAppSelector(selectUser);

  return (
    <div className="p-3 relative h-full w-full">
      <h3 className="text-2xl">
        <Trans
          i18nKey="home.username"
          values={{
            username: user.name,
          }}
          components={{}}
        />
      </h3>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Trans
          i18nKey="home.todoListLink"
          components={{
            Link: <Link to="/index/todoList" />,
          }}
        />
      </div>
    </div>
  );
};

export default Profile;
