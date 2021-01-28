export default function ({route, redirect, store}) {
    const isAuthenticated = store.state.auth.user ? true : false

    // Redirect to login if not auth
    if(!isAuthenticated && (route.name !== 'login' && route.name !== 'register')) {
        redirect({name:'login'})
    }

    // Redirect login or register to index if already signed in
    if (isAuthenticated && (route.name === 'login' || route.path === 'register')) {
        redirect({name: 'index'})
    }
}
