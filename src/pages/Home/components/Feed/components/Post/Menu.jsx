import Button from 'components/Button'
import LongMenu from './LongMenu'
import { deleteDocumentByAdmin } from '../../../../../Admin/utils';

export default function Menu({ NO_ID_FIELD, image }) {
    const options = [
        <DeletePost postID={NO_ID_FIELD} image={image} />,
    ]

    return (
        <LongMenu options={options} />
    )

}

function DeletePost({ postID, image }) {
    const handleDelete = async () => {
        await deleteDocumentByAdmin(postID, { image }, 'posts');
    }

    return (
        <span className="text-red-500 w-full" onClick={handleDelete} >
            Delete
        </span>
    )
}