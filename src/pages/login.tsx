import { log } from 'console';
import {auth ,provider} from '../config/firebse';
import {signInWithPopup} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
export const Login = () => {
   const navigate = useNavigate();

    const signinwithgoogle =async() =>{
     const result =await signInWithPopup(auth,provider);
     navigate("/");
    };
  return (
    <div>
      
      <p> Sign In With Google To Continue</p>

      <button onClick={signinwithgoogle}> Sign In With google</button>
    </div>
  );
};
