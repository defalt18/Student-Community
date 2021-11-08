import { db, storage } from 'lib/firebase.prod'
import _isEmpty from 'lodash/isEmpty'

export async function deleteImageFromStorage(url) {
	if (!_isEmpty(url)) await storage.refFromURL(url).delete()
}

export const deleteUserByAdmin = async (id, userdata) => {
	await deleteImageFromStorage(userdata.image)
	await deleteImageFromStorage(userdata.cover)
	await db.collection('users').doc(id).delete()
}

export const deleteDocumentByAdmin = async (id, docData, collection) => {
	await deleteImageFromStorage(docData.image)
	await db.collection(collection).doc(id).delete()
}

export const config = {
	admins: {
		NTVRxtMZnJhhicVDbmVebBWH4BL2: true
	}
}
