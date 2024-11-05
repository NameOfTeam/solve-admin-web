import { useState, useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { FaSpinner, FaUser, FaUserShield } from 'react-icons/fa';
import * as S from './style';
import adminAxios from '../../libs/adminAxios';
import { BaseResponse } from '../../types/common/base';
import { PageResponse } from '../../types/common/page';
import { UserResponse } from '../../types/user/user';

const UserList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const { ref, inView } = useInView();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status, isFetching } =
    useInfiniteQuery({
      queryKey: ['users', debouncedSearch, roleFilter],
      queryFn: async ({ pageParam = 0 }) => {
        const params: {
          page: number;
          size: number;
          search?: string;
          role?: string;
        } = {
          page: pageParam,
          size: 12,
        };

        if (debouncedSearch) {
          params.search = debouncedSearch;
        }

        if (roleFilter !== 'ALL') {
          params.role = roleFilter;
        }

        const { data } = await adminAxios.get<BaseResponse<PageResponse<UserResponse>>>('/users', {
          params,
        });
        return data.data;
      },
      initialPageParam: 0,
      getNextPageParam: (lastPage) =>
        lastPage.pageable.pageNumber < lastPage.totalPages - 1
          ? lastPage.pageable.pageNumber + 1
          : undefined,
    });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  const getRoleIcon = (role: string) => {
    return role === 'ADMIN' ? <FaUserShield /> : <FaUser />;
  };

  return (
    <S.Container>
      <S.Header>
        <S.Title>
          사용자 <span>관리</span>
        </S.Title>
      </S.Header>

      <S.SearchBar>
        <S.SearchInputWrapper>
          <S.SearchInput
            type="text"
            placeholder="사용자 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {isFetching && searchTerm === debouncedSearch && (
            <S.SearchSpinner>
              <FaSpinner />
            </S.SearchSpinner>
          )}
        </S.SearchInputWrapper>
        <S.FilterSelect value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
          <option value="ALL">모든 역할</option>
          <option value="ADMIN">관리자</option>
          <option value="USER">일반 사용자</option>
        </S.FilterSelect>
      </S.SearchBar>

      {status === 'pending' ? (
        <S.LoadingSpinner>
          <FaSpinner />
          <span>사용자 목록을 불러오는 중...</span>
        </S.LoadingSpinner>
      ) : status === 'error' ? (
        <S.ErrorMessage>
          <strong>오류가 발생했습니다</strong>
          사용자 목록을 불러오는데 실패했습니다.
        </S.ErrorMessage>
      ) : (
        <S.UserGrid>
          {data.pages.map((page) =>
            page.content.map((user) => (
              <S.UserCard key={user.id}>
                <S.Avatar
                  src={`${import.meta.env.VITE_API_URL}/avatars/${user.id}.webp`}
                  alt={user.username}
                />
                <S.UserInfo>
                  <S.Username>{user.username}</S.Username>
                  <S.Email>{user.email}</S.Email>
                  <S.RoleBadge role={user.role}>
                    {getRoleIcon(user.role)}
                    {user.role === 'ADMIN' ? '관리자' : '일반 사용자'}
                  </S.RoleBadge>
                </S.UserInfo>
              </S.UserCard>
            )),
          )}
        </S.UserGrid>
      )}

      <div ref={ref}>
        {isFetchingNextPage && (
          <S.LoadingSpinner>
            <FaSpinner />
            <span>추가 사용자를 불러오는 중...</span>
          </S.LoadingSpinner>
        )}
      </div>
    </S.Container>
  );
};

export default UserList;
