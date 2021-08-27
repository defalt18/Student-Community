import React, { useState, useEffect, useRef } from 'react'
import './Postmake.css'
import CloseIcon from '@material-ui/icons/Close'
import { Firebase, storage, db } from '../../lib/firebase.prod'
import { useAuthListener } from '../../hooks'
import IconButton from '@material-ui/core/IconButton'
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate'
import SendRoundedIcon from '@material-ui/icons/SendRounded'
import DeleteIcon from '@material-ui/icons/Delete'
import { toast } from 'react-toastify'

function Postmake({ handleClose }) {
	const [img, setImg] = useState(null);
	const [text, setText] = useState("");
	const [disabled, setDisabled] = useState(true);

	const { user } = useAuthListener();
	const useriden = user.uid.toString();

	const toastID = useRef(null);

	useEffect(() => {
		if (text.trim() || img) setDisabled(false);
		else setDisabled(true);
	}, [img, text]);

	function handle_change(e) {
		setText(e.target.value);
		e.target.style.height = "calc(100% - 5px)";
		e.target.style.height = e.target.scrollHeight + 'px';
	}

	// upload the image and return the download url
	async function uploadTaskPromise(postImg) {
		return new Promise((resolve, reject) => {
			const nameit = (postImg.name + Date.now().toString()).toString();
			const upload_task = storage.ref(`images/${nameit}`).put(postImg);

			upload_task.on('state_changed',
				(snapshot) => {
					const progress = snapshot.bytesTransferred / snapshot.totalBytes - 0.0000000001;
					toast.update(toastID.current, {
						progress: progress,
					});
				},
				function error(err) {
					console.log(err);
					reject(new Error("Image not Uploaded"));
				},
				function complete() {
					upload_task.snapshot.ref.getDownloadURL().then((url) => {
						resolve(url);
					});
				});
		})
	}

	async function sendPost() {
		// disable send button
		setDisabled(true);
		handleClose();

		// copy text and image in local var, so user can make new post before previous post uploaded
		const [postText, postImg] = [text, img];
		setText("");
		setImg(null);

		// set the toast
		toastID.current = toast("Uploading...", {
			position: "top-right",
			autoClose: false,
			hideProgressBar: false,
			closeOnClick: false,
			pauseOnHover: false,
			draggable: false,
			progress: undefined
		});

		const imgURL = postImg ? (await uploadTaskPromise(postImg)) : null;
		console.log(imgURL);

		await db.collection('posts').add({
			timestamp: Firebase.firestore.FieldValue.serverTimestamp(),
			caption: text,
			imageUrl: (typeof imgURL != Error) ? imgURL : null,
			username: user.displayName,
			likes: '0',
			comments: '0',
			UID: useriden
		});

		// acknowledgement
		toast.update(toastID.current, {
			render: "Uploaded",
			type: "success",
			autoClose: 2000,
			hideProgressBar: true,
			progress: undefined
		});

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
