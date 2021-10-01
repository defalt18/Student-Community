import _isEmpty from 'lodash/isEmpty'
import { useFirestore } from 'reactfire'

const checkValidEmail = (email) => {
	const regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
	return regexEmail.test(email)
}

export async function signInWithCredentials(auth, credentials) {
	let status = 'SUCCESS'
	const validEmail = checkValidEmail(credentials.email)
	if (!validEmail || _isEmpty(credentials.password)) {
		return {
			error: 'Invalid email format or password'
		}
	}
	const userToken = await auth
		.signInWithEmailAndPassword(credentials.email, credentials.password)
		.catch((error) => {
			status = error.message
		})

	return { user: userToken.user, error: status }
}

export async function createUserWithCredentials(auth, db, credentials) {
	const userToken = await auth.createUserWithEmailAndPassword(
		credentials.email,
		credentials.password
	)
	await userToken.user.sendEmailVerification()
	await db.collection('users').doc(userToken.user.uid).set(credentials)
}
