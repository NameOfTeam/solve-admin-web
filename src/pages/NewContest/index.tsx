import { Link, useNavigate } from 'react-router-dom';
import * as S from './style';
import { RiArrowLeftSFill } from 'react-icons/ri';
import useHorizontalResizable from '../../hooks/resizable/useHorizontalResizable';
import useCreateContest from '../../hooks/contest/useCreateContest';
import { useEffect } from 'react';

const NewContest = () => {
  const { request, handleChange, isPending, mutate, isSuccess } =
    useCreateContest();
  const { leftWidth, rightWidth, Resizer } = useHorizontalResizable();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      navigate('/contests');
    }
  }, [isSuccess]);

  return (
    <S.Container>
      <S.Header>
        <Link to="/contests">
          <RiArrowLeftSFill color="white" size={24} />
        </Link>
        <S.Title>대회 생성</S.Title>
      </S.Header>

      <S.SourceContainer width={leftWidth}>
        <S.Input
          type="text"
          placeholder="이름"
          name="title"
          value={request.title}
          onChange={handleChange}
        />
        <S.Textarea
          placeholder="설명"
          name="description"
          value={request.description}
          onChange={handleChange}
        />
        <S.Input
          type="datetime-local"
          placeholder="시작 시간"
          name="startAt"
          value={request.startAt}
          onChange={handleChange}
          required
        />
        <S.Input
          type="datetime-local"
          placeholder="종료 시간"
          name="endAt"
          value={request.endAt}
          onChange={handleChange}
          required
        />

        <S.Button onClick={() => mutate()}>생성</S.Button>
      </S.SourceContainer>

      <Resizer />

      <S.PreviewContainer width={rightWidth}>
        {/* <S.Input type="text" placeholder="Contest Name" />
        <S.Input type="text" placeholder="Contest Description" />
        <S.Input type="text" placeholder="Contest Start Time" />
        <S.Input type="text" placeholder="Contest End Time" /> */}
      </S.PreviewContainer>
    </S.Container>
  );
};

export default NewContest;
