import UserProfile from "../../Pages/login/comp/userprofile";

function Header({ isLoggedIn }) {
  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-md">
      <h1 className="text-xl font-bold">Header</h1>
      {isLoggedIn && <UserProfile />} 
    </div>
  );
}

export default Header;
