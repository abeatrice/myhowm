export default function ({route, redirect, store}) {
    // Redirect to login if not auth
    const isAuthenticated = store.state.auth.user ? true : false
    if(!isAuthenticated) {
        redirect({name:'login'})
    }

    // Redirect login or register to index if already signed in
    if (isAuthenticated && (route.name === 'login' || route.path === 'register')) {
        redirect({name: 'index'})
    }
}
