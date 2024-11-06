import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  FaRegComment,
  FaRegClock,
  FaRegHeart,
  FaChevronDown,
  FaChevronUp,
  FaEdit,
  FaTrash,
  FaSpinner,
  FaReply,
  FaPlus,
  FaLightbulb,
  FaRegLightbulb,
  FaHeart,
} from 'react-icons/fa';
import customAxios from '../../libs/customAxios';
import * as S from './style';
import { BaseResponse } from '../../types/common/base';
import { ProblemIdeaCommentResponse, ProblemIdeaResponse } from '../../types/problem/problem_idea';

const formatTimeAgo = (dateString: string): string => {
  const now = new Date();
  const past = new Date(dateString);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (diffInSeconds < 60) return `${diffInSeconds}초 전`;
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}분 전`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}시간 전`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays}일 전`;
  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) return `${diffInWeeks}주 전`;
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) return `${diffInMonths}개월 전`;
  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears}년 전`;
};

const CommentThread = ({
  comment,
  depth,
  problemId,
  ideaId,
}: {
  comment: ProblemIdeaCommentResponse;
  depth: number;
  problemId: string;
  ideaId: number;
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const queryClient = useQueryClient();

  const editMutation = useMutation({
    mutationFn: async (content: string) => {
      const response = await customAxios.patch(
        `/problems/${problemId}/ideas/${ideaId}/comments/${comment.id}`,
        { content },
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['comments', problemId, ideaId],
      });
      setIsEditing(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      await customAxios.delete(`/problems/${problemId}/ideas/${ideaId}/comments/${comment.id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['comments', problemId, ideaId],
      });
    },
  });

  const replyMutation = useMutation({
    mutationFn: async (content: string) => {
      await customAxios.post(`/problems/${problemId}/ideas/${ideaId}/comments`, {
        content,
        parentId: comment.id,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['comments', problemId, ideaId],
      });
      setIsReplying(false);
      setReplyContent('');
    },
  });

  return (
    <S.CommentSection depth={depth}>
      <S.Comment depth={depth}>
        <S.CommentHeader>
          <S.AuthorInfo>
            <S.Avatar
              src={`${import.meta.env.VITE_API_URL}/avatars/${comment.author.id}.webp`}
              alt={comment.author.username}
            />
            <div>
              <S.Username>{comment.author.username}</S.Username>
              <S.TimeStamp>
                <FaRegClock />
                {formatTimeAgo(comment.createdAt)}
              </S.TimeStamp>
            </div>
          </S.AuthorInfo>

          <S.ActionButtons>
            <S.ActionButton onClick={() => setIsReplying(!isReplying)}>
              <FaReply /> 답글
            </S.ActionButton>
            <S.ActionButton onClick={() => setIsEditing(!isEditing)}>
              <FaEdit /> 수정
            </S.ActionButton>
            <S.ActionButton
              onClick={() => {
                if (window.confirm('정말 삭제하시겠습니까?')) {
                  deleteMutation.mutate();
                }
              }}
            >
              <FaTrash /> 삭제
            </S.ActionButton>
          </S.ActionButtons>
        </S.CommentHeader>

        {isEditing ? (
          <S.CommentForm
            onSubmit={(e) => {
              e.preventDefault();
              if (editContent.trim()) {
                editMutation.mutate(editContent);
              }
            }}
          >
            <S.CommentInput value={editContent} onChange={(e) => setEditContent(e.target.value)} />
            <S.CommentButton type="submit" disabled={editMutation.isPending}>
              {editMutation.isPending ? <FaSpinner /> : '수정하기'}
            </S.CommentButton>
          </S.CommentForm>
        ) : (
          <S.CommentContent>{comment.content}</S.CommentContent>
        )}

        {isReplying && (
          <S.CommentForm
            onSubmit={(e) => {
              e.preventDefault();
              if (replyContent.trim()) {
                replyMutation.mutate(replyContent);
              }
            }}
          >
            <S.CommentInput
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="답글을 작성하세요..."
            />
            <S.CommentButton type="submit" disabled={replyMutation.isPending}>
              {replyMutation.isPending ? <FaSpinner /> : '답글 작성'}
            </S.CommentButton>
          </S.CommentForm>
        )}
      </S.Comment>

      {comment.children && comment.children.length > 0 && (
        <>
          <S.ToggleButton onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
            {isExpanded ? '답글 접기' : `답글 ${comment.children.length}개 보기`}
          </S.ToggleButton>

          {isExpanded &&
            comment.children.map((child) => (
              <CommentThread
                key={child.id}
                comment={child}
                depth={depth + 1}
                problemId={problemId}
                ideaId={ideaId}
              />
            ))}
        </>
      )}
    </S.CommentSection>
  );
};

const IdeaCard = ({ idea, problemId }: { idea: ProblemIdeaResponse; problemId: string }) => {
  const [isCommenting, setIsCommenting] = useState(false);
  const [commentContent, setCommentContent] = useState('');
  const [isLiked, setIsLiked] = useState(idea.isLiked);
  const [likeCount, setLikeCount] = useState(idea.likeCount);
  const queryClient = useQueryClient();

  const { data: comments, isLoading: commentsLoading } = useQuery<ProblemIdeaCommentResponse[]>({
    queryKey: ['comments', problemId, idea.id],
    queryFn: async () => {
      const { data } = await customAxios.get<BaseResponse<ProblemIdeaCommentResponse[]>>(
        `/problems/${problemId}/ideas/${idea.id}/comments`,
      );

      return data.data;
    },
  });

  const likeMutation = useMutation({
    mutationFn: async () => {
      await customAxios.post(`/problems/${problemId}/ideas/${idea.id}/like`);
    },
    onSuccess: () => {
      setIsLiked(!isLiked);
      setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
    },
  });

  const commentMutation = useMutation({
    mutationFn: async (content: string) => {
      const response = await customAxios.post(`/problems/${problemId}/ideas/${idea.id}/comments`, {
        content,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['comments', problemId, idea.id],
      });
      setCommentContent('');
      setIsCommenting(false);
    },
  });

  return (
    <S.IdeaCard>
      <Link to={`/problems/${problemId}/ideas/${idea.id}`}>
        <S.IdeaTitle>{idea.title}</S.IdeaTitle>
      </Link>

      <S.IdeaContent>{idea.content}</S.IdeaContent>

      <S.InteractionBar>
        <S.InteractionItem onClick={() => likeMutation.mutate()}>
          {isLiked ? <FaHeart color="#ef4444" /> : <FaRegHeart />}
          <span>좋아요 {likeCount}</span>
        </S.InteractionItem>

        <S.InteractionItem onClick={() => setIsCommenting(!isCommenting)}>
          <FaRegComment />
          <span>{commentsLoading ? '로딩중' : `댓글 ${comments?.length || 0}개`}</span>
        </S.InteractionItem>
      </S.InteractionBar>

      {isCommenting && (
        <S.CommentForm
          onSubmit={(e) => {
            e.preventDefault();
            if (commentContent.trim()) {
              commentMutation.mutate(commentContent);
            }
          }}
        >
          <S.CommentInput
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            placeholder="댓글을 작성하세요..."
          />
          <S.CommentButton
            type="submit"
            disabled={!commentContent.trim() || commentMutation.isPending}
          >
            {commentMutation.isPending ? <FaSpinner /> : '댓글 작성'}
          </S.CommentButton>
        </S.CommentForm>
      )}

      {!commentsLoading && comments && comments.length > 0 && (
        <div>
          {comments.map((comment) => (
            <CommentThread
              key={comment.id}
              comment={comment}
              depth={0}
              problemId={problemId}
              ideaId={idea.id}
            />
          ))}
        </div>
      )}
    </S.IdeaCard>
  );
};

const ProblemIdeaList: React.FC = () => {
  const { problemId } = useParams<{ problemId: string }>();

  const {
    data: ideas,
    isLoading,
    error,
  } = useQuery<ProblemIdeaResponse[], Error>({
    queryKey: ['ideas', problemId],
    queryFn: async () => {
      const { data } = await customAxios.get<BaseResponse<ProblemIdeaResponse[]>>(
        `/problems/${problemId}/ideas`,
      );

      return data.data;
    },
    enabled: !!problemId,
  });

  if (isLoading) {
    return (
      <S.LoadingSpinner>
        <FaSpinner />
        아이디어를 불러오는 중입니다...
      </S.LoadingSpinner>
    );
  }

  if (error) {
    return (
      <S.ErrorMessage>
        <strong>오류가 발생했습니다</strong>
        <br />
        {error.message}
      </S.ErrorMessage>
    );
  }

  if (!ideas?.length) {
    return (
      <S.Container>
        <S.PageTitle>
          <FaLightbulb />
          문제 해결 <span>아이디어</span>
        </S.PageTitle>

        <S.ButtonContainer>
          <Link to={`/problems/${problemId}/ideas/new`}>
            <S.Button>
              <FaPlus /> 새 아이디어 작성
            </S.Button>
          </Link>
        </S.ButtonContainer>

        <S.EmptyState>
          <FaRegLightbulb />
          <h3>아직 작성된 아이디어가 없습니다</h3>
          <p>첫 번째 아이디어를 작성해 보세요!</p>
        </S.EmptyState>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.PageTitle>
        <FaLightbulb />
        문제 해결 <span>아이디어</span>
      </S.PageTitle>

      <S.ButtonContainer>
        <Link to={`/problems/${problemId}/ideas/new`}>
          <S.Button>
            <FaPlus /> 새 아이디어 작성
          </S.Button>
        </Link>
      </S.ButtonContainer>

      <S.IdeasGrid>
        {ideas?.map((idea) => <IdeaCard key={idea.id} idea={idea} problemId={problemId!} />)}
      </S.IdeasGrid>
    </S.Container>
  );
};

export default ProblemIdeaList;
