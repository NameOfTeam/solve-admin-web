import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  FaArrowLeft,
  FaChevronDown,
  FaChevronUp,
  FaEdit,
  FaRegClock,
  FaTrash,
  FaReply,
  FaSpinner,
  FaComments,
  FaRegComments,
  FaRegEdit,
  FaHeart,
  FaRegHeart,
  FaPen,
  FaExclamationTriangle,
} from 'react-icons/fa';
import customAxios from '../../libs/customAxios';
import * as S from './style';
import { ProblemIdeaResponse, ProblemIdeaCommentResponse } from '../../types/problem/problem_idea';
import { BaseResponse } from '../../types/common/base';

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

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
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
      const response = await customAxios.put(
        `/problems/${problemId}/ideas/${ideaId}/comments/${comment.id}`,
        { content },
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['idea', problemId, ideaId] });
      setIsEditing(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      await customAxios.delete(`/problems/${problemId}/ideas/${ideaId}/comments/${comment.id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['idea', problemId, ideaId] });
    },
  });

  const replyMutation = useMutation({
    mutationFn: async (content: string) => {
      const response = await customAxios.post(`/problems/${problemId}/ideas/${ideaId}/comments`, {
        content,
        parentId: comment.id,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['idea', problemId, ideaId] });
      setIsReplying(false);
      setReplyContent('');
    },
  });

  return (
    <S.CommentSection depth={depth}>
      <S.Comment depth={depth}>
        <S.CommentControls>
          <S.CommentAuthor>
            <S.Avatar
              src={`${import.meta.env.VITE_API_URL}/avatars/${comment.author.id}.webp`}
              alt={comment.author.username}
            />
            <S.AuthorInfo>
              <S.AuthorName>{comment.author.username}</S.AuthorName>
              <S.DateInfo>
                <FaRegClock />
                {formatTimeAgo(comment.createdAt)}
                {comment.updatedAt !== comment.createdAt && <span>(수정됨)</span>}
              </S.DateInfo>
            </S.AuthorInfo>
          </S.CommentAuthor>

          <S.AuthorActions>
            <S.ActionButton onClick={() => setIsReplying(!isReplying)}>
              <FaReply />
              답글
            </S.ActionButton>
            {comment.isAuthor && (
              <>
                <S.ActionButton onClick={() => setIsEditing(!isEditing)}>
                  <FaEdit />
                  수정
                </S.ActionButton>
                <S.ActionButton
                  onClick={() => {
                    if (window.confirm('정말 삭제하시겠습니까?')) {
                      deleteMutation.mutate();
                    }
                  }}
                >
                  <FaTrash />
                  삭제
                </S.ActionButton>
              </>
            )}
          </S.AuthorActions>
        </S.CommentControls>

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
              {editMutation.isPending ? (
                <>
                  <FaSpinner /> 수정 중...
                </>
              ) : (
                <>
                  <FaPen /> 수정하기
                </>
              )}
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
              {replyMutation.isPending ? (
                <>
                  <FaSpinner /> 작성 중...
                </>
              ) : (
                <>
                  <FaReply /> 답글 작성
                </>
              )}
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

const ProblemIdea: React.FC = () => {
  const { problemId, ideaId } = useParams<{
    problemId: string;
    ideaId: string;
  }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [commentContent, setCommentContent] = useState('');

  const {
    data: idea,
    isLoading,
    error,
  } = useQuery<BaseResponse<ProblemIdeaResponse>, Error>({
    queryKey: ['idea', problemId, ideaId],
    queryFn: async () => {
      const response = await customAxios.get(`/problems/${problemId}/ideas/${ideaId}`);
      return response.data;
    },
    enabled: !!problemId && !!ideaId,
  });

  const likeMutation = useMutation({
    mutationFn: async () => {
      const response = await customAxios.post(`/problems/${problemId}/ideas/${ideaId}/like`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['idea', problemId, ideaId] });
    },
  });

  const commentMutation = useMutation({
    mutationFn: async (content: string) => {
      const response = await customAxios.post(`/problems/${problemId}/ideas/${ideaId}/comments`, {
        content,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['idea', problemId, ideaId] });
      setCommentContent('');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      await customAxios.delete(`/problems/${problemId}/ideas/${ideaId}`);
    },
    onSuccess: () => {
      navigate(`/problems/${problemId}/ideas`);
    },
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
        <FaExclamationTriangle />
        <strong>오류가 발생했습니다</strong>
        <p>{error.message}</p>
      </S.ErrorMessage>
    );
  }

  if (!idea?.data) return null;

  return (
    <S.Container>
      <S.BackButton onClick={() => navigate(`/problems/${problemId}/ideas`)}>
        <FaArrowLeft /> 목록으로 돌아가기
      </S.BackButton>

      <S.IdeaContainer>
        <S.IdeaTitle>{idea.data.title}</S.IdeaTitle>
        <S.IdeaMeta>
          <S.Avatar
            src={`${import.meta.env.VITE_API_URL}/avatars/${idea.data.author.id}.webp`}
            alt={idea.data.author.username}
          />
          <S.AuthorInfo>
            <S.AuthorName>{idea.data.author.username}</S.AuthorName>
            <S.CreatedAt>
              <FaRegClock />
              {formatDate(idea.data.createdAt)}
            </S.CreatedAt>
          </S.AuthorInfo>
        </S.IdeaMeta>
        <S.IdeaContent>{idea.data.content}</S.IdeaContent>

        <S.IdeaActions>
          <S.LikeButton
            isLiked={idea.data.isLiked || false}
            onClick={() => likeMutation.mutate()}
            disabled={likeMutation.isPending}
          >
            {idea.data.isLiked ? <FaHeart /> : <FaRegHeart />}
            좋아요 {idea.data.likeCount}
          </S.LikeButton>

          {idea.data.isAuthor && (
            <>
              <S.EditButton onClick={() => navigate(`/problems/${problemId}/ideas/${ideaId}/edit`)}>
                <FaEdit /> 수정하기
              </S.EditButton>
              <S.DeleteButton
                onClick={() => {
                  if (window.confirm('정말 삭제하시겠습니까?')) {
                    deleteMutation.mutate();
                  }
                }}
              >
                <FaTrash /> 삭제하기
              </S.DeleteButton>
            </>
          )}
        </S.IdeaActions>
      </S.IdeaContainer>

      <S.CommentsContainer>
        <S.CommentHeader>
          <FaComments />
          댓글 <span>{idea.data.comments.length}개</span>
        </S.CommentHeader>

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
            {commentMutation.isPending ? (
              <>
                <FaSpinner /> 작성 중...
              </>
            ) : (
              <>
                <FaRegEdit /> 댓글 작성
              </>
            )}
          </S.CommentButton>
        </S.CommentForm>

        <S.CommentList>
          {idea.data.comments.length === 0 ? (
            <S.EmptyState>
              <FaRegComments />
              <p>첫 번째 댓글을 작성해보세요!</p>
            </S.EmptyState>
          ) : (
            idea.data.comments.map((comment) => (
              <CommentThread
                key={comment.id}
                comment={comment}
                depth={0}
                problemId={problemId!}
                ideaId={Number(ideaId)}
              />
            ))
          )}
        </S.CommentList>
      </S.CommentsContainer>

      {deleteMutation.isPending && (
        <S.LoadingOverlay>
          <S.LoadingSpinner>
            <FaSpinner />
            삭제 중입니다...
          </S.LoadingSpinner>
        </S.LoadingOverlay>
      )}
    </S.Container>
  );
};

export default ProblemIdea;
