import styles from './SignIn.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useSignin } from '@/hooks/useSignin'
import { verifyUser } from "@/services/AuthService"; 
import { User, Mail, Lock } from 'lucide-react';

function SignIn() {
  const signinMutate = useSignin();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signinMutate.mutate(
      { email, password },
      {
        onSuccess: async (data) => {
          localStorage.setItem("authToken", data.access_token); // match api.ts interceptor

          /*const res = await verifyUser(data.access_token);
          if (res.status === 1) {
            navigate("/");
          } else {
            alert("Invalid session");
          }*/
          
          navigate("/");
        },
      }
    );
  };


  return (
    <div className={styles.modal}>
      <div className={styles.header}>
        Welcome to <strong>ACPA</strong>
      <p className={styles.subheader}>If you have an account already, proceed to the login</p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.textbox}>
          <Mail />
          <input className={styles.text} type="email" name="email" placeholder="Email" required/>
        </div>
        <div className={styles.textbox}>
          <Lock />
          <input className={styles.text} type="password" name="password" placeholder="Password" required/>
        </div>
        <div className={styles.footer}>
          <button className={styles.button}>Login</button>
          { /*<button className={styles.google}>
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
              width={20}
              height={20}
              className={styles.logo}
            />
            <span>Sign in with Google</span>
          </button> */}
        </div>
      </form>
    </div>
  );
}

export default SignIn

