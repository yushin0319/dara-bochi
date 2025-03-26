// src/App.tsx
import { Box, Button, Stack, Typography } from "@mui/material";
import { Application, extend } from "@pixi/react";
import axios from "axios";
import { Graphics } from "pixi.js";
import { useEffect, useRef, useState } from "react";
import { BouncyBall } from "./components/BouncyBall";

extend({ Graphics });

export const App = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [localSeconds, setLocalSeconds] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null!);

  axios.defaults.baseURL = "https://dara-bochi-api.onrender.com";
  axios.defaults.headers.post["Content-Type"] = "application/json";

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | undefined = undefined;

    if (isRunning) {
      timer = setInterval(() => {
        setLocalSeconds((s) => s + 1);
      }, 1000);
    } else {
      if (localSeconds > 0) {
        axios.post("/add_time", { seconds: localSeconds });
        setLocalSeconds(0);
      }
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning]);

  useEffect(() => {
    const fetchTotal = async () => {
      const res = await axios.get("/get_total");
      setTotalSeconds(res.data.total_seconds);
    };
    fetchTotal();
    const interval = setInterval(fetchTotal, 3000);
    return () => clearInterval(interval);
  }, []);

  const timeToHMS = (time: number) => {
    const h = Math.floor(time / 3600);
    const m = Math.floor((time % 3600) / 60);
    const s = time % 60;
    // 0埋め
    const zp = (n: number) => n.toString().padStart(2, "0");
    return `${zp(h)}:${zp(m)}:${zp(s)}`;
  };

  return (
    <Box height="100vh" width="100vw" display="flex" flexDirection="column">
      {/* 上部：グローバルタイマー */}
      <Box
        p={2}
        textAlign="center"
        sx={{ position: "sticky", top: 0, backgroundColor: "gray" }}
      >
        <Typography variant="caption">みんなで力を合わせて</Typography>
        <Typography variant="h3">{timeToHMS(totalSeconds)}</Typography>
        <Typography variant="caption">
          だらだらしました（不定期にリセットされます）
        </Typography>
      </Box>

      {/* 中央：Pixi canvasだけ */}
      <Box flexGrow={1} ref={containerRef}>
        <Application resizeTo={containerRef} backgroundColor={0xeeeeee}>
          <BouncyBall isRunning={isRunning} containerRef={containerRef} />
        </Application>
      </Box>

      {/* 下部：ローカルタイマーとボタン */}
      <Box
        p={2}
        textAlign="center"
        sx={{ position: "sticky", bottom: 0, backgroundColor: "gray" }}
      >
        <Stack
          direction="row"
          justifyContent="space-around"
          alignItems="center"
          spacing={2}
        >
          <Button
            size="large"
            variant="outlined"
            onClick={() => setIsRunning((r) => !r)}
            sx={{
              color: "darkgray",
              backgroundColor: "white",
              outline: "none",
              boxShadow: "none",
              borderColor: "white",
              "&:focus": { outline: "none" },
            }}
          >
            {isRunning ? "だらだら終了" : "だらだらする"}
          </Button>
          <Box>
            <Typography variant="h4">{timeToHMS(localSeconds)}</Typography>
            <Typography variant="caption">だらだらしています</Typography>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default App;
