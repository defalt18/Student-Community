import { db } from '../lib/firebase.prod'
import _map from 'lodash/map'

const SUCCESS = 'Successful'

export const fetchAllPolls = async () => {
	const collection = await db.collection('polls').get()
	return _map(collection.docs, (poll) => ({ id: poll.id, data: poll.data() }))
}

export const requestPoll = async (poll) => {
	const status = await db
		.collection('polls')
		.add(poll)
		.catch((error) => error)
	return status || SUCCESS
}
