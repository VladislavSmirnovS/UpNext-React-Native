import React, { useState } from 'react'
import ColoredInputCard from 'components/MyVentures/ColoredInputCard'
import Header from 'components/Launcher/Header'
import Colors from 'appearance/colors'

export default ({ item, onSave, onShowSuccessAnimation }) => {
  const [currentSection, setCurrentSection] = useState('description')

  return (
    <>
      <Header item={item} />
      <ColoredInputCard
        title="Description"
        field="description"
        onSave={onSave}
        callback={onShowSuccessAnimation}
        backgroundColor={Colors.COMMON_GREY}
        placeholder="Tell us more about what you can do for the startups..."
        placeholderTextColor="#e6e6e6"
        maxCharactes={140}
        isOpenned={currentSection === 'description'}
        setCurrentSection={setCurrentSection}
        item={item}
      />
    </>
  )
}
