import { db } from '../lib/firebase.prod'
import _map from 'lodash/map'
import _reduce from 'lodash/reduce'

const SUCCESS = 'Successful'

const convert = (date) => {
	if (date !== undefined) {
		let year = Number(date.substring(0, 4)),
			month = Number(date.substring(5, 7)),
			day = Number(date.substring(8))
		return new Date(year, month - 1, day)
	}
}

export const fetchAllEvents = async () => {
	const collection = await db.collection('events').orderBy('date', 'desc').get()
	return await _reduce(
		collection.docs,
		async (events, event) => {
			const participants = await fetchParticipantsForEventId(event.id)
			const eventList = await events
			return [
				...eventList,
				{ id: event.id, data: event.data(), participants: participants }
			]
		},
		[]
	)
}

export const fetchEventsForId = async (id) => {
	const collection = await db.collection('events').where('UID', '==', id).get()
	return _map(collection.docs, (event) => ({
		id: event.id,
		event: event.data()
	}))
}

export const createEvent = async (event) => {
	const status = await db
		.collection('events')
		.add(event)
		.catch((error) => error)
	return status || SUCCESS
}

export const fetchUpcomingEvent = (setter) => {
	const listener = db
		.collection('events')
		.orderBy('date', 'desc')
		.limit(1)
		.onSnapshot((events) =>
			setter(
				convert(events.docs[0].data().date) >
					new Date(
						new Date().getFullYear(),
						new Date().getMonth(),
						new Date().getDate()
					)
					? events.docs[0].data()
					: undefined
			)
		)
	return listener
}

export const fetchParticipantsForEventId = async (id) => {
	const participantCollection = await db
		.collection('events')
		.doc(id)
		.collection('participants')
		.get()
	return _map(participantCollection.docs, (participant) => participant.id)
}

export const updateEventDetails = async (id, data) => {
	await db.collection('events').doc(id).update(data)
}
