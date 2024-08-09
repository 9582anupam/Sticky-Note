import React, { useState } from "react";
import Draggable from "react-draggable";
import "./note.css";
import editNote from "../../utils/icons/edit-note.svg";
import closeCross from "../../utils/icons/close-cross.svg";
import { IconButton } from "@mui/material";

const Note = ({
    id,
    initialTitle = "Untitled",
    initialDescription = "No description",
    style = {},
    initialX = 0,
    initialY = 0,
    isHighlighted = false,
    onEdit,
    onDelete,
    onDrag,
}) => {
    const [title] = useState(initialTitle); // Title is now read-only
    const [description] = useState(initialDescription); // Description is now read-only

    const handleDrag = (e, data) => {
        onDrag(id, data.x, data.y);
    };

    return (
        <Draggable
            defaultPosition={{ x: initialX, y: initialY }}
            onStop={handleDrag}>
            <div
                className={`note cursor-pointer w-80 h-80 ${
                    isHighlighted ? "highlighted" : ""
                }`}
                style={{ ...style, position: "absolute" }}>
                <div className="flex flex-col h-full font-shadows">
                    {/* Header */}
                    <div className="flex justify-between items-center border-2 border-transparent rounded-lg hover:border-white  text-cyan-950">
                        <IconButton
                            onClick={() => onDelete(id)}
                            className="p-1">
                            <img
                                src={closeCross}
                                alt="delete"
                                className="h-7"
                            />
                        </IconButton>
                        <div className="text-base md:text-xl lg:text-2xl font-bold p-2 text-center cursor-default truncate ">
                            {title}
                        </div>

                        <IconButton onClick={() => onEdit(id)} className="p-1">
                            <img src={editNote} alt="edit" className="h-7" />
                        </IconButton>
                    </div>
                    <div className="w-full h-[2px] bg-black"></div>
                    <div className="flex-1 overflow-y-auto p-2 rounded-lg">
                        <p className="text-lg md:text-xl lg:text-2xl font-medium leading-relaxed text-left whitespace-pre-wrap break-words">
                            {description}
                        </p>
                    </div>
                </div>
            </div>
        </Draggable>
    );
};

export default Note;
