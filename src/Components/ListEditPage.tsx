import { useState } from "react";
import {
  Button,
  TextField,
  List,
  ListItem,
  IconButton,
  Container,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

const ListEditPage = () => {
  const [items, setItems] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");

  const handleAddItem = () => {
    if (inputValue.trim() !== "") {
      setItems([...items, inputValue]);
      setInputValue("");
    }
  };

  const handleDeleteItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleEditItem = (index: number) => {
    setEditingIndex(index);
    setEditValue(items[index]);
  };

  const handleSaveEdit = (index: number) => {
    const updatedItems = items.map((item, i) =>
      i === index ? editValue : item
    );
    setItems(updatedItems);
    setEditingIndex(null);
    setEditValue("");
  };

  const handleShare = () => {
    const url = `/roulette?items=${items.join(",")}`;
    navigator.clipboard.writeText(window.location.origin + url);
    alert("URL copied to clipboard!");
  };

  return (
    <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: "100vh", width: "100vw" }}>
      <Box sx={{ m: 4 }}>
        <TextField
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add an item"
          onKeyDown={(e) => e.key === "Enter" && handleAddItem()}
        />
        <Button onClick={handleAddItem} variant="contained" sx={{ m: 0.4 }}>
          Add
        </Button>
        <Button onClick={handleShare} variant="contained" sx={{ m: 0.4 }}>
          Share
        </Button>
        <List>
          {items.map((item, index) => (
            <ListItem
              key={index}
              style={{ display: "flex", alignItems: "center" }}>
              {editingIndex === index ? (
                <>
                  <TextField
                    fullWidth
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && handleSaveEdit(index)
                    }
                  />
                  <IconButton onClick={() => handleSaveEdit(index)}>
                    <SaveIcon />
                  </IconButton>
                </>
              ) : (
                <>
                  <span style={{ flexGrow: 1 }}>{item}</span>
                  <IconButton onClick={() => handleEditItem(index)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteItem(index)}>
                    <DeleteIcon />
                  </IconButton>
                </>
              )}
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default ListEditPage;
