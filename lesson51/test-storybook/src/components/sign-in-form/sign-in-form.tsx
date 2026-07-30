import { Button } from "../../stories/Button";
import styles from "./sign-in-form.module.css";

export const SignInForm = () => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Sign in to continue</h3>
      <form className={styles.form}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" />
        </div>
      </form>
      <Button className={styles.button} mode="primary" label="Sign in" />
      <p>
        Don't have an account? <a href="/sign-up">Sign up</a>
      </p>
    </div>
  );
};
