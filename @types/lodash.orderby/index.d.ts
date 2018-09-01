declare module 'lodash.orderby' {
  function orderBy<T>(members: T[], sortFunction: any[], directions: any[]): T[];

  export = orderBy;
}
