export enum IssueStates {
  OPEN = 'open',
  PENDING = 'pending',
  CLOSED = 'closed',
}

export enum UpdateIssueStates {
  PENDING = IssueStates.PENDING,
  CLOSED = IssueStates.CLOSED
}