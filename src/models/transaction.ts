export default interface Transaction {
  id: number,
  accountId: number,
  title: string,
  description: string,
  total: number,
  isGain: boolean,
  date: string
}