import { Posts, Stories } from '../fixtures/feed-data'

export const fetchHomePosts = async () => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(Posts)
		}, 1000)
	})
}
export const fetchHomeStories = async () => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(Stories)
		}, 1000)
	})
}
