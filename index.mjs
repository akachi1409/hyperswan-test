import Hyperswarm from 'hyperswarm'
// import goodbye from 'graceful-goodbye'
import crypto from 'hypercore-crypto'
import b4a from 'b4a'

const swarm = new Hyperswarm()

const conns = []
swarm.on('connection', (conn) => {
  console.log('socket', conn);
})

// Join a common topic
const topic = process.argv[2] ? b4a.from(process.argv[2], 'hex') : crypto.randomBytes(32)
const discovery = swarm.join(topic, { client: true, server: true })

// The flushed promise will resolve when the topic has been fully announced to the DHT
discovery.flushed().then(() => {
  console.log('joined topic:', b4a.toString(topic, 'hex'))
})
