import { useState } from "react";
import { Box, InputLabel, Slider, TextField, Typography } from "@mui/material";
import reactCSS from "reactcss";
import { SketchPicker } from "react-color";

import "./App.css";
var QRCode = require("qrcode.react");

function App() {
  const PICT_DEFAULT_SIZE = 200;
  const PICT_MIN_SIZE = 150;
  const PICT_MAX_SIZE = 400;
  const [originalString, setOriginalString] = useState("");
  const [foregroundColor, setForegroundColor] = useState({
    rgb: {
      r: 0,
      g: 0,
      b: 0,
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
      <Typography
        variant="h4"
        sx={{
          my: 8,
        }}
      >
        {" "}
        QR-Code Generator{" "}
      </Typography>

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
            label="Text goes here "
            id="message"
            name="message"
            margin="normal"
            value={originalString}
            onChange={(evt) => setOriginalString(evt.target.value)}
          />

          <Slider
            defaultValue={PICT_DEFAULT_SIZE}
            min={PICT_MIN_SIZE}
            max={PICT_MAX_SIZE}
            value={typeof pictureSize === "number" ? pictureSize : 0}
            onChange={handlePictureSizeChange}
            aria-labelledby="input-slider"
          />

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
            includeMargin={true}
          />
        </Box>
      </Box>
    </div>
  );
}

export default App;
