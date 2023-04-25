export enum PermissionFlag {
  FREE_PERMISSION = 1,
  PAID_PERMISSION = 2,
  ANOTHER_PAID_PERMISSION = 4,
  ADMIN_PERMISSION = 8,
  ALL_PERMISSIONS = 2147483647, // Maximum safe value for a 32-bit integer
}
