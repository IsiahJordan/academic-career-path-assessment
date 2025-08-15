import SignUp from '@/components/SignUp'
import SignIn from '@/components/SignIn'
import { useLocation } from 'react-router-dom'

function SignPage(){
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // What type of sign form; SignIn, SignOut?
  const method = queryParams.get("form");

  return (
    <>
      <div id="sign-content">
        <div id="sign-image">
        </div>
        <div id="sign-form">
          {method === "in" ? (
            <SignIn/>
          ): (
            <SignUp/>
          )}
        </div>
      </div>
    </>
  );
}

export default SignPage
