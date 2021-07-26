import React, { useState, useEffect } from 'react'
import './Postmake.css'
import CloseIcon from '@material-ui/icons/Close'
import { Firebase, storage, db } from '../../lib/firebase.prod'
import { useAuthListener } from '../../hooks'
import IconButton from '@material-ui/core/IconButton'
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate'
import SendRoundedIcon from '@material-ui/icons/SendRounded'
import DeleteIcon from '@material-ui/icons/Delete'

function Postmake({ handleClose }) {
	const [img, setImg] = useState(null);
	const [text, setText] = useState("");
	const [disabled, setDisabled] = useState(true);

	const { user } = useAuthListener();
	const useriden = user.uid.toString();

	useEffect(() => {
		if (text.trim() || img) setDisabled(false);
		else setDisabled(true);
	}, [img, text]);

	function handle_change(e) {
		setText(e.target.value);
		e.target.style.height = "calc(100% - 5px)";
		e.target.style.height = e.target.scrollHeight + 'px';
	}

	async function sendPost() {
		setDisabled(true);
		handleClose();

		let imgURL = null;
		if (img) {
			const nameit = (img.name + Date.now().toString()).toString();
			const upTak = await storage.ref(`images/${nameit}`).put(img);
			imgURL = await upTak.ref.getDownloadURL();
		}

		db.collection('posts').add({
			timestamp: Firebase.firestore.FieldValue.serverTimestamp(),
			caption: text,
			imageUrl: imgURL,
			username: user.displayName,
			likes: '0',
			comments: '0',
			UID: useriden
		});

		setText("");
		setImg(null);
	}

	return (
		<div className="postmaker">
			<header>
				<span className="title">Create a Post</span>
				<CloseIcon onClick={handleClose} />
			</header>
			<div className="content">
				<textarea
					onChange={handle_change}
					value={text}
					placeholder="What's on you mind today...!?" />
				{
					img ?
						<div className="img"
							style={{
								backgroundImage: `url("${URL.createObjectURL(img)}")`
							}} >
							<IconButton
								className="btn"
								onClick={() => setImg("")} >
								<DeleteIcon />
							</IconButton>
						</div>
						: null
				}
			</div>
			<footer>
				<IconButton className="btn">
					<AddPhotoAlternateIcon />
					<input
						type="file"
						className="img-input"
						accept="image/png, image/jpg, image/jpeg, image/ico"
						onChange={(e) => {
							setImg(e.target.files[0]);
						}} />
				</IconButton>
				<IconButton className="btn" disabled={disabled} onClick={sendPost}>
					<SendRoundedIcon />
				</IconButton>
			</footer>
		</div>
	)
}

export default Postmake
