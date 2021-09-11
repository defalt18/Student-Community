import { useState, useEffect, useContext } from 'react'
// import { FirebaseContext } from '../context/firebase';
import { useAuth } from 'reactfire'

export default function useAuthListener() {
	const auth = useAuth()
	const [user, setUser] = useState(JSON.parse(localStorage.getItem('authUser')))

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((authUser) => {
			if (authUser) {
				localStorage.setItem('authUser', JSON.stringify(authUser))
				setUser(authUser)
			} else {
				localStorage.removeItem('authUser')
				setUser(null)
			}
		})

		return () => unsubscribe()
	}, [auth])

	return { user }
}
