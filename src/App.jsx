import { useEffect, useState } from "react";
import "./App.css";

function App() {
  // Stores all of our notes
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  // Stores the title being typed
  const [title, setTitle] = useState("");

  // Stores the note content being typed
  const [content, setContent] = useState("");
// Stores the search text
const [searchTerm, setSearchTerm] = useState("");
  // Stores the selected colour
  const [color, setColor] = useState("default");

  // Stores whether dark mode is active
  const [darkMode, setDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    return savedDarkMode === "true";
  });

  // Save notes to localStorage
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // Save dark mode preference to localStorage
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  // Add a new note
  const addNote = () => {
    // Prevent empty notes
    if (title.trim() === "" && content.trim() === "") {
      return;
    }

    const newNote = {
      id: Date.now(),
      title: title,
      content: content,
      color: color,
    };

    setNotes([...notes, newNote]);

    // Clear the form after adding
    setTitle("");
    setContent("");
    setColor("default");
  };

  // Delete a note
  const deleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);

    setNotes(updatedNotes);
  };

  // Filters notes based on the search text
const filteredNotes = notes.filter((note) =>
  note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  note.content.toLowerCase().includes(searchTerm.toLowerCase())
);

  return (
    <div className={`app ${darkMode ? "dark-mode" : ""}`}>
      {/* Navigation Bar */}
      <header className="navbar">
        <div className="logo">
          <span className="logo-icon">💡</span>
          <span>Keep</span>
        </div>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search your notes..."
          />
        </div>

        <div className="nav-actions">
          <button
            type="button"
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle dark mode"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {/* Create Note */}
        <section className="create-note">
          <input
  type="text"
  placeholder="Search your notes..."
  value={searchTerm}
  onChange={(event) => setSearchTerm(event.target.value)}
/>

          <textarea
            placeholder="Take a note..."
            value={content}
            onChange={(event) => setContent(event.target.value)}
          ></textarea>

          <div className="note-controls">
            {/* Colour Picker */}
            <div className="color-picker">
              <button
                type="button"
                className={`color-button default ${
                  color === "default" ? "selected" : ""
                }`}
                onClick={() => setColor("default")}
                title="Default"
                aria-label="Default note colour"
              ></button>

              <button
                type="button"
                className={`color-button yellow ${
                  color === "yellow" ? "selected" : ""
                }`}
                onClick={() => setColor("yellow")}
                title="Yellow"
                aria-label="Yellow note colour"
              ></button>

              <button
                type="button"
                className={`color-button green ${
                  color === "green" ? "selected" : ""
                }`}
                onClick={() => setColor("green")}
                title="Green"
                aria-label="Green note colour"
              ></button>

              <button
                type="button"
                className={`color-button blue ${
                  color === "blue" ? "selected" : ""
                }`}
                onClick={() => setColor("blue")}
                title="Blue"
                aria-label="Blue note colour"
              ></button>

              <button
                type="button"
                className={`color-button pink ${
                  color === "pink" ? "selected" : ""
                }`}
                onClick={() => setColor("pink")}
                title="Pink"
                aria-label="Pink note colour"
              ></button>
            </div>

            <button type="button" onClick={addNote}>
              Add Note
            </button>
          </div>
        </section>

        {/* Notes */}
        <section className="notes-container">
          <div className="notes-grid">
             {filteredNotes.map((note) => (
              <div
                className={`note ${note.color}`}
                key={note.id}
              >
                <div>
                  <h3>{note.title}</h3>

                  <p>{note.content}</p>
                </div>

                <button
                  type="button"
                  className="delete-button"
                  onClick={() => deleteNote(note.id)}
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;