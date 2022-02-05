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
      <PageHeading>Sign In to Leave Comments</PageHeading>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <Label htmlFor="login-email">Email</Label>
          <Input
            value={email}
            onChange={onEmailChange}
            type="email"
            name="login-email"
            required
          />
        </div>
        <div className="mb-3">
          <Label htmlFor="login-password">Password</Label>
          <Input
            value={password}
            onChange={onPasswordChange}
            type="password"
            name="login-password"
            required
          />
        </div>
        <Button type="submit">Sign In</Button>
      </form>
    </>
  );
};

export default SignIn;
