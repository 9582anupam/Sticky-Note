import Draggable from "react-draggable";
import "./note.css";
import editNote from "../../utils/icons/edit-note.svg";
import closeCross from "../../utils/icons/close-cross.svg";
import { IconButton } from "@mui/material";
import MinimizeIcon from "@mui/icons-material/Minimize";
import Tooltip from "@mui/material/Tooltip";
import { useState } from "react";
import ControlCameraIcon from '@mui/icons-material/ControlCamera';

const Note = ({
    id,
    initialTitle = "Untitled",
    initialDescription = "No description",
    style = {},
    initialX,
    initialY,
    isHighlighted = false,
    onEdit,
    onDelete,
    onDrag,
}) => {
    const title = initialTitle;
    const description = initialDescription;
    const [isGrabbing, setIsGrabbing] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);

    const minimize = () => {
        setIsMinimized(!isMinimized);
    };

    const handleMouseDown = () => {
        setIsGrabbing(true);
    };

    const handleMouseUp = () => {
        setIsGrabbing(false);
    };

    const handleDrag = (e, data) => {
        onDrag(id, data.x, data.y);
    };

    return (
        <Draggable
            defaultPosition={{ x: initialX, y: initialY }}
            onStop={handleDrag}
            handle=".content-handle"
        >
            <div
                className={`note w-80 h-80 rounded select-none ${
                    isHighlighted ? "highlighted" : ""
                } ${isMinimized && "h-auto"}`}
                style={{ ...style, position: "absolute" }}>
                <div
                    className="flex flex-col h-full font-shadows"
                    onDoubleClick={() => onEdit(id)}>
                    {/* Header */}
                    <div className="flex justify-between items-center border-2 border-transparent rounded-t hover:border-white  text-cyan-950">
                        <div>
                            <Tooltip title="minimize">
                                <IconButton size="small" onClick={() => minimize(id)}>
                                    <MinimizeIcon
                                        sx={{ height: "28px", width: "28px", color: "black"}}
                                    />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="delete">
                                <IconButton
                                    size="small"
                                    onClick={() => onDelete(id)}
                                    className="p-1">
                                    <img
                                        src={closeCross}
                                        alt="delete"
                                        className="h-7"
                                    />
                                </IconButton>
                            </Tooltip>
                        </div>
                        <div className="text-base md:text-xl lg:text-2xl font-bold p-2 text-center truncate ">
                            {title}
                        </div>

                        <div>
                            {
                                isMinimized &&
                                <Tooltip title="drag" className="content-handle">
                                    <IconButton size="small">
                                        <ControlCameraIcon
                                            sx={{ height: "28px", width: "28px", color: "black" }}
                                        />
                                    </IconButton>
                                </Tooltip>
                            }
                            <Tooltip title="edit">
                                <IconButton
                                    onClick={() => onEdit(id)}
                                    className="p-1">
                                    <img
                                        src={editNote}
                                        alt="edit"
                                        className="h-7"
                                    />
                                </IconButton>
                            </Tooltip>
                        </div>
                    </div>
                    <div className="w-full h-[2px] bg-black"></div>
                    
                    {
                        !isMinimized &&
                        <div
                            className={`flex-1 overflow-y-auto p-2 border-2 border-transparent rounded-b 
                            ${
                                isGrabbing ? "cursor-grabbing" : "cursor-grab"
                            } transition-cursor content-handle`}
                            onMouseDown={handleMouseDown}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={() => setIsGrabbing(false)}
                        >
                            <p className="text-lg md:text-xl lg:text-2xl font-medium leading-relaxed text-left whitespace-pre-wrap break-words">
                                {description}
                            </p>
                        </div>
                    }
                </div>
            </div>
        </Draggable>
    );
};

export default Note;
