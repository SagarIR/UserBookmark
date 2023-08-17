import { Route, BrowserRouter, Routes } from "react-router-dom";
import Layout from "./component/layout";
import User from "./component/user";
import BookmarkedUser from "./component/bookmarkUser";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="user" element={<User />} />
        <Route path="bookmarked" element={<BookmarkedUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
