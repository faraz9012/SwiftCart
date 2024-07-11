import { checkUserPermissions } from '@/lib/auth-actions/auth-action';
import UnauthorizedPage from '@/components/shared/unauthorized';

const hasPermission = (Component?: any, requiredPermissions?: any) => {
  return async (props: any) => {
  
    const userPermissions = await checkUserPermissions();
    const isUserPermitted = requiredPermissions.every((permission: string) => userPermissions.includes(permission));

    // Check if user has rights then return boolean value (For UI purposes)
    if (!Component) return isUserPermitted;

    // Show un-authorized page if user does not has rights for component
    if (userPermissions.length === 0 || isUserPermitted) return <UnauthorizedPage />;

    return <Component {...props} />;
  };
};

export default hasPermission;
