export interface ApiResponse{
  error: boolean,
  data: Record<string, unknown> | string,
  res: Response,
  status: number
}