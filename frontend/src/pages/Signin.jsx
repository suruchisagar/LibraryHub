import {useState} from 'react';
import signin2 from '../assets/images/signin2.jpg';
import{Link, useNavigate} from 'react-router-dom';
import axios from 'axios';


const Signin = () => {
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const navigate = useNavigate();
    async function handleSignin(e){
        e.preventDefault();
        const response=await axios.post('http://localhost:3000/api/v1/auth/login', {email, password});
        let token=response.data.token;
        localStorage.setItem('token',token);
        localStorage.setItem('full_name',response.data.full_name);
        if(response.data.role_id == 1){
          navigate('/admin/dashboard');
        }else if(response.data.role_id ==2){
          navigate('/superadmin/dashboard')
        }else if(response.data.role_id == 3){
          navigate('/student/dashboard');
        }
        
    }
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-2">Welcome back!</h2>
          <p className="text-sm text-gray-600 mb-6">
            Enter your credentials to access your account
          </p>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email address</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-600"
                onChange={(e)=> setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <div className="flex justify-between items-center">
                <input
                  type="password"
                  placeholder="Enter password"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-600"
                  onChange={(e)=> setPassword(e.target.value)}
            
                />
                <a href="#" className="text-sm text-blue-600 ml-2">Forgot password?</a>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input type="checkbox" className="accent-gray-600" />
              <label className="text-sm text-gray-700">Remember me for 30 days</label>
            </div>

            <button
              type="submit"
              className="w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-800 transition"
              onClick={handleSignin}
            >
              Login
            </button>
          </form>

          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-300" />
            <span className="px-2 text-sm text-gray-500">or</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <div className="flex justify-center gap-4">
            <button className="flex items-center border px-4 py-2 rounded text-sm">
              <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google" className="mr-2" />
              Sign in with Google
            </button>
            <button className="flex items-center border px-4 py-2 rounded text-sm">
              <img src="https://img.icons8.com/ios-filled/16/000000/mac-os.png" alt="Apple" className="mr-2" />
              Sign in with Apple
            </button>
          </div>

          <p className="mt-4 text-sm text-center text-gray-700">
            Don’t have an account?{' '}
            <Link to='/signup' className="text-blue-600">Sign Up</Link>
          </p>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden md:block w-1/2">
        <img
            src={signin2} width={275}
            className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Signin;
