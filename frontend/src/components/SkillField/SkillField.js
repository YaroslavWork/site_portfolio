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

  const isUsedInProjectVisible = usedInProjects.length === 0 ? false : true;
  const isWhatILearnVisible = whatImLearningText.length === 0 ? false : true;
  const isWhatIPlanVisible = whatIPlanText.length === 0 ? false : true;

  return (
    <BorderContainer>
        <div className={skills.technologyTop}>
          <h1 className={skills.technologyName}>{technologyName}</h1>
          <p className={skills.technologyType}>{technologyType}</p>
        </div>
        <div className={skills.whatField}>
          {isUsedInProjectVisible &&
            <SkillSubComponentProjects title={usedInProjectsTitle} projectsName={usedInProjects} color={color}/>
          }
          <SkillSubComponent whatType={whatIKnowTitle} text={whatIKnowText} color={color}/>
          {isWhatILearnVisible &&
            <SkillSubComponent whatType={whatImLearningTitle} text={whatImLearningText} color={color}/>
          }
          {isWhatIPlanVisible &&
          <SkillSubComponent whatType={whatIPlanTitle} text={whatIPlanText} color={color}/>
          }
        </div>
    </BorderContainer>
  )
}
