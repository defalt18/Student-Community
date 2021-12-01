import _isEmpty from 'lodash/isEmpty'

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
			alert(error.message)
			status = error.message
		})

	return { user: userToken?.user, error: status }
}

export async function createUserWithCredentials(
	displayName,
	auth,
	db,
	credentials
) {
	const userToken = await auth.createUserWithEmailAndPassword(
		credentials.email,
		credentials.password
	)
	await userToken.user.sendEmailVerification()
	await userToken.user.updateProfile({ displayName })
	await db.collection('users').doc(userToken.user.uid).set(credentials)
}
