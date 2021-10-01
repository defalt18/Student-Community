import Firebase from 'firebase'

const config = {
	prod: {
		apiKey: 'AIzaSyAeKmUtiMCR6KzR4eAO1RqnQLFB54qr6gQ',
		authDomain: 'da-student-connect.firebaseapp.com',
		projectId: 'da-student-connect',
		storageBucket: 'da-student-connect.appspot.com',
		messagingSenderId: '126272022481',
		appId: '1:126272022481:web:61f8e66c785373847ee2f0',
		measurementId: 'G-3T047Q9MFW'
	},
	dev: {
		apiKey: 'AIzaSyCV76k7olTdBMtL91UvJLLVCtBNq5nieY0',
		authDomain: 'test-project-406cd.firebaseapp.com',
		projectId: 'test-project-406cd',
		storageBucket: 'test-project-406cd.appspot.com',
		messagingSenderId: '295016186234',
		appId: '1:295016186234:web:b487a33f9e276d4dbd56c3',
		measurementId: 'G-1F1FRWWCB9'
	}
}

const firebase = Firebase.initializeApp(config.dev)

const db = Firebase.firestore()
const auth = Firebase.auth()
const storage = Firebase.storage()

export { Firebase, firebase, db, auth, storage, config }
