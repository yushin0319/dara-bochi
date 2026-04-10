// src/App.tsx
import { Alert, Box, Button, Snackbar, Stack, Typography } from '@mui/material';
import { Application, extend } from '@pixi/react';
import axios from 'axios';
import { Graphics } from 'pixi.js';
import { useEffect, useRef, useState } from 'react';
import { BouncyBall } from './components/BouncyBall';

extend({ Graphics });

export const App = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [localSeconds, setLocalSeconds] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null!);

  axios.defaults.baseURL = 'https://dara-bochi-api.onrender.com';
  axios.defaults.headers.post['Content-Type'] = 'application/json';

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | undefined;

    if (isRunning) {
      timer = setInterval(() => {
        setLocalSeconds((s) => s + 1);
      }, 1000);
    } else {
      if (localSeconds > 0) {
        const seconds = localSeconds;
        axios
          .post('/add_time', { seconds })
          .then(() => {
            setLocalSeconds(0);
          })
          .catch(() => {
            setError('時間の送信に失敗しました。再度お試しください。');
          });
      }
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning, localSeconds]);

  useEffect(() => {
    const fetchTotal = async () => {
      try {
        const res = await axios.get('/get_total');
        setTotalSeconds(res.data.total_seconds);
      } catch {
        setError('累計時間の取得に失敗しました。');
      }
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
    const zp = (n: number) => n.toString().padStart(2, '0');
    return `${zp(h)}:${zp(m)}:${zp(s)}`;
  };

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      </Snackbar>
      {/* 上部：グローバルタイマー */}
      <Box
        sx={{
          p: 2,
          textAlign: 'center',
          position: 'sticky',
          top: 0,
          backgroundColor: 'gray',
        }}
      >
        <Typography variant="caption" color="white">
          みんなで力を合わせて
        </Typography>
        <Typography variant="h3" color="white">
          {timeToHMS(totalSeconds)}
        </Typography>
        <Typography variant="caption" color="white">
          だらだらしました（不定期にリセットされます）
        </Typography>
      </Box>

      {/* 中央：Pixi canvasだけ */}
      <Box sx={{ flexGrow: 1 }} ref={containerRef}>
        <Application resizeTo={containerRef} backgroundColor={0xeeeeee}>
          <BouncyBall isRunning={isRunning} containerRef={containerRef} />
        </Application>
      </Box>

      {/* 下部：ローカルタイマーとボタン */}
      <Box
        sx={{
          p: 2,
          textAlign: 'center',
          position: 'sticky',
          bottom: 0,
          backgroundColor: 'gray',
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{ justifyContent: 'space-around', alignItems: 'center' }}
        >
          <Button
            size="large"
            variant="outlined"
            onClick={() => setIsRunning((r) => !r)}
            sx={{
              color: 'darkgray',
              fontWeight: 'bold',
              backgroundColor: 'white',
              outline: 'none',
              boxShadow: 'none',
              borderColor: 'white',
              '&:focus': { outline: 'none' },
            }}
          >
            {isRunning ? 'だらだら終了' : 'だらだらする'}
          </Button>
          <Box>
            <Typography variant="h4" color="white">
              {timeToHMS(localSeconds)}
            </Typography>
            <Typography variant="caption" color="white">
              だらだらしています
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default App;
