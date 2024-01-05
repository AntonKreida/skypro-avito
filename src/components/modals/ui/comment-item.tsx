import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { useState, FC } from "react";

import { IComment } from "@interfaces/";


interface ICommentItemProps {
    comment: IComment
}

export const CommentItem: FC<ICommentItemProps> = ({ comment }) => {
  const [isErrorLoadingAvatar, setIsLoadingAvatar] = useState(false);

  return (
    <li className="w-full h-fit flex gap-3" key={ comment.id }>
      <div className="w-10 h-10 relative rounded-full border border-black overflow-hidden">
        <img
          alt="avatar"
          className="w-full h-full object-cover"
          onError={ () => setIsLoadingAvatar(true) }
          src={ `${import.meta.env.VITE_API_URL}/${comment.author.avatar}` }
        />
        { isErrorLoadingAvatar
          ? <div className="w-full h-full absolute left-0 top-0 rounded-full bg-slate-300" />
          : null }
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <p className="font-roboto font-semibold text-base text-black">
            { comment.author.name }
          </p>
          <p className="font-roboto font-normal text-base text-black/70">
            { `${format(new Date(comment.created_on), "dd MMMM yyyy", { locale: ru })}` }
          </p>
        </div>
        <div className="flex flex-col gap">
          <p className="font-roboto font-semibold text-base text-black">Комментарий</p>
          <p className="font-roboto font-normal text-base text-black">{ comment.text }</p>
        </div>
      </div>
    </li>
  );
};
