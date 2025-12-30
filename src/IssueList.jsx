import { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

export default function IssueList() {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "issues"),
      orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(q, (snapshot) => {
      setIssues(snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })));
    });

    return () => unsub();
  }, []);

  return (
    <div style={{ marginTop: "40px" }}>
      <h3>All Issues</h3>

      {issues.map(issue => (
        <div key={issue.id} className="issue-card">

          <b>{issue.title}</b>
          <p>{issue.description}</p>
          <p>Priority: {issue.priority}</p>
          <p>Status: {issue.status}</p>
          <p>Assigned To: {issue.assignedTo}</p>
        </div>
      ))}
    </div>
  );
}

