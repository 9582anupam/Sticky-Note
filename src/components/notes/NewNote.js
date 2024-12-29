import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { styled } from "@mui/system";
import { v4 as uuidv4 } from "uuid";

const colors = [
    { name: "Pink", hex: "#fa9fba" },
    { name: "Green", hex: "#8AC256" },
    { name: "Blue", hex: "#97d2fb" },
    { name: "Orange", hex: "#fd9873" },
    { name: "Purple", hex: "#B89CC8" },
];

const ColorCircle = styled("div")(
    ({ theme, color, isDarkMode, isSelected }) => ({
        width: 24,
        height: 24,
        borderRadius: "50%",
        backgroundColor: color,
        cursor: "pointer",
        margin: theme.spacing(0.5),
        border: `2px solid ${isSelected ? "white" : color}`,
        transition: "transform 0.1s, border 0.3s",
        transform: isSelected ? "scale(1.2)" : "scale(1)",
        "&:hover": {
            border: `2px solid ${isDarkMode ? "white" : "black"}`,
            transform: "scale(1.2)",
        },
    })
);

const NewNote = ({
    onCreate,
    initialTitle = "",
    initialContent = "",
    initialColor = "",
    initialId = "",
    notesLength,
}) => {
    const defaultColor = colors[0].hex; // Default color
    const [selectedColor, setSelectedColor] = useState(
        initialColor || defaultColor
    );
    const [title, setTitle] = useState(initialTitle);
    const [content, setContent] = useState(initialContent);

    const theme = useTheme();
    const isDarkMode = theme.palette.mode === "dark";

    // if initial id exist it suggest that we are updating the note rather than creating a new one
    // so if ware updating a note then we have to keep the zIndex same
    // for updating note zIndex will be the notesLength+1
    const zIndex = initialId ? notesLength : notesLength + 1;

    useEffect(() => {
        setSelectedColor(initialColor || defaultColor);
    }, [initialColor, defaultColor]);

    const handleColorSelect = (color) => {
        setSelectedColor(color);
    };

    const handleCreateNote = () => {
        if (!title || !content) return;

        onCreate({
            id: initialId || uuidv4(), // Use existing ID if editing, else generate new UUID
            title,
            content,
            color: selectedColor || defaultColor, // Default color if none is selected
            zIndex,
        });

        setTitle("");
        setContent("");
        setSelectedColor(defaultColor); // Reset to default color after creation
    };

    return (
        <Box
            sx={{
                width: 300,
                p: 2,
                border: `1px solid ${isDarkMode ? "#333" : "#ccc"}`,
                borderRadius: 1,
                bgcolor: isDarkMode ? "#333" : "white",
                borderTopRightRadius: "15px",
                color: isDarkMode ? "white" : "black",
            }}>
            <Typography variant="h6" gutterBottom>
                {initialTitle ? "Edit Note" : "New Note"}
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                }}
                size="small">
                {colors.map((color) => (
                    <ColorCircle
                        key={color.hex}
                        color={color.hex}
                        onClick={() => handleColorSelect(color.hex)}
                        isDarkMode={isDarkMode}
                        isSelected={selectedColor === color.hex}
                    />
                ))}
            </Box>
            <TextField
                fullWidth
                label="Title"
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                sx={{
                    mb: 2,
                    bgcolor: isDarkMode ? "#444" : "white",
                    color: isDarkMode ? "white" : "black",
                }}
            />
            <TextField
                fullWidth
                label="Content"
                multiline
                rows={4}
                variant="outlined"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                sx={{
                    mb: 2,
                    bgcolor: isDarkMode ? "#444" : "white",
                    color: isDarkMode ? "white" : "black",
                }}
            />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Button variant="outlined" onClick={() => onCreate(null)}>
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleCreateNote}>
                    {initialTitle ? "Update" : "Create"}
                </Button>
            </Box>
        </Box>
    );
};

export default NewNote;
