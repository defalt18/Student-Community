import React from 'react'
// import useState from 'react'
import './Chats.css'
import Friendusers from './Friendusers'
import { Avatar } from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import SendRoundedIcon from '@material-ui/icons/SendRounded'
import SearchIcon from '@material-ui/icons/Search'
import Texts from './Texts'
import Sentext from './Sentext'

function Chats() {
	function hideandseek() {
		var x = document.getElementById('search')
		if (x.style.display === 'none') {
			x.style.display = 'flex'
		} else {
			x.style.display = 'none'
		}
	}

	return (
		<div className='chathome'>
			<div className='chats'>
				<div className='chat__left'>
					<div className='chat__top' style={{ position: 'sticky', top: 0 }}>
						<div
							style={{
								display: 'flex',
								width: '100%',
								alignItems: 'center',
								justifyContent: 'space-between'
							}}
						>
							<h1 style={{ margin: '0', padding: '0 10px' }}>Chats</h1>
							<SearchIcon
								onClick={hideandseek}
								style={{ padding: '0 10px', fontSize: '35px' }}
							/>
						</div>
						<div
							id='search'
							style={{ display: 'none', width: '96%', marginTop: '5px' }}
						>
							<input
								type='text'
								placeholder='Search Chats'
								style={{ margin: '0', width: '100%', padding: '5px' }}
							/>
						</div>
					</div>
					<div
						className='chat__rest'
						style={{
							background: 'transparent',
							overflow: 'auto'
							// height:'100%',
						}}
					>
						<Friendusers
							name='Stefan'
							msg='Trying not to rip out the throats'
							pic='https://assets.puzzlefactory.pl/puzzle/238/575/original.jpg'
						/>
						<Friendusers
							name='Alaric'
							msg='Hello there you!'
							pic='https://tvguide1.cbsistatic.com/i/r/2013/02/17/a8e7820e-db0f-47b9-9b4f-77c6bcf7ce21/thumbnail/900x600/e3be5d8aa9ebee418d50a91d6f0e50e2/130219MattDavis1.jpg'
						/>
						<Friendusers
							name='Damon'
							msg='How shockingly useful!'
							pic='https://i.pinimg.com/originals/99/4e/aa/994eaa22c9b4c3531d03808c9cfe4379.png'
						/>
						<Friendusers
							name='Elena'
							msg='U got to join me at the Whitmore House'
							pic='https://decider.com/wp-content/uploads/2019/09/elena-gilbert-.jpg?quality=80&strip=all&w=646&h=431&crop=1'
						/>
						<Friendusers
							name='Caroline'
							msg='Party Caps, Bottles and lot of things udk'
							pic='https://cdn.images.express.co.uk/img/dynamic/20/590x/secondary/1829740.jpg?r=1555482526587'
						/>
					</div>
				</div>
				<div className='chat__right'>
					<div className='userspace'>
						<Avatar src='https://assets.puzzlefactory.pl/puzzle/238/575/original.jpg' />
						{/* <h3>{name?name:'Stefan'}</h3> */}
						<h3>Stefan</h3>
						<MoreVertIcon className='lastem' fontSize='large' />
					</div>
					<div className='msgdesp'>
						<Texts
							msgs='The vervain is affecting me'
							img='https://assets.puzzlefactory.pl/puzzle/238/575/original.jpg'
						/>
						<Texts
							msgs='I need you to get Elena away from Mystic falls'
							img='https://assets.puzzlefactory.pl/puzzle/238/575/original.jpg'
						/>
						<Texts
							msgs='I am done'
							img='https://assets.puzzlefactory.pl/puzzle/238/575/original.jpg'
						/>
						<Texts
							msgs='Trying not to rip out the throats'
							img='https://assets.puzzlefactory.pl/puzzle/238/575/original.jpg'
						/>
						<Sentext
							msgs='Ok coming in a moment'
							img='https://i.pinimg.com/originals/54/2f/8f/542f8fc868a0f1822f30740b57a729f9.jpg'
						/>
						<Texts
							msgs='Cmon where are you mate!?'
							img='https://assets.puzzlefactory.pl/puzzle/238/575/original.jpg'
						/>
						<Sentext
							msgs='Sorry brother you gotta handle it yourself'
							img='https://i.pinimg.com/originals/54/2f/8f/542f8fc868a0f1822f30740b57a729f9.jpg'
						/>
					</div>
					<div className='writer'>
						<input type='text' placeholder='Message...' />
						<SendRoundedIcon fontSize='large' style={{ color: 'gray' }} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Chats
