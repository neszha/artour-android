import * as fs from 'fs'
import * as path from 'path'

const ROOT_PATH = process.cwd()

// Read package.json
const packageBuffer = fs.readFileSync(path.resolve(ROOT_PATH, 'package.json'), 'utf-8')
const packageData = JSON.parse(packageBuffer.toString())

// Show app version.
console.log(packageData.version || '0.0.0')