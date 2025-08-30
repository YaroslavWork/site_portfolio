import React from 'react'
import skills from './SkillField.module.css'
import BorderContainer from '../BorderContainer/BorderContainer'
import SkillSubComponent from '../SkillSubComponent/SkillSubComponent'

export default function SkillField({
    technologyName, technologyType, hexColor,
    whatIKnowTitle, whatIKnowText,
    whatImLearningTitle, whatImLearningText,
    whatIPlanTitle, whatIPlanText
}) {
  return (
    <BorderContainer>
        <div className={skills.technologyTop}>
            <h1 className={skills.technologyName}>{technologyName}</h1>
            <p className={skills.technologyType}>{technologyType}</p>
        </div>
        <div className={skills.whatField}>
            <SkillSubComponent whatType={whatIKnowTitle} text={whatIKnowText} />
            <SkillSubComponent whatType={whatImLearningTitle} text={whatImLearningText} />
            <SkillSubComponent whatType={whatIPlanTitle} text={whatIPlanText} />
        </div>
    </BorderContainer>
  )
}
