import { db } from '../lib/firebase.prod'
import _reduce from 'lodash/reduce'

const SUCCESS = 'Successful'

const deleteOldStories = async (storyIds) => {
	await _reduce(
		storyIds,
		async (_, id) => {
			await db.collection('stories').doc(id).delete()
		},
		[]
	)
	return SUCCESS
}

const isOld = (story) => {
	const { timestamp } = story.data()
	const current = new Date(Date.now())
	const storyTime = new Date(timestamp)
	const oldStory =
		(current.getTime() - storyTime.getTime()) / (1000 * 3600 * 24)
	return Math.floor(oldStory) > 0
}

export const fetchAllStories = (setter) => {
	// const collection = await db.collection('stories').get();
	let oldStories = []
	const listener = db
		.collection('stories')
		.orderBy('timestamp', 'desc')
		.onSnapshot((stories) =>
			setter(
				_reduce(
					stories.docs,
					(stories, story) => {
						if (!isOld(story))
							return [...stories, { id: story.id, tale: story.data() }]
						else {
							oldStories = [...oldStories, story.id]
							return [...stories]
						}
					},
					[]
				)
			)
		)
	deleteOldStories(oldStories).then(() => console.log('Old stories deleted'))
	return listener
}

export const createStory = async (story) => {
	const status = await db
		.collection('stories')
		.add(story)
		.catch((error) => error)
	return status || SUCCESS
}
