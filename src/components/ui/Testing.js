import { TextEffect } from "../animations/TextEffect";

const Testing = () => {

    return (
        <div className="bg-[#121212] text-gray-300 h-full w-full flex justify-center items-center text-7xl">
            <TextEffect per="char" preset="fade">
                Welcome To Sticky Notes
            </TextEffect>
        </div>
    )
};

export default Testing;