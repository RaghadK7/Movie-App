import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [showSignUp, setShowSignUp] = useState(false);

  const handleSignUp = () => {
    if (email && userName) {
      setIsLoggedIn(true);
      setShowSignUp(false);
      setIsOpen(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
    setEmail('');
  };

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-primary/80 backdrop-blur-md border-b border-light-100/5">
        <div className="px-5 sm:px-10 py-3 flex justify-between items-center max-w-7xl mx-auto">
          {/* Logo */}
          <div className="text-2xl font-bold text-gradient">Stream</div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
            <a href="#" className="text-light-200 text-sm hover:text-light-100 transition">Home</a>
            <a href="#" className="text-light-200 text-sm hover:text-light-100 transition">My List</a>
            <a href="#" className="text-light-200 text-sm hover:text-light-100 transition">Browse</a>
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-light-200/20 flex items-center justify-center text-light-100 text-xs font-bold">
                    {userName.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-light-100 text-xs">{userName}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-light-200 hover:text-light-100 transition text-xs"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowSignUp(true)}
                className="px-5 py-1.5 bg-light-200 text-primary rounded-lg font-bold text-xs hover:bg-light-100 transition"
              >
                Sign Up
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-light-100 text-2xl"
          >
            {isOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar Menu */}
      <div
        className={`fixed inset-0 z-30 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
      </div>

      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-primary/95 backdrop-blur-md border-r border-light-100/10 z-30 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="pt-20 px-6 flex flex-col h-full">
          {/* Menu Links */}
          <div className="flex flex-col gap-6 mb-8">
            <a
              href="#"
              onClick={() => setIsOpen(false)}
              className="text-light-200 hover:text-light-100 transition text-sm"
            >
              Home
            </a>
            <a
              href="#"
              onClick={() => setIsOpen(false)}
              className="text-light-200 hover:text-light-100 transition text-sm"
            >
              My List
            </a>
            <a
              href="#"
              onClick={() => setIsOpen(false)}
              className="text-light-200 hover:text-light-100 transition text-sm"
            >
              Browse
            </a>
          </div>

          {/* Divider */}
          <div className="border-t border-light-100/10 my-6"></div>

          {/* Auth Section */}
          <div className="flex flex-col gap-3">
            {isLoggedIn ? (
              <>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-full bg-light-200/20 flex items-center justify-center text-light-100 text-xs font-bold">
                    {userName.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-light-100 text-xs">{userName}</span>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="text-light-200 hover:text-light-100 transition text-left text-xs"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setShowSignUp(true);
                  setIsOpen(false);
                }}
                className="w-full px-5 py-2 bg-light-200 text-primary rounded-lg font-bold text-xs hover:bg-light-100 transition"
              >
                Sign Up
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Sign Up Modal */}
      {showSignUp && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-dark-100 rounded-2xl p-8 max-w-md w-full border border-light-100/10">
            <h2 className="text-2xl font-bold text-white mb-6">Create Account</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-light-200 text-xs mb-2">Name</label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Your name"
                  className="w-full bg-light-100/5 border border-light-100/20 rounded-lg px-4 py-2 text-light-100 placeholder-light-200 outline-hidden focus:border-light-200 transition text-sm"
                />
              </div>

              <div>
                <label className="block text-light-200 text-xs mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full bg-light-100/5 border border-light-100/20 rounded-lg px-4 py-2 text-light-100 placeholder-light-200 outline-hidden focus:border-light-200 transition text-sm"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowSignUp(false)}
                  className="flex-1 px-4 py-2 border border-light-100/20 text-light-200 rounded-lg hover:bg-light-100/5 transition text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSignUp}
                  className="flex-1 px-4 py-2 bg-light-200 text-primary rounded-lg font-bold hover:bg-light-100 transition disabled:opacity-50 text-sm"
                  disabled={!userName || !email}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add padding to body for fixed navbar */}
      <div className="pt-16"></div>
    </>
  );
}