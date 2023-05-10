export interface CRUD {
  list: (limit: number, page: number) => Promise<any>;
  create: (resource: any) => Promise<any>;
  readById: (id: string) => Promise<any>;
  deleteById: (id: string) => Promise<RegExpExecArray>;
  patchById: (id: string, resource: any) => Promise<RegExpExecArray>;
  putById: (id: string, resource: any) => Promise<RegExpExecArray>;
}
