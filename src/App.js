import { Box, Button, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";
import "./App.css";
var QRCode = require("qrcode.react");

function App() {
  const [originalString, setOriginalString] = useState("");

  const handleGenerate = () => {
    console.log(originalString);
  };

  return (
    <div className="App">
      <Typography variant="h4"> QR-Code Generator </Typography>

      <Box
        sx={{
          my: 8,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gridGap: "40px",
        }}
      >
        <Box
          sx={{
            my: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "300px",
          }}
        >
          <TextField
            label="Type here: "
            id="message"
            name="message"
            margin="normal"
            value={originalString}
            onChange={(evt) => setOriginalString(evt.target.value)}
          />
        </Box>
        <Box>
          <QRCode
            value={originalString}
            size={250}
            bgColor="#FFCCBB"
            fgColor="#333"
            level="M"
            includeMargin={true}
          />
        </Box>
      </Box>
    </div>
  );
}

export default App;
