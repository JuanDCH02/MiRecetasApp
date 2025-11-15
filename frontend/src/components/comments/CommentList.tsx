import type { Comment } from "../../types"
import { formatDate } from "../../utils"

type CommentListProps = {
    comments: Comment[]
}

export const CommentList = ({ comments }: CommentListProps) => {
  return (
    <>
        <h2 className="text-2xl font-bold mb-4">Comentarios</h2>
        <div className="space-y-2">
            {comments.length === 0 && (
                <p className="text-gray-400 italic">Aún no hay comentarios.</p>
            )}

            {comments.map((comm) => (
                <div key={comm._id} className="p-3 border-b border-b-gray-300">
                    <p className="text-gray-400 font-semibold text-sm">
                        {formatDate(comm.createdAt)}
                    </p>


                    <p className="text-gray-500 font-black capitalize">
                        {comm.author_name}
                    </p>

                    <p className="text-xl">{comm.content}</p>
                </div>
            ))}
        </div>
    </>
  )
}