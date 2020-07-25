export interface npmPackage {
  name: string,
  url: string,
  versions: number | undefined | null,
  dependencies: number | undefined | null,
  dependents: number | undefined | null,
  lastVersion: string | undefined | null,
  license: string | undefined | null,
  weeklyDownloads: number | undefined | null,
  unpackedSize: string | undefined | null,
  totalFiles: number | undefined | null,
  lastPublish: string | undefined | null,
  collaborators: string[],
  keywords: string[]
}
