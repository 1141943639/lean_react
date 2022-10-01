import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "context/Auth";
import { Trans } from "react-i18next";

const Profile: React.FC = () => {
  const { user } = useAuth();

  return (
    <div>
      <h3>
        <Trans
          i18nKey="home.username"
          values={{
            username: user,
          }}
        />
      </h3>
      <Trans
        i18nKey="home.todoListLink"
        components={{
          Link: <Link to="/todoList" />,
        }}
      />
    </div>
  );
};

export default Profile;
