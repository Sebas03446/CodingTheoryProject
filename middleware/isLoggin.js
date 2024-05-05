export default defineNuxtRouteMiddleware(() => {
    const user = useSupabaseClient();
    if (user) {
        console.log('User is logged in', user);
        return navigateTo('/products');
    }
});

