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
    <nav className="bg-primary border-b border-light-100/10">
      <div className="wrapper px-5 py-4 flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <div className="text-2xl font-bold text-gradient">Stream</div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#" className="text-light-200 hover:text-light-100 transition">Home</a>
          <a href="#" className="text-light-200 hover:text-light-100 transition">My List</a>
          <a href="#" className="text-light-200 hover:text-light-100 transition">Browse</a>
        </div>

        {/* Auth Section */}
        <div className="hidden md:flex items-center gap-4">
          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-light-200/20 flex items-center justify-center text-light-100 text-sm font-bold">
                  {userName.charAt(0).toUpperCase()}
                </div>
                <span className="text-light-100 text-sm">{userName}</span>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 hover:bg-light-100/10 rounded-lg transition"
              >
                <LogOut size={18} className="text-light-200" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowSignUp(true)}
              className="px-6 py-2 bg-light-200 text-primary rounded-lg font-bold hover:bg-light-100 transition"
            >
              Sign Up
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-light-100"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-dark-100 border-t border-light-100/10">
          <div className="wrapper px-5 py-4 flex flex-col gap-4 max-w-7xl mx-auto">
            <a href="#" className="text-light-200 hover:text-light-100 transition block">Home</a>
            <a href="#" className="text-light-200 hover:text-light-100 transition block">My List</a>
            <a href="#" className="text-light-200 hover:text-light-100 transition block">Browse</a>

            <div className="border-t border-light-100/10 pt-4">
              {isLoggedIn ? (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-light-200/20 flex items-center justify-center text-light-100 text-sm font-bold">
                      {userName.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-light-100 text-sm">{userName}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-light-200 hover:text-light-100 transition text-left flex items-center gap-2"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowSignUp(true)}
                  className="w-full px-6 py-2 bg-light-200 text-primary rounded-lg font-bold hover:bg-light-100 transition"
                >
                  Sign Up
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Sign Up Modal */}
      {showSignUp && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-dark-100 rounded-2xl p-8 max-w-md w-full border border-light-100/10">
            <h2 className="text-2xl font-bold text-white mb-6">Create Account</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-light-200 text-sm mb-2">Name</label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Your name"
                  className="w-full bg-light-100/5 border border-light-100/20 rounded-lg px-4 py-2 text-light-100 placeholder-light-200 outline-hidden focus:border-light-200 transition"
                />
              </div>

              <div>
                <label className="block text-light-200 text-sm mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full bg-light-100/5 border border-light-100/20 rounded-lg px-4 py-2 text-light-100 placeholder-light-200 outline-hidden focus:border-light-200 transition"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowSignUp(false)}
                  className="flex-1 px-4 py-2 border border-light-100/20 text-light-200 rounded-lg hover:bg-light-100/5 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSignUp}
                  className="flex-1 px-4 py-2 bg-light-200 text-primary rounded-lg font-bold hover:bg-light-100 transition disabled:opacity-50"
                  disabled={!userName || !email}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}