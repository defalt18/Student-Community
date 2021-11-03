import { db, storage } from '../lib/firebase.prod'
import _map from 'lodash/map'
import _forEach from 'lodash/forEach'
import _reduce from 'lodash/reduce'

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

export const uploadImageInDirectory = async (directory, id, picture) => {
	if (!picture) return undefined
	const nameOfPicture = picture.name + '_' + id
	await storage.ref(`${directory}/${nameOfPicture}`).put(picture)
	return await storage.ref(directory).child(nameOfPicture).getDownloadURL()
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

export const updateUserDetails = async (userdata, userId) => {
	await db.collection('users').doc(userId).update(userdata)
}

export const clearNotificationById = async (userId, id) => {
	if (id === '*') {
		const collection = db
			.collection('users')
			.doc(userId)
			.collection('notifications')
		const data = await collection.get()
		await _forEach(
			data.docs,
			async (doc) => await collection.doc(doc.id).delete()
		)
	} else
		await db
			.collection('users')
			.doc(userId)
			.collection('notifications')
			.doc(id)
			.delete()
}

export const fetchNotifications = async (userId) => {
	const data = await db
		.collection('users')
		.doc(userId)
		.collection('notifications')
		.get()
	return _reduce(
		data.docs,
		(allDoc, doc) => [...allDoc, { NO_ID_FIELD: doc.id, ...doc.data() }],
		[]
	)
}

export const notifyUser = async (id, data) => {
	await db.collection('users').doc(id).collection('notifications').add(data)
}
