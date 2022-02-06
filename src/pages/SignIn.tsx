import {
  ChangeEventHandler,
  FormEventHandler,
  Reducer,
  useCallback,
  useReducer,
} from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "src/auth";
import { PageHeading } from "src/layout";
import Button from "src/components/Button";
import Input from "src/components/Input";
import Label from "src/components/Label";

interface SignInFormData {
  email: string;
  password: string;
}

interface SignInFormAction {
  type: keyof SignInFormData;
  value: string;
}

const reducer: Reducer<SignInFormData, SignInFormAction> =
  ({ email, password }, { type, value }) => {
    switch (type) {
    case "email":
      return { email: value, password };
    case "password":
      return { email, password: value };
    default:
      throw new Error(`SignInFormAction cannot have type of ${type}`);
    }
  };

/**
 * Sign In page component
 */
const SignIn = (): JSX.Element => {
  const { authenticate } = useAuth();
  const navigate = useNavigate();

  // state for input values in the form
  const [{ email, password }, dispatch] =
    useReducer(reducer, { email: "", password: ""});

  // handle input value change
  const onEmailChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => dispatch({ type: "email", value: e.target.value }),
    [],
  );
  const onPasswordChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => dispatch({ type: "password", value: e.target.value }),
    [],
  );

  // form submit handler
  const onSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
    (e) => {
      e.preventDefault();
      authenticate(email, () => navigate("/", { replace: true }));
    },
    [authenticate, email, navigate],
  );

  return (
    <>
      <PageHeading>Sign In <small>to Leave Comments</small></PageHeading>
      <form onSubmit={onSubmit} className="vstack gap-2 mt-5">
        <div className="row">
          <Label
            htmlFor="login-email"
            col
            className="ms-1 ms-sm-0 col-sm-2 text-sm-end"
          >
            Email
          </Label>
          <div className="col-sm-10">
            <Input
              value={email}
              onChange={onEmailChange}
              type="email"
              name="login-email"
              required
            />
          </div>
        </div>
        <div className="row">
          <Label
            htmlFor="login-password"
            col
            className="ms-1 ms-sm-0 col-sm-2 text-sm-end"
          >
            Password
          </Label>
          <div className="col-sm-10">
            <Input
              value={password}
              onChange={onPasswordChange}
              type="password"
              name="login-password"
              required
            />
          </div>
        </div>
        <Button type="submit" className="mt-4 mt-sm-3">Sign In</Button>
      </form>
    </>
  );
};

export default SignIn;
