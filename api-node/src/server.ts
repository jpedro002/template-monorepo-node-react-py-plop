import { app } from './app'
import { env } from './env'

const start = async () => {
	try {
		await app.listen({ port: env.PORT, host: '0.0.0.0' })
		console.log(`Server listening on http://localhost:${env.PORT}`)
	} catch (err) {
		app.log.error(err)
		process.exit(1)
	}
}

start()
