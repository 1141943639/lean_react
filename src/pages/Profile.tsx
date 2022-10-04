import React from "react";
import { Link } from "react-router-dom";
import { selectUser } from "slice/auth";
import { useAppSelector } from "hooks";
import { Trans } from "react-i18next";

const Profile: React.FC = () => {
  const { user } = useAppSelector(selectUser);

  return (
    <div>
      <h3>
        <Trans
          i18nKey="home.username"
          values={{
            username: user.name,
          }}
        />
      </h3>
      <Trans
        i18nKey="home.todoListLink"
        components={{
          Link: <Link to="/test/todoList" />,
        }}
      />
    </div>
  );
};

export default Profile;
