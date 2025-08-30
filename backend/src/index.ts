import express from 'express';
import path from 'path';
import fs from 'fs';
import AdapterList from './adapters/list';

const app = express();
const PORT = 3000;

AdapterList.init();

const siteFetch = '/api/fetch/:siteId';
app.use(express.static(path.join(__dirname, '../public')));

const getCacheFilePath = (siteId: string, boardName?: string, threadId?: number) => {
  const baseDir = path.join(__dirname, '../../cache/responses', siteId);
  if (boardName && threadId !== undefined) {
    return path.join(baseDir, boardName, threadId.toString(), 'data.json');
  } else if (boardName) {
    return path.join(baseDir, boardName, 'data.json');
  }
  return path.join(baseDir, 'data.json');
};

app.get(`${siteFetch}/boards`, async (req, res) => {
  const { siteId } = req.params;
  const adapter = AdapterList.get(siteId);
  if (!adapter) return res.status(400).json({ error: 'Unknown site' });

  const cacheFilePath = getCacheFilePath(siteId, 'boards');

  if (fs.existsSync(cacheFilePath)) {
    const cachedData = fs.readFileSync(cacheFilePath, 'utf-8');
    return res.json({ boards: JSON.parse(cachedData) });
  }

  try {
    const adapRes = await adapter.fetchBoards();
    fs.mkdirSync(path.dirname(cacheFilePath), { recursive: true });
    fs.writeFileSync(cacheFilePath, JSON.stringify(adapRes, null, 2));
    res.json({ boards: adapRes });
  } catch (error) {
if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }  }
});

app.get(`${siteFetch}/view/:boardId`, async (req, res) => {
  const { siteId, boardId } = req.params;
  const adapter = AdapterList.get(siteId);
  if (!adapter) return res.status(400).json({ error: 'Unknown site' });

  const cacheFilePath = getCacheFilePath(siteId, `view/${boardId}`);

  if (fs.existsSync(cacheFilePath)) {
    const cachedData = fs.readFileSync(cacheFilePath, 'utf-8');
    return res.json({ threads: JSON.parse(cachedData) });
  }

  try {
    const adapRes = await adapter.fetchThreads(boardId);
    fs.mkdirSync(path.dirname(cacheFilePath), { recursive: true });
    fs.writeFileSync(cacheFilePath, JSON.stringify(adapRes, null, 2));
    res.json({ threads: adapRes });
  } catch (error) {
if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }  }
});

app.get(`${siteFetch}/view/:boardId/:threadId`, async (req, res) => {
  const { boardId, siteId, threadId: threadStr } = req.params;
  const threadId = Number(threadStr);
  const adapter = AdapterList.get(siteId);
  if (!adapter) return res.status(400).json({ error: 'Unknown site' });

  const cacheFilePath = getCacheFilePath(siteId, `view/${boardId}/${threadId}`);

  if (fs.existsSync(cacheFilePath)) {
    const cachedData = fs.readFileSync(cacheFilePath, 'utf-8');
    return res.json({ boardId, threadId, replies: JSON.parse(cachedData).replies });
  }

  try {
    const adapRes = await adapter.fetchReplies(boardId, threadId);
    fs.mkdirSync(path.dirname(cacheFilePath), { recursive: true });
    fs.writeFileSync(cacheFilePath, JSON.stringify(adapRes, null, 2));
    res.json({ boardId, threadId, replies: adapRes.replies });
  } catch (error) {
if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }  }
});

app.get('/api/sites', (req, res) => {
  const sites = AdapterList.getList();
  res.json({ sites });
});

app.use('/images', express.static(path.join(__dirname, '../../shared/images')));

// SPA fallback
app.get('/*path', (_req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
