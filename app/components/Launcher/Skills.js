import React from 'react'
import MultiSelectCheckbox from 'components/Control/MultiSelectCheckbox'
import Header from 'components/Launcher/Header'
import { useSkills } from 'store/app/app.uses'

export default ({ item, onSave }) => {
  const skills = useSkills()

  const onSelect = selectedSkills => {
    onSave({ ...item, skills: selectedSkills })
  }

  return (
    <>
      <Header item={item} title="Skills" />
      <MultiSelectCheckbox
        options={skills}
        values={item?.skills || []}
        onChange={onSelect}
        withCheckboxImage={false}
        withLabelHighlight
        isCentered
      />
    </>
  )
}
