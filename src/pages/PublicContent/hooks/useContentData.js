import { db } from 'lib/firebase.prod'

export const getContent = async (contentInfo) => {
	const { type, id } = contentInfo
	const document = await db.collection(type).doc(id).get()
	return document.data()
}
