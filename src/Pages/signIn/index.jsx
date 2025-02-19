import { useContext, useState, useRef } from "react";
import { ShoppingContext } from "../../Context";
import Layout from "../../Components/Layout";
import { NavLink, Navigate } from "react-router-dom";

const SignIn = () => {
  const context = useContext(ShoppingContext);
  const [view, setView] = useState('user-info');
  const [redirect, setRedirect] = useState(false);
  const form = useRef(null);

  const account = localStorage.getItem('account');
  const parsedAccount = JSON.parse(account)

  const noAccountInLocalStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 : true ;
  const noAccountInLocalState = context.account ? Object.keys(context.account).length === 0 : true;
  const hasUserAnAccount = !noAccountInLocalStorage || !noAccountInLocalState

  const handleSignIn = () => {
    const stringifiedSignOut = JSON.stringify(false);
    localStorage.setItem('sign-out', stringifiedSignOut);
    context.setSignOut(false);
    setRedirect(true);
  }

  const createAnAccount = ()=>{
    const formData = new FormData(form.current);
    const data = {
      name: formData.get('name'),
      email:formData.get('email'),
      password: formData.get('password')
    }

    const stringifiedAccount = JSON.stringify(data);
    localStorage.setItem('account', stringifiedAccount);
    context.setAccount(data);
    
    handleSignIn();
  }

  const renderLogin = () =>{
    return(
      <div className=" p-8 rounded-lg shadow-lg w-full max-w-sm mx-auto mt-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent font-semibold">
            Sign In
          </h1>
          <p className="text-lg text-gray-400">
            Welcome back! Please enter your details to log in.
          </p>
        </div>

        {/* Sign In Form */}
        <form className="space-y-4">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-gray-300">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent"
              placeholder="Enter your email"
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-gray-300">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent"
              placeholder="Enter your password"
            />
          </div>

          {/* Sign In Button */}
          
          <button
            type="button"
            className="w-full bg-violet-600 hover:bg-violet-700 text-white py-3 rounded-lg shadow-md text-lg focus:outline-none"
            onClick={() => handleSignIn()}
          >
            Log In
          </button>
        </form>

        {/* Forgot Password Link */}
        <div className="text-center mt-4">
          <NavLink className="text-violet-600 hover:text-violet-700 text-sm">
            Forgot your password?
          </NavLink>
        </div>

        {/* Sign Up Link */}
        <div className="text-center mt-4">
          <p className="text-sm text-gray-400">
            Don't have an account?
            <button 
            className="text-violet-600 hover:text-violet-700 text-sm cursor-pointer"
            onClick={() => setView('create-user-info')}
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    )
  }
  const renderRegister = () =>{
    return(
      <div className=" p-8 rounded-lg shadow-lg w-full max-w-sm mx-auto mt-8">
      <div className="text-center mb-6">
        <h1 className="text-2xl bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent font-semibold">
          Register
        </h1>
        <p className="text-lg text-gray-400">
          Welcome! Please enter your details to register.
        </p>
      </div>

      {/* Register Form */}
      <form className="space-y-4" ref={form}>
        {/* Name Input */}
        <div>
          <label htmlFor="name" className="block text-gray-300">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full p-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent"
            placeholder="Enter name"
            
          />
        </div>
        {/* Email Input */}
        <div>
          <label htmlFor="email" className="block text-gray-300">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full p-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent"
            placeholder="Enter your email"
            
          />
        </div>

        {/* Password Input */}
        <div>
          <label htmlFor="password" className="block text-gray-300">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full p-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent"
            placeholder="Enter your password"
          />
        </div>

        {/* Sign In Button */}
        
        <button
          type="button"
          className="w-full bg-violet-600 hover:bg-violet-700 text-white py-3 rounded-lg shadow-md text-lg focus:outline-none"
          onClick={() => createAnAccount()}
        >
          register
        </button>
      </form>

      {/* Forgot Password Link */}
      <div className="text-center mt-4">
        <NavLink className="text-violet-600 hover:text-violet-700 text-sm">
          Forgot your password?
        </NavLink>
      </div>

      {/* Sign in Link */}
      <div className="text-center mt-4">
        <p className="text-sm text-gray-400">
        do you already have an account?
          <button 
          className="text-violet-600 hover:text-violet-700 text-sm cursor-pointer"
          onClick={() => setView('user-info')}
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
    )
  }

  const renderView = () => view === 'create-user-info'?renderRegister(): renderLogin()

  if (redirect) {
    return <Navigate replace to={'/'} />;
  }

  return (
    <Layout>
      {renderView()}
    </Layout>
  );
};

export default SignIn;
