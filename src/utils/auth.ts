export const setAccessToken = (token: string) => {
  if (typeof window !== 'undefined') {

    const secureFlag =  '; secure';
    const sameSiteFlag =  '; samesite=strict';
    
    document.cookie = `accessToken=${token}; path=/; max-age=86400${secureFlag}${sameSiteFlag}`;
    

    setTimeout(() => {
      const cookies = document.cookie.split(';');
      const tokenCookie = cookies.find(cookie => 
        cookie.trim().startsWith('accessToken=')
      );
    }, 100);
  }
};

export const getAccessToken = (): string | null => {
  if (typeof window !== 'undefined') {
    const cookies = document.cookie.split(';');
    const tokenCookie = cookies.find(cookie => 
      cookie.trim().startsWith('accessToken=')
    );
    return tokenCookie ? tokenCookie.split('=')[1] : null;
  }
  return null;
};

export const clearAccessToken = () => {
  if (typeof window !== 'undefined') {
    document.cookie = 'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  }
};

export const logout = async () => {

  clearAccessToken();
  
  if (typeof window !== 'undefined') {
    const { signOut } = await import('next-auth/react');
    await signOut({ redirect: false });
  }
  
  if (typeof window !== 'undefined') {
    window.location.href = '/login';
  }
};