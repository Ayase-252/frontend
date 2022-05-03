import { Image, Menu, MenuProps, Typography } from '@bangumi/design'
import React from 'react'
import { useParams } from 'react-router-dom'
import InfoBoxComp from '../../../components/InfoBox'
import { useCharacter } from '../../../hooks/useCharacter'
import styles from './index.module.less'

const { Text } = Typography

const CharacterPage: React.FC = () => {
  const { id } = useParams()
  const { data: character, isLoading } = useCharacter(id as string)

  const menuItems: MenuProps['items'] = [{
    key: 'overview',
    label: '概览'
  }]

  if (isLoading) {
    // TODO: loading
    return <div>LOADING</div>
  }

  if (!character) {
    // TODO: error
    return <div>ERROR</div>
  }
  return (
    <main className={styles.pageContainer}>
      <h1 className={styles.title}>{character.name}</h1>
      {
        character.nameInSimplifiedChinese &&
          <div className={styles.nameInSimplifiedChinese}>{character.nameInSimplifiedChinese}</div>
      }
      <Menu wrapperClass={styles.menu} items={menuItems} activeKey="overview" mode="horizontal" />
      <div className={styles.content}>
        <div className={styles.leftColumn}>
          <Image className={styles.characterThumbnail} src={character.images.large} width={290} height={426} />
          <InfoBoxComp info={character.infobox} />
        </div>
        <div className={styles.rightColumn}>
          <div className={styles.summary}>
            <Text>{character.summary}</Text>
          </div>
        </div>
      </div>
    </main>
  )
}

export default CharacterPage
