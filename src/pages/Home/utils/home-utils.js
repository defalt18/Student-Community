import { Posts, Stories, Suggestions } from '../fixtures/home-model'

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
export const fetchHomeSuggestions = async () => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(Suggestions)
		}, 1000)
	})
}
