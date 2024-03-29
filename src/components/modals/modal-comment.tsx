import { ChevronLeftIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, MouseEventHandler } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useParams } from "react-router-dom";

import { selectorUser, usePostCreateAdCommentMutation } from "@/redux";
import { useAppSelector } from "@hooks/";
import { IAsd, IComment, IUser } from "@interfaces/";
import { Button, TextareaLabel } from "@shared/";

import { TSchemaComment, schemaComment } from "./schema/schema-comment";
import { CommentItem } from "./ui";


interface IModalCommentProps {
    commentList: IComment[];
    onClickCloseModal: MouseEventHandler<HTMLButtonElement>;
    dataAd: IAsd;
    dataUser: IUser;
}

export const ModalComment: FC<IModalCommentProps> = ({
  commentList, onClickCloseModal, dataAd, dataUser 
}) => {
  const { isAuthUser } = useAppSelector(selectorUser);
  const params = useParams();
  const { control, handleSubmit, formState: { errors, isDirty } } = useForm({
    defaultValues: {
      text: "",
    },
    mode: "onTouched",
    resolver: zodResolver(schemaComment),
  });

  const [postCreateComment, { isLoading: isLoadingComment }] = usePostCreateAdCommentMutation();

  const handlerOnSubmitForm: SubmitHandler<TSchemaComment> = async (data) => {
    const dataForm = {
      id: params.idAd as string,
      text: data.text,
    };
    await postCreateComment(dataForm).unwrap();
  };

  return (
    <div 
      className="h-full w-full lg:w-[600px] lg:h-[800px] bg-white 
      rounded-md flex flex-col px-12 py-10 gap-8 overflow-hidden overflow-y-auto"
      onClick={ (event) => event.stopPropagation() }
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-center lg:justify-between">
          <h1 className="text-2xl lg:text-3xl font-roboto font-medium text-black">
            Отзывы о товаре
          </h1>

          <button 
            className="w-fit h-fit active:scale-[0.8] transition hidden lg:block"
            onClick={ onClickCloseModal }
          >
            <XMarkIcon className="w-8 h-8 stroke-black/40" />
          </button>
        </div>

        { isAuthUser || dataUser.id !== dataAd.user_id
          ? (
            <form 
              className="w-full h-full flex flex-col gap-3"
              onSubmit={ handleSubmit(handlerOnSubmitForm) }
            >
              <TextareaLabel 
                addStylesLabel="text-black"
                control={ control }
                disabled={ isLoadingComment }
                isErrorRequestFrom={ !!errors.text }
                labelTitle="Добавьте отзыв"
                name="text"
                placeholder="Введите отзыв"
              />
              <Button 
                className="lg:w-fit"
                disabled={ !isDirty || isLoadingComment }
                text="Опубликовать"
                type="submit"
              />
            </form>
          )
          : null }
      </div>
      <ul 
        className="w-full h-full flex flex-col gap-8 overflow-y-auto
      scrollbar-thin scrollbar-track-gray-200 scrollbar-track-rounded scrollbar-thumb-slate-400 scrollbar-thumb-rounded"
      >
        { commentList.map((comment) => (
          <CommentItem comment={ comment } key={ comment.id } />
        )) }
      </ul>
      <button 
        className="w-fit h-fit absolute left-8 top-10 z-[900] block lg:hidden"
        onClick={ onClickCloseModal }
      >
        <ChevronLeftIcon 
          className="w-8 h-8 text-white stroke-black "
          
        />
      </button>
    </div>
  );
};
