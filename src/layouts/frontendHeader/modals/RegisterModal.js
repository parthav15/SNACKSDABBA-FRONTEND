import PropTypes from "prop-types";
const RegisterModalContent = ({ onClose }) => {
  return (
    <div className="modal">
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
          <div className="flex justify-between">
            <h2 className="text-xl font-bold text-gray-700 mb-4 m-auto leading-4">Register</h2>
            <button onClick={onClose} className=" focus:outline-none bg-red-500 hover:bg-red-700">
              ✕
            </button>
          </div>
          <form>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white py-2 px-4 rounded-md shadow-sm hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-teal-500 "
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
RegisterModalContent.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default RegisterModalContent;
