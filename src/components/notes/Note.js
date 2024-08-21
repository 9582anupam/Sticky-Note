import Draggable from "react-draggable";
import "./note.css";
import editNote from "../../utils/icons/edit-note.svg";
import closeCross from "../../utils/icons/close-cross.svg";
import { IconButton } from "@mui/material";
import MinimizeIcon from "@mui/icons-material/Minimize";
import Tooltip from "@mui/material/Tooltip";
import { useState } from "react";
// import { useRef } from "react";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";

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
    // const nodeRef = useRef(null);

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
            cancel=".content-cancel"
            // nodeRef={nodeRef}
        >
            <ResizableBox
                width={320}
                height={320}
                minConstraints={[186, 100]}
                maxConstraints={[500, 500]}
                className="resizable-box"
                handle={
                    isMinimized ? (
                            <div className="resizable-handle hide"></div>
                    ) : (
                        <div className="resizable-handle"></div>
                    )
                }>
                <div
                    className={`note w-full ${
                        !isMinimized && "h-full"
                    } rounded select-none transition-cursor content-handle ${
                        isGrabbing ? "cursor-grabbing" : "cursor-grab"
                    } ${isHighlighted ? "highlighted" : ""} ${
                        isMinimized && "h-auto"
                    }`}
                    style={{ ...style, position: "absolute" }}
                    onPointerDown={handleMouseDown}
                    onPointerUp={handleMouseUp}
                    // ref={nodeRef}
                    >
                    <div className="flex flex-col h-full font-shadows ">
                        {/* Header */}
                        <div className="flex justify-between items-center border-2 border-transparent rounded-t hover:border-white  text-cyan-950 ">
                            <div>
                                <Tooltip title="minimize">
                                    <IconButton
                                        size="small"
                                        onClick={() => minimize(id)}
                                        className="content-cancel">
                                        <MinimizeIcon
                                            sx={{
                                                height: "28px",
                                                width: "28px",
                                                color: "black",
                                            }}
                                        />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="delete">
                                    <IconButton
                                        size="small"
                                        onClick={() => onDelete(id)}
                                        className="p-1 content-cancel select-none">
                                        <img
                                            src={closeCross}
                                            alt="delete"
                                            className="h-7 select-none"
                                        />
                                    </IconButton>
                                </Tooltip>
                            </div>
                            <div className="text-base md:text-xl lg:text-2xl font-bold p-2 text-center truncate ">
                                {title}
                            </div>

                            <div>
                                <Tooltip title="edit">
                                    <IconButton
                                        onClick={() => onEdit(id)}
                                        className="p-1 content-cancel">
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

                        {!isMinimized && (
                            <div
                                className={`flex-1 overflow-y-auto p-2 border-2 border-transparent rounded-b`}>
                                <p className="text-lg md:text-xl lg:text-2xl font-medium leading-relaxed text-left whitespace-pre-wrap break-words">
                                    {description}
                                </p>
                            </div>
                        )}
                    </div>
                    {/* <div className="resize content-cancel absolute -bottom-3 -right-3 rotate-90 cursor-pointer">
                                    <OpenInFullIcon sx={{ color: "white" }} />
                                </div> */}
                </div>
            </ResizableBox>
        </Draggable>
    );
};

export default Note;
