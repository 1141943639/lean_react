import React from "react";

import { useAuth } from "context/Auth";
import { Trans, useTranslation } from "react-i18next";

import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";

interface FormData {
  username: string;
  pwd: string;
}

type FormField = "username" | "pwd";

export default function Login() {
  const { signin } = useAuth();
  const { t } = useTranslation();

  return (
    <>
      <Trans i18nKey="login.title" />
      <Formik
        initialValues={{ username: "", pwd: "" }}
        validationSchema={Yup.object({
          username: Yup.string()
            .required(t("login.form.username.valid.required"))
            .min(10, t("login.form.username.valid.incorrectFormat"))
            .test(
              "format",
              t("login.form.username.valid.incorrectFormat"),
              (value) => {
                if (/[@!#$~%^}&*()_+\-={}[\]:";'<>,.?/|\\]+/g.test(value || ""))
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
          signin(values);
          setSubmitting(false);
        }}
      >
        <Form>
          <div>
            <label htmlFor="username">{t("login.form.username.label")}</label>
            <Field
              name="username"
              type="text"
              placeholder={t("login.form.username.placeholder")}
            />
            <ErrorMessage name="username" />
          </div>
          <div>
            <label htmlFor="pwd">{t("login.form.pwd.label")}</label>
            <Field
              name="pwd"
              type="text"
              placeholder={t("login.form.pwd.placeholder")}
            />
            <ErrorMessage name="pwd" />
          </div>

          <button type="submit">{t("login.formButton")}</button>
        </Form>
      </Formik>
    </>
  );
}
