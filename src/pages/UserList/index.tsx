import { useState, useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSpinner, FaUser, FaUserShield, FaSearch, FaFilter, FaEnvelope } from 'react-icons/fa';
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
        const params = {
          page: pageParam,
          size: 12,
          ...(debouncedSearch && { search: debouncedSearch }),
          ...(roleFilter !== 'ALL' && { role: roleFilter }),
        };

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20,
      },
    },
  };

  const getRoleIcon = (role: string) => {
    return role === 'ADMIN' ? <FaUserShield /> : <FaUser />;
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <S.Container>
        <S.Header>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <S.Title>
              사용자 <span>관리</span>
            </S.Title>
          </motion.div>
        </S.Header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <S.SearchBar>
            <S.SearchInputWrapper>
              <FaSearch className="search-icon" />
              <S.SearchInput
                type="text"
                placeholder="사용자 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <AnimatePresence>
                {isFetching && searchTerm === debouncedSearch && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    <S.SearchSpinner>
                      <FaSpinner />
                    </S.SearchSpinner>
                  </motion.div>
                )}
              </AnimatePresence>
            </S.SearchInputWrapper>

            <S.FilterWrapper>
              <FaFilter className="filter-icon" />
              <S.FilterSelect value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
                <option value="ALL">모든 역할</option>
                <option value="ADMIN">관리자</option>
                <option value="USER">일반 사용자</option>
              </S.FilterSelect>
            </S.FilterWrapper>
          </S.SearchBar>
        </motion.div>

        {status === 'pending' ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <S.LoadingSpinner>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              >
                <FaSpinner />
              </motion.div>
              <span>사용자 목록을 불러오는 중...</span>
            </S.LoadingSpinner>
          </motion.div>
        ) : status === 'error' ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <S.ErrorMessage>
              <strong>오류가 발생했습니다</strong>
              사용자 목록을 불러오는데 실패했습니다.
            </S.ErrorMessage>
          </motion.div>
        ) : (
          <S.UserGrid>
            <AnimatePresence>
              {data.pages.map((page) =>
                page.content.map((user) => (
                  <motion.div key={user.id} variants={itemVariants} layout whileHover={{ y: -8 }}>
                    <S.UserCard>
                      <motion.div whileHover={{ scale: 1.1 }}>
                        <S.Avatar
                          src={`${import.meta.env.VITE_API_URL}/avatars/${user.id}.webp`}
                          alt={user.username}
                        />
                      </motion.div>
                      <S.UserInfo>
                        <S.Username>{user.username}</S.Username>
                        <S.Email>
                          <FaEnvelope />
                          {user.email}
                        </S.Email>
                        <motion.div whileHover={{ scale: 1.05 }}>
                          <S.RoleBadge role={user.role}>
                            {getRoleIcon(user.role)}
                            {user.role === 'ADMIN' ? '관리자' : '일반 사용자'}
                          </S.RoleBadge>
                        </motion.div>
                      </S.UserInfo>
                    </S.UserCard>
                  </motion.div>
                )),
              )}
            </AnimatePresence>
          </S.UserGrid>
        )}

        <div ref={ref}>
          {isFetchingNextPage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <S.LoadingSpinner>
                <FaSpinner />
                <span>추가 사용자를 불러오는 중...</span>
              </S.LoadingSpinner>
            </motion.div>
          )}
        </div>
      </S.Container>
    </motion.div>
  );
};

export default UserList;
