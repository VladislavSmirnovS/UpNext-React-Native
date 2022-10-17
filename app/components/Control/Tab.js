import React from 'react'
import styled from 'styled-components'
import Texts from 'appearance/texts'
import Colors from 'appearance/colors'

export default ({ tabs, setActiveTab, activeTab }) => {
  return (
    <Row>
      {tabs.map(item => (
        <TabItem
          key={item.value}
          label={item.label}
          value={item.value}
          icon={item.icon}
          onClick={item.onClick}
          setActiveTab={setActiveTab}
          activeTab={activeTab}
        />
      ))}
    </Row>
  )
}

const TabItem = ({ label, value, icon, setActiveTab, activeTab, onClick }) => {
  const isActive = activeTab === value

  const onPress = () => {
    if (isActive) {
      return null
    }

    setActiveTab(value)
    onClick && onClick()
  }

  return (
    <TouchableOpacity onPress={onPress} isActive={isActive}>
      {label ? <Texts.TitleText>{label}</Texts.TitleText> : null}
      {icon ? <Icon source={icon} /> : null}
    </TouchableOpacity>
  )
}

const Row = styled.View`
  flex-direction: row;
  width: 100%;
`

const TouchableOpacity = styled.TouchableOpacity`
  align-items: center;
  border-bottom-color: ${p => (p.isActive ? Colors.COMMON_BLUE : 'transparent')};
  border-bottom-width: 2px;
  padding: 10px 15px;
  flex: 1;
`

const Icon = styled.Image`
  width: 30px;
  height: 30px;
`
