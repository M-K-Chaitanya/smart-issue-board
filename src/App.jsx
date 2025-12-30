import { useEffect, useState } from "react";
import "./App.css";

import { auth } from "./firebase";
import Auth from "./Auth";
import IssueForm from "./IssueForm";
import IssueList from "./IssueList";
function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((u) => setUser(u));
    return () => unsub();
  }, []);

  if (!user) return <Auth />;

 return (
  <div className="container">
    <h2>Welcome</h2>
    <p>Logged in as: {user.email}</p>

    <IssueForm />
    <IssueList />
  </div>
);

}

export default App;

