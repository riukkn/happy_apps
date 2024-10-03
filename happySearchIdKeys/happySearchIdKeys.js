const fs = require('fs')
const path = require('path')

const directoryPath = path.join(__dirname, 'input')

const parseFilesDataToJson = (files) => {
  const allJsonData = new Map([])

  for (const file of files) {
    if (path.extname(file) === '.json') {
      const filePath = path.join(directoryPath, file)
      try {
        const data = fs.readFileSync(filePath, 'utf8')
        allJsonData.set(
          path.basename(file).replace('.json', ''),
          JSON.parse(data)
        )
      } catch (err) {
        console.error(`Error reading file ${file}:`, err)
      }
    }
  }

  return Array.from(allJsonData.entries())
}

const getKeysWithIdString = (allFilesData) => {
  const allKeysWithIdString = new Map([])

  for (const [fileName, fieldData] of allFilesData) {
    const [firstElement] = fieldData

    if (!firstElement) continue

    const keysWithIdString = new Set([])

    for (const key of Object.keys(firstElement)) {
      if (key.toLowerCase().includes('id')) {
        keysWithIdString.add(key)
      }
    }
    allKeysWithIdString.set(fileName, keysWithIdString)
  }

  return allKeysWithIdString;
}

const main = () => {
  try {
    const files = fs.readdirSync(directoryPath)
    const allFilesData = parseFilesDataToJson(files)
    const keys = getKeysWithIdString(allFilesData)
    console.log(keys);
  } catch (err) {
    console.error('Error reading directory:', err)
  }
}

main()