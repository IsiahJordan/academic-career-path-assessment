import styles from './SignUp.module.css'
import { Link } from 'react-router-dom'
import { User, Mail, Lock } from 'lucide-react'
import { useSignup } from '@/hooks/useSignup'

function SignUp() {
  const { mutate, isLoading, error, data} = useSignup();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      email: e.target.email.value,
      full_name: e.target.full_name.value,
      password: e.target.password.value,
      role: "student"
    };
    
    mutate(formData, {
      onSuccess: (res) => {
        console.log("Signup successful", res);
      },
      onError: (err) => {
        console.error("Signup failed", err.message);
      }
    });
  };

  return (
    <div className={styles.modal}>
      <div className={styles.header}>
        Sign Up to <strong>ACPA</strong>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.textbox}>
          <User />
          <input className={styles.text} type="text" name="full_name" placeholder="Name" required/>
        </div>
        <div className={styles.textbox}>
          <Mail />
          <input className={styles.text} type="email" name="email" placeholder="Email" required/>
        </div>
        <div className={styles.textbox}>
          <Lock />
          <input className={styles.text} type="password" name="password" placeholder="Password" required/>
        </div>
        <div className={styles.textbox}>
          <Lock />
          <input className={styles.text} type="password" name="repassword" placeholder="Re-Password" required/>
        </div>
        <div className={styles.footer}>
          <button className={styles.button} type="submit">Create Account</button>
          <button className={styles.google}>
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
              width={20}
              height={20}
              className={styles.logo}
            />
            <span>Sign in with Google</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignUp

