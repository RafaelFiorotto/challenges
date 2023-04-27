import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Avatar } from '@siakit/avatar'
import { Flex } from '@siakit/layout'

import api from '../../services/api'
import { Container, Content, Text } from './styles'

export default function Repository() {
  const { id, userName, repoName }: any = useParams()
  const [repositoryData, setRepositoryData] = useState<any>({})
  const [ownerData, setOwnerData] = useState<any>({})

  async function getRepositoryData() {
    try {
      const response = await api.get(`/repos/${userName}/${repoName}`)
      setRepositoryData(response.data)
      setOwnerData(response.data.owner)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getRepositoryData()
  }, [id])

  return (
    <Container>
      <Content>
        <Flex direction="row" gap padding>
          <Flex style={{ marginRight: 32 }} direction="row">
            <Flex direction="row" align="center">
              <Flex style={{ marginBottom: 16 }}>
                <Avatar name={userName} size="3xl" src={ownerData.avatar_url} />
              </Flex>
            </Flex>
          </Flex>
          <Flex direction="column" gap style={{ marginBottom: 16 }}>
            <Flex direction="column">
              <Text>Usuário(a): </Text>
              <Text style={{ fontSize: 20 }}>{ownerData.login}</Text>
            </Flex>
            <Flex direction="column">
              <Text>Link do Repositório: </Text>
              <Text
                style={{ fontSize: 20, cursor: 'pointer', color: '#539BF5' }}
                onClick={() => window.open(repositoryData.html_url, '_blank')}
              >
                {repositoryData.html_url}
              </Text>
            </Flex>
            <Flex direction="column">
              <Text>Link do Perfil: </Text>
              <Text
                style={{ fontSize: 20, cursor: 'pointer', color: '#539BF5' }}
                onClick={() => window.open(repositoryData.url, '_blank')}
              >
                {repositoryData.url}
              </Text>
            </Flex>
            {repositoryData.description && (
              <Flex direction="column">
                <Text>Descrição: </Text>
                <Text style={{ fontSize: 20 }}>
                  {repositoryData.description}
                </Text>
              </Flex>
            )}
            <Flex flex flexWrap direction="row" gap>
              <Flex direction="column">
                <Text>Branch Principal: </Text>
                <Text style={{ fontSize: 20 }}>
                  {repositoryData.default_branch}
                </Text>
              </Flex>
              <Flex direction="column">
                <Text>Satus: </Text>
                <Text style={{ fontSize: 20 }}>
                  {repositoryData.private === false ? 'Público' : 'Privado'}
                </Text>
              </Flex>
              <Flex direction="column">
                <Text>Forks: </Text>
                <Text style={{ alignSelf: 'flex-end', fontSize: 20 }}>
                  {repositoryData.forks}
                </Text>
              </Flex>
              <Flex direction="column">
                <Text>Inscritos: </Text>
                <Text style={{ alignSelf: 'flex-end', fontSize: 20 }}>
                  {repositoryData.subscribers_count}
                </Text>
              </Flex>
              <Flex direction="column">
                <Text>Issues abertas: </Text>
                <Text style={{ alignSelf: 'flex-end', fontSize: 20 }}>
                  {repositoryData.open_issues_count}
                </Text>
              </Flex>
              <Flex direction="column">
                <Text>Watchers: </Text>
                <Text style={{ alignSelf: 'flex-end', fontSize: 20 }}>
                  {repositoryData.watchers_count}
                </Text>
              </Flex>
              {repositoryData.language && (
                <Flex direction="column">
                  <Text>Linguagem: </Text>
                  <Text style={{ fontSize: 20 }}>
                    {repositoryData.language}
                  </Text>
                </Flex>
              )}
            </Flex>
          </Flex>
        </Flex>
      </Content>
    </Container>
  )
}
