/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useState } from 'react'
import { AiFillGithub } from 'react-icons/ai'
import { BsFillBookmarkStarFill } from 'react-icons/bs'
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from 'react-icons/md'
import { RiGitRepositoryFill, RiStarLine } from 'react-icons/ri'
import Lottie from 'react-lottie'
import { useNavigate } from 'react-router-dom'

import { format } from 'date-fns'
import debounce from 'lodash.debounce'

import { Button } from '@siakit/button'
import { Flex } from '@siakit/layout'
import { Modal, ModalContent } from '@siakit/modal'
import { Table } from '@siakit/table'
import { useToast } from '@siakit/toast'

import empty from '../../assets/lottie/empty.json'
import api from '../../services/api'
import { Container, Header, Text } from './styles'

type FavType = {
  id: number
  name: string
  url: string
  repoUrl: string
  repoName: string
  userName: string
}
export default function Home() {
  const { addToast } = useToast()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [repositoriesFound, setRepositoriesFound] = useState<any>({})
  const [params, setParams] = useState({
    search: '',
    page: 1,
  })
  const [favorites, setFavorites] = useState<FavType[]>([])

  async function loadRepositories() {
    try {
      setLoading(true)
      const response = await api.get(
        `/search/repositories?q=${params.search}&page=${params.page}`,
      )
      if (params.page === 1) {
        setRepositoriesFound(response.data)
      } else {
        setRepositoriesFound({
          ...repositoriesFound,
          items: [...repositoriesFound.items, ...response.data.items],
        })
      }
    } catch (error) {
      if (params.search !== '') {
        addToast({
          type: 'error',
          title: 'Atenção!',
          description: 'Erro ao carregar os repositórios!',
        })
      }
    } finally {
      setLoading(false)
    }
  }

  async function markRepoAsFavorite(data: FavType) {
    try {
      setLoading(true)
      localStorage.setItem('fav', JSON.stringify([...favorites, data]))
      setFavorites((prevState) => [...prevState, data])
      addToast({
        type: 'success',
        title: 'Sucesso!',
        description: 'Repositório marcado como favorito!',
      })
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Atenção!',
        description: 'Erro ao marcar como favorito!',
      })
    } finally {
      setLoading(false)
    }
  }
  async function removeRepoAsFavorite(data: FavType) {
    try {
      setLoading(true)
      localStorage.setItem(
        'fav',
        JSON.stringify(favorites.filter((favorite) => favorite.id !== data.id)),
      )
      setFavorites(favorites.filter((favorite) => favorite.id !== data.id))
      addToast({
        type: 'warning',
        title: 'Atenção',
        description: 'Repositório desmarcado como favorito!',
      })
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Atenção!',
        description: 'Erro ao remover favorito!',
      })
    } finally {
      setLoading(false)
    }
  }

  const search = useCallback(
    debounce((e: any) => setParams({ page: 1, search: e.target.value }), 350),
    [],
  )

  useEffect(() => {
    if (params.search !== '') {
      loadRepositories()
    }
  }, [params])

  useEffect(() => {
    const favs = localStorage.getItem('fav')
    if (favs) {
      setFavorites(JSON.parse(favs))
    }
  }, [])

  return (
    <>
      <Modal open={modalVisible} onOpenChange={() => setModalVisible(false)}>
        <ModalContent title={'Favoritos'} size="md">
          <Flex padding>
            <Table
              data={favorites}
              headers={[
                {
                  label: 'Nome do repositório',
                  dataIndex: 'name',
                },
                {
                  label: 'Repositório',
                  dataIndex: 'repoUrl',
                  render(item: any) {
                    if (item.value) {
                      return (
                        <Text
                          style={{
                            color: '#539BF5',
                            cursor: 'pointer',
                          }}
                          onClick={() => window.open(item.value, '_blank')}
                        >
                          {item.value}
                        </Text>
                      )
                    }
                  },
                },
                {
                  label: 'Criador',
                  dataIndex: 'url',
                  render(item: any) {
                    if (item.value) {
                      return (
                        <Text
                          style={{
                            color: '#539BF5',
                            cursor: 'pointer',
                          }}
                          onClick={() => window.open(item.value, '_blank')}
                        >
                          {item.value}
                        </Text>
                      )
                    }
                  },
                },
              ]}
              actions={[
                {
                  label: 'Ver Repositorio',
                  onClick: (item: any) => {
                    navigate(
                      `/repository/${item.id}/${item.userName}/${item.repoName}`,
                    )
                  },
                },
                {
                  label: 'Excluir',
                  type: 'danger',
                  onClick: (item: any) => {
                    removeRepoAsFavorite(item)
                  },
                },
              ]}
            />
          </Flex>
        </ModalContent>
      </Modal>
      <Container>
        <div>
          <Flex align="center" gap>
            <AiFillGithub color="#FFF" size={38} />
            <input
              type="text"
              onChange={search}
              placeholder="Digite sua pesquisa.. "
            />
            <Button
              colorScheme="gray"
              variant="secondary"
              onClick={() => setModalVisible(true)}
            >
              <BsFillBookmarkStarFill color="#000" />
            </Button>
          </Flex>

          {repositoriesFound.total_count > 0 && (
            <Header>
              <h1>{repositoriesFound.total_count} Repositórios encontrados</h1>
            </Header>
          )}
          {repositoriesFound.items ? (
            repositoriesFound.items.map((item: any) => (
              <Flex
                key={item.id}
                gap
                style={{
                  flex: 1,
                  paddingTop: 16,
                  paddingBottom: 16,
                  borderTop: '0.5px solid #e9e9e9',
                  borderBottom: '0.5px solid #e9e9e9',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Flex direction="row" align="center" gap={8} flex>
                  <RiGitRepositoryFill color="#cdd9e5" size={22} />
                  <Flex direction="column" gap={4}>
                    <Text
                      style={{
                        fontSize: 18,
                        color: '#539BF5',
                        fontWeight: 500,
                        cursor: 'pointer',
                      }}
                      onClick={() => window.open(item.owner.html_url, '_blank')}
                    >
                      {item.full_name}
                    </Text>

                    <Text>{item.description}</Text>

                    <Flex direction="row" gap>
                      <Flex gap={4}>
                        <RiStarLine color="#cdd9e5" />
                        <Text>{item.stargazers_count}</Text>
                      </Flex>
                      {item.language && <Text>{item.language}</Text>}

                      {item.license && (
                        <Text>{item.license && item.license.name}</Text>
                      )}

                      <Text>
                        Atualizado em:{' '}
                        {item.updated_at &&
                          format(new Date(item.updated_at), 'dd/MM/yyyy HH:mm')}
                      </Text>

                      <Text>{item.open_issues} issues</Text>
                    </Flex>
                  </Flex>
                </Flex>
                <Flex>
                  {favorites.find(
                    (favorite: FavType) => favorite.id === item.id,
                  ) ? (
                    <Button
                      onClick={() =>
                        removeRepoAsFavorite({
                          id: item.id,
                          name: item.full_name,
                          url: item.owner.html_url,
                          repoUrl: item.html_url,
                          repoName: item.name,
                          userName: item.owner.login,
                        })
                      }
                    >
                      <MdOutlineFavorite color="tomato" />
                    </Button>
                  ) : (
                    <Button>
                      <MdOutlineFavoriteBorder
                        onClick={() =>
                          markRepoAsFavorite({
                            id: item.id,
                            name: item.full_name,
                            url: item.owner.html_url,
                            repoUrl: item.html_url,
                            repoName: item.name,
                            userName: item.owner.login,
                          })
                        }
                      />
                    </Button>
                  )}
                </Flex>
              </Flex>
            ))
          ) : (
            <Flex flex align="center" direction="column" justify="center">
              <Lottie
                height={'70%'}
                width={'70%'}
                isPaused={false}
                isStopped={false}
                isClickToPauseDisabled
                options={{
                  autoplay: true,
                  loop: true,
                  animationData: empty,
                  rendererSettings: {
                    preserveAspectRatio: 'xMidYMid slice',
                  },
                }}
              />
              <Text style={{ fontSize: 20 }}>
                Pesquise algum Repositório...
              </Text>
            </Flex>
          )}

          {repositoriesFound?.items?.length > 0 && (
            <Flex justify="center" margin>
              <Button
                type="button"
                colorScheme="indigo"
                onClick={() =>
                  loading
                    ? null
                    : setParams({ ...params, page: params.page + 1 })
                }
                style={{ cursor: loading ? 'not-allowed' : 'pointer' }}
              >
                {loading ? 'Carregando...' : 'Carregar mais'}
              </Button>
            </Flex>
          )}
        </div>
      </Container>
    </>
  )
}
