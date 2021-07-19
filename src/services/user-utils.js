import { db, storage } from '../lib/firebase.prod'
import _map from 'lodash/map'

const SUCCESS = 'Successful'

export const getUserDetailsById = async (id) => {
	const AboutCollection = await db
		.collection('users')
		.doc(id)
		.collection('About')
		.get()
	const minimalUser = await db.collection('users').doc(id).get()
	const friends = await db
		.collection('users')
		.doc(id)
		.collection('friends')
		.get()
	return {
		...AboutCollection.docs[0].data(),
		...minimalUser.data(),
		followers: _map(friends.docs, (friend) => friend.id)
	}
}

export const getMinimalUserById = async (id) => {
	const user = await db.collection('users').doc(id).get()
	return user.data()
}

export const getUserPhotosById = async (id) => {
	const photoCollection = await db
		.collection('users')
		.doc(id)
		.collection('photos')
		.get()
	return _map(photoCollection.docs, (photo) => photo.data())
}

export const updateCoverForUserId = async (user, picture) => {
	const imageURL = await uploadImage(picture)
	return await updateMinimalUser({ ...user, image: imageURL })
}

export const updateProfilePicForUserId = async (user, picture) => {
	const imageURL = await uploadImage(picture)
	return await updateMinimalUser({ ...user, cover: imageURL })
}

export const updateMinimalUser = async (updatedUser) => {
	const status = await db
		.collection('users')
		.doc(updatedUser.uid)
		.update(updatedUser)
		.catch((error) => error)
	return status || SUCCESS
}

export const updateUserAbout = async (updatedUser) => {
	const collection = await db
		.collection('users')
		.doc(updatedUser.uid)
		.collection('About')
		.get()

	const status = await db
		.collection('users')
		.doc(updatedUser.uid)
		.collection('About')
		.doc(collection.docs[0].id)
		.update(updatedUser)
		.catch((error) => error)

	return status || SUCCESS
}

export const uploadImage = async (picture) => {
	const nameOfPicture = (picture.name + Date.now()).toString()
	await storage.ref(`images/${nameOfPicture}`).put(picture)
	return await storage.ref('images').child(nameOfPicture).getDownloadURL()
}

export const uploadPhotoForUserId = async (id, pictureURL) => {
	const status = await db
		.collection('users')
		.doc(id)
		.collection('photos')
		.add({ image: pictureURL })
	return status || SUCCESS
}
