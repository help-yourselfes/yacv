import express from 'express';
import path from 'path';
import AdapterList from './adapters/list';


const app = express();
const PORT = 3000;

AdapterList.init();

const siteFetch = '/api/fetch/:siteId';
// Статика: хостим frontend
app.use(express.static(path.join(__dirname, '../public')));

// API-прокси~
app.get(`${siteFetch}/boards`, async (req, res) => {
  const { siteId } = req.params;
  const adapter = AdapterList.get(siteId)
  if (!adapter) res.status(400).json({ error: 'Unknown site' });
  try {
    const adapRes = await adapter.fetchBoards();
    res.json({ boards: adapRes })
  } catch (error) {
    res.status(0).json({ error })
  }
});

app.get(`${siteFetch}/view/:boardId`, async (req, res) => {
  const { siteId, boardId } = req.params;
  const adapter = AdapterList.get(siteId);
  if (!adapter) res.status(400).json({ error: 'Unknown site' });
  try {
    const adapRes = await adapter.fetchThreads(boardId);
    console.log(adapRes);
    res.json({ threads: adapRes });
  } catch (error) {
    res.status(0).json({ error })
  }
})

app.get(`${siteFetch}/view/:boardId/:threadId`, async (req, res) => {
  const { boardId, siteId, threadId:threadStr } = req.params;
  const threadId = Number(threadStr);
  const adapter = AdapterList.get(siteId);
  if (!adapter) res.status(400).json({ error: 'Unknown site' });
  try {
    const adapRes = await adapter.fetchReplies(boardId, threadId);
    adapRes.replies.forEach(element => {
      console.log(element)
    });
    res.json({boardId, threadId, replies: adapRes.replies})
  } catch (error) {
        res.status(0).json({ error })
  }
})

app.get('/api/sites', (req, res) => {
  const sites = AdapterList.getList()
  res.json({sites});
})

// SPA fallback
app.get('/*path', (_req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
