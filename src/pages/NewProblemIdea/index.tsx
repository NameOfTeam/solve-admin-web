import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FaExclamationCircle, FaPen, FaSpinner } from 'react-icons/fa';
import customAxios from '../../libs/customAxios';
import * as S from './style';

interface IdeaForm {
  title: string;
  content: string;
}

const NewProblemIdea = () => {
  const [form, setForm] = useState<IdeaForm>({
    title: '',
    content: '',
  });
  const [errors, setErrors] = useState({
    title: '',
    content: '',
  });
  const { problemId } = useParams<{ problemId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: IdeaForm) => {
      const response = await customAxios.post(`/problems/${problemId}/ideas`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ideas', problemId] });
      navigate(`/problems/${problemId}/ideas`);
    },
  });

  const validateForm = () => {
    const newErrors = {
      title: '',
      content: '',
    };

    if (!form.title.trim()) {
      newErrors.title = '제목을 입력해주세요';
    } else if (form.title.length < 5) {
      newErrors.title = '제목은 5자 이상이어야 합니다';
    }

    if (!form.content.trim()) {
      newErrors.content = '내용을 입력해주세요';
    } else if (form.content.length < 10) {
      newErrors.content = '내용은 10자 이상이어야 합니다';
    }

    setErrors(newErrors);
    return !newErrors.title && !newErrors.content;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      mutation.mutate(form);
    }
  };

  return (
    <S.Container>
      <S.PageTitle>
        새로운 <span>아이디어</span> 작성
      </S.PageTitle>

      <S.Form onSubmit={handleSubmit}>
        <S.FormGroup>
          <label htmlFor="title">제목</label>
          <S.Input
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="제목을 입력하세요..."
          />
          {errors.title && (
            <S.ErrorMessage>
              <FaExclamationCircle />
              {errors.title}
            </S.ErrorMessage>
          )}
        </S.FormGroup>

        <S.FormGroup>
          <label htmlFor="content">내용</label>
          <S.TextArea
            id="content"
            name="content"
            value={form.content}
            onChange={handleChange}
            placeholder="아이디어를 작성해주세요..."
          />
          {errors.content && (
            <S.ErrorMessage>
              <FaExclamationCircle />
              {errors.content}
            </S.ErrorMessage>
          )}
        </S.FormGroup>

        <S.Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? (
            <S.LoadingSpinner>
              <FaSpinner /> 작성 중...
            </S.LoadingSpinner>
          ) : (
            <>
              <FaPen /> 아이디어 제출
            </>
          )}
        </S.Button>
      </S.Form>
    </S.Container>
  );
};

export default NewProblemIdea;
