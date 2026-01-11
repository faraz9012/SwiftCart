import { checkUserPermissions } from '@/lib/auth-actions/auth-action';
import UnauthorizedPage from '@/components/shared/unauthorized';

const hasPermission = (Component?: any, requiredPermissions?: any) => {
  const WithPermission = async (props: any) => {
    const required = Array.isArray(requiredPermissions)
      ? requiredPermissions
      : [];

    if (required.length === 0) {
      if (!Component) return true;
      return <Component {...props} />;
    }

    const userPermissions = (await checkUserPermissions()).map(
      (permission: any) => permission.name
    );
    const isUserPermitted = required.some((permission) =>
      userPermissions.includes(permission)
    );
    
    // Check if user has rights then return boolean value (For UI purposes)
    if (!Component) return isUserPermitted;

    // Show un-authorized page if user does not have rights for component
    if (required.length > 0 && (userPermissions.length === 0 || !isUserPermitted)) {
      return <UnauthorizedPage />;
    }

    return <Component {...props} />;
  };

  WithPermission.displayName = Component?.displayName
    || Component?.name
    || "WithPermission";

  return WithPermission;
};

export default hasPermission;
