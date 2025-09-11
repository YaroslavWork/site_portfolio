import React from 'react'
import skills from './SkillField.module.css'
import BorderContainer from '../BorderContainer/BorderContainer'
import SkillSubComponent from '../SkillSubComponent/SkillSubComponent'
import SkillSubComponentProjects from '../SkillSubComponentProjects/SkillSubComponentProjects'

export default function SkillField({
    technologyName, technologyType, hexColor,
    usedInProjects, usedInProjectsTitle,
    whatIKnowTitle, whatIKnowText,
    whatImLearningTitle, whatImLearningText,
    whatIPlanTitle, whatIPlanText,
    color=null
}) {

  return (
    <BorderContainer>
        <div className={skills.technologyTop}>
            <h1 className={skills.technologyName}>{technologyName}</h1>
            <p className={skills.technologyType}>{technologyType}</p>
        </div>
        <div className={skills.whatField}>
            <SkillSubComponentProjects title={usedInProjectsTitle} projectsName={usedInProjects} color={color}/>
            <SkillSubComponent whatType={whatIKnowTitle} text={whatIKnowText} color={color}/>
            <SkillSubComponent whatType={whatImLearningTitle} text={whatImLearningText} color={color}/>
            <SkillSubComponent whatType={whatIPlanTitle} text={whatIPlanText} color={color}/>
        </div>
    </BorderContainer>
  )
}
