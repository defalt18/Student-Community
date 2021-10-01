import React from 'react'
import {
	Comment,
	FavoriteBorder as Like,
	Share,
	FavoriteRounded as Liked
} from '@material-ui/icons'

export const POST_OPTIONS = [
	{
		id: 'likes',
		icon: (truth) =>
			!truth ? <Like color='inherit' /> : <Liked color='inherit' />,
		label: 'Likes'
	},
	{
		id: 'comments',
		icon: <Comment color='inherit' />,
		label: 'comments'
	},
	{
		id: 'Share',
		icon: <Share color='inherit' />,
		label: 'Share'
	}
]
