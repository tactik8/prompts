
/**
* Converts a prompt record to a md formatted text.
*
*/
function promptRecordToPrompt(promptRecord){

   if(typeof promptRecord == "string"){
    try {
      promptRecord = JSON.parse(promptRecord)
    } catch{}
  }

  
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
    content += text + '\n'
  }

  // Add json schema
  if(promptRecord?.outputJsonSchema){

    let jsonSchema = promptRecord?.outputJsonSchema
    
    try {
      jsonSchema = jsonSchema.parse(jsonSchema)
    } catch {}
      
    
    content += '## JSON Schema:\n'
    content += `JSON ${JSON.stringify(jsonSchema, null, 4)}`
    content += '\n'
  }

  
  return content

  
  
}
