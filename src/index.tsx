import { Hono } from 'hono'
import { renderer } from './renderer'

const app = new Hono()

app.use(renderer)

app.get('/', (c) => {
  return c.render(<h1>Hello!</h1>)
})

async function uuid() {
  const res = await fetch('https://httpbin.org/uuid')
  const { uuid } = await res.json()
  return uuid
}

app.get('/uuid', async (c) => {
  try {
    const value = await uuid()
    return c.render(value)
  } catch (e) {
    return c.render(JSON.stringify(e.message))
  }
})

app.get('/params/:id', (c) => {
  const id = c.req.param('id')
  const name = c.req.query('name')
  return c.json({ id, name })
})

export default app
