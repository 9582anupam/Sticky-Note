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

    // useEffect(() => {
    //     const loggedIn = localStorage.getItem("loggedIn");
    //     if (loggedIn) {
    //         setLoggedIn(true);
    //     } else {
    //         setLoggedIn(false);
    //     }
    // }, []);
    useEffect(() => {
        setLoggedIn(true);
    }, []);

    useEffect(() => {
        const getNotes = async () => {
            const data = await fetchAll();

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
        resetNoteZIndexOnDelete(notes.findIndex((n) => n.id === id));
        setNotes(notes.filter((n) => n.id !== id));
        deleteData(id);
    };

    const handleDragNote = (id, x, y) => {
        setNotes((prevNotes) => {
            // Update the state with the new position
            const updatedNotes = prevNotes.map((note) =>
                note.id === id ? { ...note, x, y } : note
            );

            // Find the note that was updated and call putData with it
            const updatedNote = updatedNotes.find((note) => note.id === id);
            putData(updatedNote);

            // Return the updated notes to update the state
            return updatedNotes;
        });
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

    const bringToFront = (id) => {
        setNotes((prevNotes) => {
            const targetNote = prevNotes.find((item) => item.id === id);
            const targetZIndex = targetNote.zIndex;

            const updatedNotes = prevNotes.map((item) => {
                if (item.id === id) {
                    // Set the zIndex of the target note to the length of the notes array
                    return { ...item, zIndex: prevNotes.length };
                } else if (item.zIndex > targetZIndex) {
                    // Decrease the zIndex of notes whose zIndex is greater than the target note
                    return { ...item, zIndex: item.zIndex - 1 };
                }
                return item;
            });

            // Update the notes in the database right after calculating the updated state
            updatedNotes.forEach((note) => putData(note));

            return updatedNotes;
        });
    };

    const resetNoteZIndexOnDelete = (deletedZIndex) => {
        setNotes((prevNotes) => {
            // Map through the notes to update their zIndex based on the deleted zIndex
            const updatedNotes = prevNotes.map((item) => {
                if (item.zIndex > deletedZIndex) {
                    // Decrease zIndex of notes whose zIndex is greater than the deleted zIndex
                    return { ...item, zIndex: item.zIndex - 1 };
                }
                return item;
            });

            // Return the updated notes to trigger a state update
            return updatedNotes;
        });

        // Update the notes in the database after calculating the updated state
        notes.forEach((note) => putData(note));
    };

    return (
        <div className="bg-gray-700 h-full max-w-[100vw] overflow-x-auto overflow-y-scroll relative flex flex-col items-center">
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
                <div className="relative z-10">
                    {filteredNotes.map((note) => (
                        <Note
                            key={note.id}
                            note={note}
                            id={note.id}
                            initialTitle={note.title}
                            initialDescription={note.content}
                            initialX={note.x}
                            initialY={note.y}
                            style={{ backgroundColor: note.color }}
                            height={note.height}
                            width={note.width}
                            minimize={note.minimize}
                            isHighlighted={note.id === highlightedNoteId}
                            onEdit={handleEditNote}
                            onDelete={handleDeleteNote}
                            onDrag={handleDragNote}
                            zIndex={note.zIndex}
                            bringToFront={bringToFront}
                        />
                    ))}
                </div>
                <div className="fixed right-5 z-[999999999999999]">
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
                            notesLength={notes.length}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
