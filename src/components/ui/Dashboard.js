import React, { useState } from "react";
import Note from "../notes/Note";
import newNote from "../../utils/icons/new-note.svg";
import NewNote from "../notes/NewNote";
import Button from "@mui/material/Button";
import { putData, deleteData, fetchAll } from "../../services/noteDBService";
import { useEffect } from "react";
import Alert from "@mui/material/Alert";

const colorOptions = ["#fa9fba", "#8AC256", "#97d2fb", "#fd9873", "#B89CC8"];

const Dashboard = () => {
    const [notes, setNotes] = useState([]);
    const [newNoteEnable, setNewNoteEnable] = useState(false);
    const [highlightedNoteId, setHighlightedNoteId] = useState(null);
    const [editingNote, setEditingNote] = useState(null);
    const [selectedColor, setSelectedColor] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const loggedIn = localStorage.getItem("loggedIn");
        if (loggedIn) {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
    }, []);

    useEffect(() => {
        const getNotes = async () => {
            const data = await fetchAll();
            console.log("data", data);

            const notesArray = Object.keys(data).map((key) => ({
                ...data[key],
                id: key,
                x: parseInt(data[key].x, 10),
                y: parseInt(data[key].y, 10),
            }));

            setNotes(notesArray);
        };

        getNotes();
        setHighlightedNoteId(null);
    }, []);

    const addNote = () => {
        setNewNoteEnable(!newNoteEnable);
        if (editingNote) {
            setEditingNote(null);
        }
    };

    const handleCreateOrUpdateNote = (note) => {
        if (note) {
            if (editingNote) {
                setNotes(
                    notes.map((n) =>
                        n.id === editingNote.id
                            ? { ...note, x: editingNote.x, y: editingNote.y }
                            : n
                    )
                );
                putData({ ...note, x: editingNote.x, y: editingNote.y });
                setEditingNote(null);
            } else {
                setNotes([{ ...note, x: 50, y: 0 }, ...notes]);
                putData({ ...note, x: 50, y: 0 });
                setHighlightedNoteId(note.id);
            }
        }
        setNewNoteEnable(false);
    };

    const handleEditNote = (id) => {
        const noteToEdit = notes.find((n) => n.id === id);
        setEditingNote(noteToEdit);
        setNewNoteEnable(true);
    };

    const handleDeleteNote = (id) => {
        setNotes(notes.filter((n) => n.id !== id));
        deleteData(id);
    };

    const handleDragNote = (id, x, y) => {
        setNotes(
            notes.map((note) => (note.id === id ? { ...note, x, y } : note))
        );
        putData({ ...notes.filter((n) => n.id === id)[0], x, y });
    };

    const handleColorFilter = (color) => {
        setSelectedColor(color);
        setHighlightedNoteId(null);
    };

    const clearColorFilter = () => {
        setSelectedColor("");
        setHighlightedNoteId(null);
    };

    const filteredNotes = selectedColor
        ? notes.filter((note) => note.color === selectedColor)
        : notes;

    return (
        <div className="bg-gray-700 h-full max-w-[100vw] overflow-x-auto relative flex flex-col items-center">
            <div>
                {!loggedIn && (
                    <Alert
                        severity="warning"
                        variant="outlined"
                        className="mt-2">
                        You're not logged in. Your progress won't be saved.
                    </Alert>
                )}
            </div>
            <p className="text-gray-200 text-5xl py-4 font-bold">
                Sticky Notes
            </p>

            <div className="mb-4 flex gap-4 items-center justify-center">
                <p className="text-gray-200 text-xl bottom-[3px] relative">
                    Color Filter:
                </p>
                <div className="flex space-x-4">
                    {colorOptions.map((color) => (
                        <div
                            key={color}
                            className={`w-6 h-6 rounded-full  transition-transform duration-50 ease-in-out ${
                                selectedColor === color
                                    ? "scale-125 border-2 border-white "
                                    : "scale-100"
                            } hover:scale-125`}
                            style={{
                                backgroundColor: color,
                                color: "#fff",
                            }}
                            onClick={() => handleColorFilter(color)}
                        />
                    ))}
                    <Button
                        onClick={clearColorFilter}
                        sx={{ padding: 0, margin: 0 }}>
                        All
                    </Button>
                </div>
            </div>

            <div className="relative w-full h-full">
                {filteredNotes.map((note) => (
                    <Note
                        key={note.id}
                        id={note.id}
                        initialTitle={note.title}
                        initialDescription={note.content}
                        initialX={note.x}
                        initialY={note.y}
                        style={{ backgroundColor: note.color }}
                        isHighlighted={note.id === highlightedNoteId}
                        onEdit={handleEditNote}
                        onDelete={handleDeleteNote}
                        onDrag={handleDragNote}
                    />
                ))}
                <div className="fixed right-5">
                    <div
                        type="button"
                        className="fixed right-5"
                        onClick={addNote}>
                        <img
                            src={newNote}
                            alt="New Note"
                            className={`w-8 h-8 hover:opacity-50 transition-all cursor-pointer ${
                                newNoteEnable ? "rotate-45" : ""
                            }`}
                        />
                    </div>
                    {newNoteEnable && (
                        <NewNote
                            onCreate={handleCreateOrUpdateNote}
                            initialTitle={editingNote ? editingNote.title : ""}
                            initialContent={
                                editingNote ? editingNote.content : ""
                            }
                            initialColor={editingNote ? editingNote.color : ""}
                            initialId={editingNote ? editingNote.id : ""} // Pass initial ID
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
