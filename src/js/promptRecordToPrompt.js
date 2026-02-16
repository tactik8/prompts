
/**
* Converts a prompt record to a md formatted text.
*
*/
function promptRecordToPrompt(promptRecord){

  let content = ''

  // Assign title
  content += `# ${promptRecord.name || "Prompt"}\n`
  
  let promptElements = promptRecord.promptElement
  promptElements = Array.isArray(promptElements) ? promptElements : [promptElements]
  
  let categories = promptElements.map(x => x.promptCategory)
  categories = [...new Set(categories)]

  for(let c of categories){

    content += `## ${c}\n`
    let subPrompts = promptElements.filter(x => x.promptCategory == c)
    subPrompts.sort((a,b) => a.position < b.position)
    let text = subPrompts.map(x => x.text).join ('\n')
    content += text
  }

  // Add json schema
  if(promptRecord?.outputJsonSchema){

    content += '## JSON Schema:\n'
    content += `JSON ${promptRecord?.outputJsonSchema}`
    
  }

  
  return content

  
  
}
