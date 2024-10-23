import process from 'node:process'
import nodeReleases from 'node-releases/data/release-schedule/release-schedule.json'
import { ok, warn } from '../utils/console'

function getLatestNodeVersion() {
  const versions = Object.keys(nodeReleases)
  const latestVersion = versions[versions.length - 1]
  const versionWithoutV = latestVersion.slice(1)
  const nodeVersion = versionWithoutV.split('.')[0]
  return nodeVersion
}

function getNodeVersion() {
  const nodeVersionWithoutV = process.version.slice(1)
  const nodeVersion = nodeVersionWithoutV.split('.')[0]
  return nodeVersion
}

function checkNode() {
  const nodeVersion = getNodeVersion()
  const nodeVersionData = nodeReleases[`v${nodeVersion}` as keyof typeof nodeReleases]
  let result = false
  if (nodeVersionData) {
    const endDate = new Date(nodeVersionData.end)
    const currentDate = new Date()
    const isNodeVersionSupported = currentDate < endDate
    if (isNodeVersionSupported) {
      ok(`Your node version (${nodeVersion}) is supported until ${nodeVersionData.end}.`)
      result = true
    }
    else {
      warn(`Your node version (${nodeVersion}) is no longer supported since ${nodeVersionData.end}.`)
      result = false
    }
  }
  else if (nodeVersion > getLatestNodeVersion()) {
    ok(`Your node version (${nodeVersion}) is higher than the latest version ${getLatestNodeVersion()}.`)
    result = true
  }
  else {
    warn(`Your node version (${nodeVersion}) can't be found in the release schedule.`)
    result = false
  }
  return result
}

export default checkNode
