import { checkUserPermissions } from '@/lib/auth-actions/auth-action';
import UnauthorizedPage from '@/components/shared/unauthorized';

const hasPermission = (Component?: any, requiredPermissions?: any) => {
  return async (props: any) => {
    let isUserPermitted = false;
    const userPermissions = (await checkUserPermissions()).map((permission: any) => permission.name);

    for (let i = 0; i < requiredPermissions.length; i++) {
      if (userPermissions.includes(requiredPermissions[i])) {
        isUserPermitted = true;
        break;
      }
    }
    
    // Check if user has rights then return boolean value (For UI purposes)
    if (!Component) return isUserPermitted;

    // Show un-authorized page if user does not has rights for component
    if (userPermissions.length === 0 || !isUserPermitted) return <UnauthorizedPage />;

    return <Component {...props} />;
  };
};

export default hasPermission;
