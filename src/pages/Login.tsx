import React, { useRef } from "react";

import { Trans, useTranslation } from "react-i18next";
import { setUser, selectUser } from "slice/auth";
import { useAppDispatch, useAppSelector } from "hooks";
import { useSigninMutation } from "api/user";

import { User } from "interface/user";

import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { isEmpty } from "lodash";
import { useHistory } from "react-router-dom";

interface FormData {
  username: string;
  pwd: string;
}

type FormField = "username" | "pwd";

interface SigninData {
  username: string;
  pwd: string;
}

export default function Login() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [signin, { isLoading }] = useSigninMutation();
  const history = useHistory();

  const handleSignin = async (data: SigninData) => {
    try {
      const { data: userDataArr } = (await signin(data.username)) as {
        data: Array<User>;
      };

      if (isEmpty(userDataArr)) {
        return console.error("找不到用户");
      }

      const user = userDataArr[0];

      dispatch(setUser(user));
      history.push("/test/home");
    } catch (err) {
      console.error(
        "%c [  ]-44",
        "font-size:13px; background:pink; color:#bf2c9f;",
        "登录失败"
      );
      throw err;
    }
  };

  const formOption = [
    {
      name: "username",
      label: t("login.form.username.label"),
      fieldProps: {
        type: "text",
        placeholder: t("login.form.username.placeholder"),
      },
      ErrorRef: useRef(null),
    },
    {
      name: "pwd",
      label: t("login.form.pwd.label"),
      fieldProps: {
        type: "text",
        placeholder: t("login.form.pwd.placeholder"),
      },
      ErrorRef: useRef(null),
    },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="text-3xl font-bold mb-6">{t("login.title")}</div>
      <Formik
        initialValues={{ username: "", pwd: "" }}
        validationSchema={Yup.object({
          username: Yup.string()
            .required(t("login.form.username.valid.required"))
            // .min(10, t("login.form.username.valid.incorrectFormat"))
            .test(
              "format",
              t("login.form.username.valid.incorrectFormat"),
              (value) => {
                if (/[@!#$~%^}&*()+\-={}[\]:";'<>,.?/|\\]+/g.test(value || ""))
                  return false;
                return true;
              }
            ),
          pwd: Yup.string()
            .required(t("login.form.pwd.valid.notLongEnough"))
            .min(10, t("login.form.pwd.valid.notLongEnough"))
            .matches(/[a-z]+/g, t("login.form.pwd.valid.notSafeEnough"))
            .matches(/[A-Z]+/g, t("login.form.pwd.valid.notSafeEnough"))
            .matches(/[0-9]+/g, t("login.form.pwd.valid.notSafeEnough"))
            .matches(/[!@#$]+/g, t("login.form.pwd.valid.notSafeEnough")),
        })}
        onSubmit={(values, { setSubmitting }) => {
          handleSignin(values);
          setSubmitting(false);
        }}
      >
        {(form) => {
          return (
            <Form>
              {formOption.map(({ fieldProps, name, label }) => {
                const error = form.errors[name as FormField];
                const touched = form.touched[name as FormField];

                return (
                  <div className="flex flex-col mb-5 relative" key={name}>
                    <label className="mb-1 block w-20 font-bold" htmlFor={name}>
                      {label}
                    </label>
                    <Field
                      className={[
                        "relative focus-visible:outline-none rounded-md border-2 px-2 py-1",
                        error && touched ? "border-red-500" : "",
                      ].join(" ")}
                      name={name}
                      {...fieldProps}
                    />
                    <div className="text-red-500">
                      <ErrorMessage name={name} />
                    </div>
                  </div>
                );
              })}

              <div className="flex justify-center w-full mt-8">
                <button
                  className="px-5 py-1 rounded-md bg-blue-500 text-white"
                  type="submit"
                >
                  {t("login.formButton")}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
