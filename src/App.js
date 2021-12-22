import { useState } from "react";
import {
  Box,
  FormControlLabel,
  FormGroup,
  InputLabel,
  Slider,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import reactCSS from "reactcss";
import { SketchPicker } from "react-color";

import "./App.css";
var QRCode = require("qrcode.react");

function App() {
  const PICT_DEFAULT_SIZE = 300;
  const PICT_MIN_SIZE = 150;
  const PICT_MAX_SIZE = 400;
  const [originalString, setOriginalString] = useState("");
  const [foregroundColor, setForegroundColor] = useState({
    rgb: {
      r: 10,
      g: 150,
      b: 87,
      a: 1,
    },
  });
  const [displayFgColorPicker, setDisplayFgColorPicker] = useState(false);
  const [backgroundColor, setBackroundColor] = useState({
    rgb: {
      r: 255,
      g: 255,
      b: 255,
      a: 1,
    },
  });
  const [displayBgColorPicker, setDisplayBgColorPicker] = useState(false);
  const [pictureSize, setPictureSize] = useState(PICT_DEFAULT_SIZE);
  const [margin, setMargin] = useState(true);

  const handleOpenFg = () => {
    setDisplayFgColorPicker(true);
  };

  const handleCloseFg = () => {
    setDisplayFgColorPicker(false);
  };

  const handleFgChange = (color) => {
    setForegroundColor(color);
  };

  const handleOpenBg = () => {
    setDisplayBgColorPicker(true);
  };

  const handleCloseBg = () => {
    setDisplayBgColorPicker(false);
  };

  const handleBgChange = (color) => {
    setBackroundColor(color);
  };

  const handlePictureSizeChange = (event, newSize) => {
    setPictureSize(newSize);
  };

  const handleMarginChange = (event) => {
    setMargin(event.target.checked);
  };

  const styles = reactCSS({
    default: {
      fgColor: {
        width: "36px",
        height: "14px",
        borderRadius: "2px",
        background: `rgba(${foregroundColor.rgb.r}, ${foregroundColor.rgb.g}, ${foregroundColor.rgb.b}, ${foregroundColor.rgb.a})`,
      },
      bgColor: {
        width: "36px",
        height: "14px",
        borderRadius: "2px",
        background: `rgba(${backgroundColor.rgb.r}, ${backgroundColor.rgb.g}, ${backgroundColor.rgb.b}, ${backgroundColor.rgb.a})`,
      },
      swatch: {
        padding: "5px",
        background: "#fff",
        borderRadius: "1px",
        boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
        display: "inline-block",
        cursor: "pointer",
      },
      popover: {
        position: "absolute",
        zIndex: "2",
      },
      cover: {
        position: "fixed",
        top: "0px",
        right: "0px",
        bottom: "0px",
        left: "0px",
      },
    },
  });

  return (
    <div className="App">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gridGap: "40px",
          height: "500px",
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid black",
              borderRadius: "20px",
              p: 2,
              mt: 4,
              backgroundColor: "white",
              boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.5)",
              fontFamily: "'Monofett', cursive; font-size: 4rem",
              color: "green",
            }}
          >
            R-QR Code Generator
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid black",
            borderRadius: "20px",
            padding: "25px",
            backgroundColor: "white",
            boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.5)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "300px",
              p: 3,
            }}
          >
            <TextField
              fullWidth
              label="Type here! "
              id="message"
              name="message"
              margin="normal"
              value={originalString}
              onChange={(evt) => setOriginalString(evt.target.value)}
              color="success"
            />

            <Slider
              defaultValue={PICT_DEFAULT_SIZE}
              min={PICT_MIN_SIZE}
              max={PICT_MAX_SIZE}
              value={typeof pictureSize === "number" ? pictureSize : 0}
              onChange={handlePictureSizeChange}
              aria-labelledby="input-slider"
              color="success"
            />

            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    label="uhu"
                    checked={margin}
                    onChange={handleMarginChange}
                    color="success"
                  />
                }
                label="Margin"
              />
            </FormGroup>
            <div>
              <InputLabel>Foreground</InputLabel>
              <div style={styles.swatch} onClick={handleOpenFg}>
                <div style={styles.fgColor} />
              </div>

              {displayFgColorPicker ? (
                <div style={styles.popover}>
                  <div style={styles.cover} onClick={handleCloseFg} />
                  <SketchPicker
                    color={foregroundColor}
                    onChange={handleFgChange}
                  />
                </div>
              ) : null}
            </div>

            <div>
              <InputLabel>Background</InputLabel>

              <div style={styles.swatch} onClick={handleOpenBg}>
                <div style={styles.bgColor} />
              </div>
              {displayBgColorPicker ? (
                <div style={styles.popover}>
                  <div style={styles.cover} onClick={handleCloseBg} />
                  <SketchPicker
                    color={backgroundColor}
                    onChange={handleBgChange}
                  />
                </div>
              ) : null}
            </div>
          </Box>
          <Box>
            <QRCode
              value={originalString}
              size={pictureSize}
              bgColor={`rgba(${backgroundColor.rgb.r}, ${backgroundColor.rgb.g}, ${backgroundColor.rgb.b}, ${backgroundColor.rgb.a})`}
              fgColor={`rgba(${foregroundColor.rgb.r}, ${foregroundColor.rgb.g}, ${foregroundColor.rgb.b}, ${foregroundColor.rgb.a})`}
              level="M"
              includeMargin={margin}
            />
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default App;
