import signup2 from '../assets/images/signup2.jpg';
import {useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
        const[email,setEmail]=useState('');
        const[password,setPassword]=useState('');
        const[name,setName]=useState('');
        const[phone,setPhone]=useState('');
        const[role_id,setRole]=useState('');
             
        async function handleSignup(e){
            e.preventDefault();
            console.log('admin_signup');
             const getRoleId = (role_id) => {
              if (role_id === 'user') return 3;
              if (role_id === 'admin') return 1;
              return null;
             };const role = getRoleId(role_id);

            
            const response=await axios.post('http://localhost:3000/api/v1/auth/register', {email, password, name, phone,role_id:role});
            let token=response.data.token;
            localStorage.setItem('token',token);
        } 
        
  return (
    <div className="min-h-screen flex flex-col md:flex-row overflow-hidden">
      {/* Left Section - Signup Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-4 py-6 md:py-0">
        <div className="w-full max-w-sm md:max-w-md">
          <h2 className="text-2xl font-semibold mb-2">Get Started</h2>

          <form className="space-y-3 text-sm">
            {/* Name */}
            <div>
              <label className="block mb-1 font-medium">Name</label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-600"
                onChange={(e)=> setName(e.target.value)}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                placeholder="Your email"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-600"
                onChange={(e)=> setEmail(e.target.value)}
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block mb-1 font-medium">Phone</label>
              <input
                type="tel"
                placeholder="Phone number"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-600"
                onChange={(e)=> setPhone(e.target.value)}
              />
            </div>

            {/* Role */}
            <div>
              <label className="block mb-1 font-medium">Role</label>
              <select className="w-full border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:ring-1 focus:ring-gray-600"
              onChange={(e)=> setRole(e.target.value)}
              >
                <option value="">Select role</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* Password */}
            <div>
              <label className="block mb-1 font-medium">Create Password</label>
              <input
                type="password"
                placeholder="Password"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-600"
                onChange={(e)=> setPassword(e.target.value)}
              />
            </div>

            {/* Terms */}
            <div className="flex items-center space-x-2">
              <input type="checkbox" className="accent-gray-600" />
              <label className="text-xs">I agree to the terms & policy</label>
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              className="w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-700 transition text-sm"
              onClick={handleSignup}
            >
              Signup
            </button>
          </form>

          {/* OR separator */}
          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-300" />
            <span className="px-2 text-sm text-gray-500">or</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Google & Apple buttons */}
          <div className="flex justify-between gap-3 mt-4">
  <button className="flex items-center justify-center border px-4 py-2 rounded text-sm hover:bg-gray-50 transition w-1/2">
    <img
      src="https://img.icons8.com/color/20/000000/google-logo.png"
      alt="Google"
      className="mr-2"
    />
    Sign in with Google
  </button>
  <button className="flex items-center justify-center border px-4 py-2 rounded text-sm hover:bg-gray-50 transition w-1/2">
    <img
      src="https://img.icons8.com/ios-filled/20/000000/mac-os.png"
      alt="Apple"
      className="mr-2"
    />
    Sign in with Apple
  </button>
</div>


          {/* Login Link */}
          <p className="mt-3 text-xs text-center text-gray-600">
            Already have an account?{' '}
            <Link to="/signin" className="text-blue-600">Sign In</Link>
          </p>
        </div>
      </div>

      {/* Right Section - Image */}
      <div className="hidden md:block w-1/2">
        <img
          src={signup2}
          className="w-full h-full object-cover"
          alt="signup"
        />
      </div>
    </div>
  );
};
export default Signup;
