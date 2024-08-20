import React from "react";
import { ResizableBox } from "react-resizable";
import Draggable from "react-draggable";
import "react-resizable/css/styles.css"; // Ensure this import for default styles

const ResizableDraggableBox = () => {
    return (
        <Draggable handle=".handle">
            <div>
                <ResizableBox
                    width={200}
                    height={200}
                    minConstraints={[100, 100]}
                    maxConstraints={[300, 300]}
                    className="resizable-box"
                >
                    <div className="handle bg-gray-500 cursor-move">
                        Drag me
                    </div>
                    <div className="content bg-red-500 h-full w-full flex items-center justify-center">
                        Contents
                    </div>
                </ResizableBox>
            </div>
        </Draggable>
    );
};

const Testing = () => {
    return (
        <div className="w-full h-full testing">
            <Draggable handle=".handle">
            <div>
                <ResizableBox
                    width={200}
                    height={200}
                    minConstraints={[100, 100]}
                    maxConstraints={[300, 300]}
                    className="resizable-box"
                >
                    <div className="handle bg-gray-500 cursor-move">
                        Drag me
                    </div>
                    <div className="content bg-red-500 h-full w-full flex items-center justify-center">
                        Contents
                    </div>
                </ResizableBox>
            </div>
        </Draggable>
            <div className="mt-4">
                lorem ipsum dolor sit amet, consect adipiscing elit. Donec id
                nunc at dolor eleifend pulvinar. Cras vel eros faucibus, dictum
                urna nec, ultricies neque. Sed auctor felis id neque
            </div>
        </div>
    );
};

export default Testing;
