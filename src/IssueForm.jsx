import { useState } from "react";
import { db, auth } from "./firebase";
import { collection, addDoc, serverTimestamp, getDocs } from "firebase/firestore";


export default function IssueForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [status, setStatus] = useState("Open");
  const [assignedTo, setAssignedTo] = useState("");

  const createIssue = async () => {
  if (status === "Done") {
  alert("Issue cannot be created directly as Done. Move via In Progress.");
  return;
}

    if (!title || !description) {
      alert("Title and description are required");
      return;
    }
    const snapshot = await getDocs(collection(db, "issues"));

const similar = snapshot.docs.find(
  (doc) => doc.data().title.toLowerCase() === title.toLowerCase()
);

if (similar) {
  const proceed = window.confirm(
    "A similar issue already exists. Do you want to continue?"
  );
  if (!proceed) return;
}


    await addDoc(collection(db, "issues"), {
      title,
      description,
      priority,
      status,
      assignedTo,
      createdBy: auth.currentUser.email,
      createdAt: serverTimestamp(),
    });

    alert("Issue created successfully");

    setTitle("");
    setDescription("");
    setAssignedTo("");
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <h3>Create Issue</h3>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br /><br />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br /><br />

      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        style={{ marginLeft: "10px" }}
      >
        <option>Open</option>
        <option>In Progress</option>
        <option>Done</option>
      </select>

      <br /><br />

      <input
        placeholder="Assigned To (email)"
        value={assignedTo}
        onChange={(e) => setAssignedTo(e.target.value)}
      />
      <br /><br />

      <button onClick={createIssue}>Create Issue</button>
    </div>
  );
}

