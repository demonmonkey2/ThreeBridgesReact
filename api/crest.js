export default async function handler(req, res) {
  const response = await fetch(
    'https://threebridgesfc.co.uk/wp-content/uploads/2023/10/Bridges-Hi-Res-No-Background.png'
  )
  const buffer = await response.arrayBuffer()
  res.setHeader('Content-Type', 'image/png')
  res.setHeader('Cache-Control', 'public, max-age=86400')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.send(Buffer.from(buffer))
}
